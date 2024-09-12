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
  const [completed, setCompleted] = useState(false)

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
          userAnswers: [...userAnswers, { question: interview.questions[currentQuestionIndex].question, answer: text }],

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
    <div className="gap-x-4 h-[93vh]">
      <div className=" bg-white border border-zinc-300 p-3 w-full rounded-md">
        <div className="relative text-base font-bold flex items-center gap-3">
          <Briefcase className="text-2xl text-[#D8F275]" />
          <h1 className="text-black">Scheduled Interview for : </h1>
          <h1 className="text-white bg-slate-900 text-sm p-2 rounded-lg font-semibold ml-1">
            {interview.jobRole}
          </h1>
          <div className="absolute cursor-pointer right-2">
            <Link href="/dashboard/interviews" >
              <button className=" px-3 py-2 font-semibold rounded-md bg-[#D8F275] flex items-center justify-center gap-2"><IoMdExit className="text-zinc-900 text-2xl" />Exit interview</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-between h-full gap-4 mt-8">
        <div className="w-[40%]">
          <div className=" rounded-md w-full h-[45%]">
            <div className="relative w-full h-full">
              {isVideoOn ? (
                <Webcam className="w-full h-full rounded-lg border-2 border-neutral-200 object-cover"
                // style={{
                //   width: "100%",
                //   height: "100%",
                //   border: "1px solid gray",
                //   borderRadius: "15px",
                //   objectFit: "cover",
                // }}
                />
              ) : (
                <div className="w-full h-full rounded-lg border-2 border-neutral-200 bg-neutral-200/30" />
              )}
            </div>
          </div>
          <div className=" flex items-center justify-center gap-8 p-5">
            <div onClick={isRecording ? stopSpeechToText : startSpeechToText} className={`bg-lime-200/30 border-2 border-lime-200 px-6 py-2 rounded-full cursor-pointer hover:bg-lime-200/70 ${isRecording ? "bg-lime-200/70 " : ""}`}>
              {isRecording ? <FaMicrophone className="text-black text-2xl" /> : <FaMicrophoneSlash className="text-2xl" />}
            </div>
            <div onClick={() => setIsVideoOn(!isVideoOn)} className={`bg-lime-200/30 border-2 border-lime-200 px-6 py-2 rounded-full cursor-pointer hover:bg-lime-200/70 ${isVideoOn ? "bg-lime-200/70" : ""}`}>
              {isVideoOn ? <FaVideo className="text-black text-2xl" /> : <FaVideoSlash className="text-2xl" />}
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 w-full rounded-xl bg-white p-3">
            <h1 className="bg-green-400 text-sm font-bold px-3 py-1 text-white rounded-full"><span >Answered</span>: {answered}</h1>
            <h1 className="bg-red-400 text-sm font-bold px-3 py-1 text-white rounded-full"><span >Unanswered</span>: {unanswered}</h1>
            <h1 className="bg-orange-400 text-sm font-bold px-3 py-1 text-white rounded-full"><span >Skipped</span>: {skipped}</h1>
          </div>
        </div>

        <div className="flex w-[60%] h-[88%] flex-col px-3">
          <div className=" h-28 border-b-2 border-neutral-200 mb-2">
            <p className="text-lg inline-block px-3 py-1 rounded-full font-semibold mb-2 bg-[#eaff96ad] border-2 border-[#ddff53] text-neutral-900">
              Question {currentQuestionIndex + 1} of {interview.questions.length}
            </p>
            <p className="text-neutral-800 font-semibold mb-4">
              {interview.questions[currentQuestionIndex].question}
            </p>
          </div>
          <div className="">
            <label htmlFor="userEditor" className="text-neutral-600 font-semibold">
              Provide Your Answer Below
            </label>
            <textarea
              className="bg-neutral-200/30 mt-2 w-full h-[22rem] resize-none text-lg text-zinc-700 font-semibold p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-lime-200 shadow-sm"
              name="userEditor"
              placeholder="Describe your answer in detail...!"
              id="UserEditor"
              value={text}
              onChange={(e) => setText(e.target.value)}
              ref={textareaRef}
            ></textarea>
          </div>
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
    </div>
  );
}