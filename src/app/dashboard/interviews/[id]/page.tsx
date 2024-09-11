"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Briefcase } from "lucide-react";
import Webcam from "react-webcam";
import { IoMdExit } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { FaVideoSlash } from "react-icons/fa6";
import useSpeechToText from 'react-hook-speech-to-text';


interface UserAnswer {
  question: string;
  answer: string;
}

interface ResultType {
  transcript: string;
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

export default function page() {
  const [interview, setInterview] = useState<InterviewData | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string | null>(null);
  const params = useParams();
  const { user } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [unanswered, setUnanswered] = useState(0);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [text, setText] = useState<string>('');


  const startVideo = () => {
    // Logic to start video
    setIsVideoOn(true);
  };

  const stopVideo = () => {
    // Logic to stop video
    setIsVideoOn(false);
  };

  const {
    error,
    interimResult,
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
      const transcripts = results.map(result => {
        if (typeof result === 'string') {
          return result;
        } else {
          return (result as ResultType).transcript;
        }
      }).join('\n');
      setText(transcripts);
    }
  }, [results]);

  const handleNext = () => {
    if(interview){
      if (currentQuestionIndex < interview?.questions?.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        if(answered < interview?.questions?.length + 1){
          setAnswered(prevIndex => prevIndex + 1);
        }
        if(unanswered >= 1)
        setUnanswered(prevIndex => prevIndex - 1)
      }
    }
  };

  const handleSkip = () => {
    
    if(interview){
    if (currentQuestionIndex < interview?.questions?.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
if(skipped < interview?.questions?.length - 1){
  setSkipped(prevIndex => prevIndex + 1);

}    }
  }
  };

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await axios.get(
          `/api/generate-interview/${params.id}`
        );
        setInterview(response.data.interview);
        setUnanswered(response.data.interview?.questions?.length)
      } catch (err) {
        setErrors("Failed to fetch interview");
        console.error("Error fetching interview:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [params.id]);
  
  
  
  
  

  if (loading) {
    return <div className="text-center mt-8">Loading interview...</div>;
  }

  if (errors) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!interview) {
    return <div className="text-center mt-8">Interview not found</div>;
  }

  return (
    <div className="flex flex-1 justify-between gap-x-7">
      <div className="flex w-[50%] h-screen flex-col">
      {/* Job Role Section */}
      <div>
        <h1 className="bg-white relative p-3 w-full rounded-lg text-base font-bold flex items-center gap-3">
          <Briefcase className="text-2xl text-amber-600" />
          <span className="text-black">Scheduled Interview for : </span>
          <span className="text-white bg-slate-900 text-sm p-2 rounded-lg font-semibold ml-1">
            {interview?.jobRole}
          </span>
          <div className="absolute text-2xl cursor-pointer right-2">
            <Link href={"/dashboard/interviews"}><IoMdExit className="text-red-500"/></Link>
          </div>
        </h1>
      </div>
      {/* Video Section */}
      <div className="bg-white p-4 mt-4 rounded-3xl w-full h-[60%]">
      <div
        className="relative w-full h-full"
        // style={{ width: "31.25rem", height: "18.75rem" }}
      >
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
              backgroundColor: "black", // When video is off, show a black screen
            }}
          />
        )}
      </div>
      
      </div>
      {/* Audio & Video Icons Section */}
      <div className="w-full bg-slate-800 cursor-pointer rounded-2xl mt-4 justify-evenly p-3 flex gap-2 text-2xl text-white ">
          <div onClick={isRecording ? stopSpeechToText : startSpeechToText}>{isRecording ? <FaMicrophone/> : <FaMicrophoneSlash/>} </div>
          <div onClick={isVideoOn ? stopVideo : startVideo}>
        {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
      </div>
      </div>
        {/* No. of quest answered / unanswered / skipped nd all section  */}
      <div className=" flex justify-evenly text-sm font-bold w-full rounded-xl mt-4 bg-white p-3">
          <h1><span className="bg-green-400 p-1 text-white rounded-xl mr-2">Answered </span>: {answered}</h1>
          <h1><span className=" bg-red-400 p-1 text-white rounded-xl mr-2">Unanswered </span>: {unanswered}</h1>
          <h1><span className="bg-orange-400 p-1 text-white rounded-xl mr-2">Skipped </span>: {skipped}</h1>
      </div>
    </div>
    {/* Displaying Question Section */}
    <div className="flex gap-y-4 w-[50%] h-screen flex-col">
      <div className="bg-white w-fit p-4 rounded-lg">
        <div className="w-full mt-3 bg-gray-800 text-white p-3 rounded-xl">
      <h2 className="text-lg font-semibold mb-2">
          Question {currentQuestionIndex + 1} of {interview?.questions.length}
        </h2>
        <p className="text-gray-100 text-sm font-semibold  mb-4">
          {interview?.questions[currentQuestionIndex].question}
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
            Next
          </button>
          </div>
      </div>
      </div>
      {/* Text Editor Section */}
      <div className="relative  bg-white w-full p-5 rounded-lg h-[55%]  flex justify-center items-center">
        <label htmlFor="userEditor" className="text-sm font-semibold block absolute top-1 left-6" >Answer Editor</label>
      <textarea name="userEditor" placeholder="Enter your answer" rows={11} cols={60} id="UserEditor" className="bg-gray-100 rounded-lg text-gray-800 font-semibold p-2 outline-1 "
      value={text} 
      onChange={(e) => setText(e.target.value)} ></textarea>
      </div>
    </div>
    </div>
  );
}
