'use client';

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Briefcase } from "lucide-react";
import Webcam from "react-webcam";
import { IoMdExit } from "react-icons/io";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";
import useSpeechToText from 'react-hook-speech-to-text';

interface UserAnswer {
  question: string;
  answer: string;
}

interface ResultType {
  transcript: string;
  timestamp: number;
}

interface Question {
  questionNumber: number;
  question: string;
  expectedAnswer: string;
}

interface InterviewData {
  _id: string;
  jobRole: string;
  technologies: string;
  difficultyLevel: string;
  questions: Question[];
  createdAt: string;
}

export default function InterviewComponent() {
  const [interview, setInterview] = useState<InterviewData | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  console.log(userAnswers);
  
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string | null>(null);
  const params = useParams();
  const { user } = useUser();
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [unanswered, setUnanswered] = useState(0);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [text, setText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    if (results && results.length > 0) {
      const latestResult = results.reduce<ResultType>((latest, current) => {
        
        if (typeof current === 'string') {
          return latest; 
        }

        if (current.timestamp > latest.timestamp) {
          return current;
        }
        return latest;
      }, results[0] as ResultType); 

      setText(latestResult.transcript);
    }
  }, [results]);

  const handleNext = () => {
    if (interview) {
      const isLastQuestion = currentQuestionIndex === interview.questions.length - 1;

      if (currentQuestionIndex < interview.questions.length - 1) {
        saveCurrentAnswer();
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        updateAnsweredCounts();
        setText('');
      } else if (isLastQuestion) {
        saveCurrentAnswer();
        handleSubmit();
      }
    }
  };

  const saveCurrentAnswer = () => {
    if (interview) {
      setUserAnswers(prevAnswers => {
        const question = interview.questions[currentQuestionIndex].question;
        const newAnswer = text;
        const existingAnswerIndex = prevAnswers.findIndex(answer => answer.question === question);

        if (existingAnswerIndex !== -1) {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[existingAnswerIndex] = { question, answer: newAnswer };
          return updatedAnswers;
        } else {
          return [...prevAnswers, { question, answer: newAnswer }];
        }
      });
    }
  };

  const updateAnsweredCounts = () => {
    if (interview) {
      if (answered < interview.questions.length) {
        setAnswered(prevCount => prevCount + 1);
      }
      if (unanswered > 0) {
        setUnanswered(prevCount => prevCount - 1);
      }
    }
  };

  const handleSubmit = async () => {
    if (interview) {
      try {
        const response = await axios.post('/api/submit-interview', {
          interviewId: interview._id,
          userAnswers: [...userAnswers, { question: interview.questions[currentQuestionIndex].question, answer: text }]
        });

        const { interviewId } = response.data;
        if (response.status === 200) router.push(`/dashboard/feedback/${interviewId}`);
      } catch (error) {
        console.error("Error submitting answers:", error);
        setErrors("Failed to submit answers. Please try again.");
      }
    }
  };

  const handleSkip = () => {
    if (interview && currentQuestionIndex < interview.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSkipped(prevCount => prevCount + 1);
      setText('');
    }
  };

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await axios.get(`/api/generate-interview/${params.id}`);
        setInterview(response.data.interview);
        setUnanswered(response.data.interview?.questions?.length || 0);
      } catch (err) {
        setErrors("Failed to fetch interview");
        console.error("Error fetching interview:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [params.id]);

  if (loading) return <div className="text-center mt-8">Loading interview...</div>;
  if (errors) return <div className="text-center mt-8 text-red-500">{errors}</div>;
  if (!interview) return <div className="text-center mt-8">Interview not found</div>;

  return (
    <div className="flex flex-1 justify-between gap-x-7">
      <div className="flex w-[50%] h-screen flex-col">
        <div>
          <h1 className="bg-white relative p-3 w-full rounded-lg text-base font-bold flex items-center gap-3">
            <Briefcase className="text-2xl text-amber-600" />
            <span className="text-black">Scheduled Interview for : </span>
            <span className="text-white bg-slate-900 text-sm p-2 rounded-lg font-semibold ml-1">
              {interview.jobRole}
            </span>
            <div className="absolute text-2xl cursor-pointer right-2">
              <Link href="/dashboard/interviews"><IoMdExit className="text-red-500" /></Link>
            </div>
          </h1>
        </div>
        <div className="bg-white p-4 mt-4 rounded-3xl w-full h-[60%]">
          <div className="relative w-full h-full">
            {isVideoOn ? (
              <Webcam
                style={{
                  width: "100%",
                  height: "100%",
                  border: "1px solid gray",
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  border: "1px solid gray",
                  borderRadius: "30px",
                  backgroundColor: "black",
                }}
              />
            )}
          </div>
        </div>
        <div className="w-full bg-slate-800 cursor-pointer rounded-2xl mt-4 justify-evenly p-3 flex gap-2 text-2xl text-white ">
          <div onClick={isRecording ? stopSpeechToText : startSpeechToText}>
            {isRecording ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </div>
          <div onClick={() => setIsVideoOn(!isVideoOn)}>
            {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
          </div>
        </div>
        <div className="flex justify-evenly text-sm font-bold w-full rounded-xl mt-4 bg-white p-3">
          <h1><span className="bg-green-400 p-1 text-white rounded-xl mr-2">Answered</span>: {answered}</h1>
          <h1><span className="bg-red-400 p-1 text-white rounded-xl mr-2">Unanswered</span>: {unanswered}</h1>
          <h1><span className="bg-orange-400 p-1 text-white rounded-xl mr-2">Skipped</span>: {skipped}</h1>
        </div>
      </div>
      <div className="flex gap-y-4 w-[50%] h-screen flex-col">
        <div className="bg-white w-fit p-4 rounded-lg">
          <div className="w-full mt-3 bg-gray-800 text-white p-3 rounded-xl">
            <h2 className="text-lg font-semibold mb-2">
              Question {currentQuestionIndex + 1} of {interview.questions.length}
            </h2>
            <p className="text-gray-100 text-sm font-semibold mb-4">
              {interview.questions[currentQuestionIndex].question}
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleSkip}
                className="px-4 py-2 bg-gray-400 text-bold text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-bold text-white rounded-lg hover:bg-blue-600"
              >
                {currentQuestionIndex === interview.questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        </div>
        <div className="relative bg-white w-full p-5 rounded-lg h-[55%] flex justify-center items-center">
          <label htmlFor="userEditor" className="text-sm font-semibold block absolute top-1 left-6">Answer Editor</label>
          <textarea
            name="userEditor"
            placeholder="Enter your answer"
            rows={11}
            cols={60}
            id="UserEditor"
            className="bg-gray-100 rounded-lg text-gray-800 font-semibold p-2 outline-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={textareaRef}
          ></textarea>
        </div>
      </div>
    </div>
  );
}