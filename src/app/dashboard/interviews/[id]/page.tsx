'use client';

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, Loader2 } from "lucide-react";
import Webcam from "react-webcam";
import { IoMdExit } from "react-icons/io";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";
import useSpeechToText from 'react-hook-speech-to-text';
import { useInterviewState } from "@/hooks/useInterviewState";

interface ResultType {
  transcript: string;
  timestamp: number;
}

const InterviewByAi: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const interviewId = params.id as string; // Assuming 'id' is the interview ID from the route

    const {
        interview,
        userAnswers,
        loading,
        errors,
        currentQuestionIndex,
        skipped,
        answered,
        unanswered,
        submitLoading,
        handleNext,
        handleSkip,
    } = useInterviewState({ interviewId });

    const {
        error: speechError,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    const [text, setText] = useState('');
    const [isVideoOn, setIsVideoOn] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (results && results.length > 0) {
            const latestResult = results.reduce((latest, current) => {
                if (typeof current === 'string') {
                    return latest;
                }

                return current.timestamp > latest.timestamp ? current : latest;
            }, results[0] as ResultType);

            setText(latestResult.transcript);
        }
    }, [results]);

    useEffect(() => {
        setText('');
    }, [currentQuestionIndex]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const onNextClick = () => {
        handleNext(text);
    };

    if (loading) return <div className="text-center mt-8">Loading interview...</div>;
    if (errors) return <div className="text-center mt-8 text-red-500">{errors}</div>;
    if (!interview) return <div className="text-center mt-8">Interview not found</div>;

    return (
        <div className="gap-x-4 h-[93vh] flex flex-col">
            <div className="bg-white border border-zinc-300 p-3 w-full rounded-md">
                <div className="relative text-base font-bold flex items-center gap-3">
                    <Briefcase className="text-2xl text-[#D8F275]" />
                    <h1 className="text-black">Scheduled Interview for :</h1>
                    <h1 className="text-white bg-slate-900 text-sm p-2 rounded-lg font-semibold ml-1">
                        {interview.jobRole}
                    </h1>
                    <div className="absolute cursor-pointer right-2">
                        <Link href="/dashboard/interviews">
                            <button className="px-3 py-2 font-semibold rounded-md bg-[#D8F275] flex items-center justify-center gap-2">
                                <IoMdExit className="text-zinc-900 text-2xl" />Exit interview
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex justify-between h-full gap-4 mt-8">
                {/* Left Panel: Webcam and Controls */}
                <div className="w-[40%] flex flex-col">
                    <div className="rounded-md w-full h-[45%]">
                        <div className="relative w-full h-full">
                            {isVideoOn ? (
                                <Webcam className="w-full h-full rounded-lg border-2 border-neutral-200 object-cover" />
                            ) : (
                                <div className="w-full h-full rounded-lg border-2 border-neutral-200 bg-neutral-200/30 flex items-center justify-center">
                                    <p className="text-gray-500">Video is off</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-8 p-5">
                        <div
                            onClick={isRecording ? stopSpeechToText : startSpeechToText}
                            className={`bg-lime-200/30 border-2 border-lime-200 px-6 py-2 rounded-full cursor-pointer hover:bg-lime-200/70 ${
                                isRecording ? "bg-lime-200/70" : ""
                            }`}
                        >
                            {isRecording ? (
                                <FaMicrophone className="text-black text-2xl" />
                            ) : (
                                <FaMicrophoneSlash className="text-2xl" />
                            )}
                        </div>
                        <div
                            onClick={() => setIsVideoOn(!isVideoOn)}
                            className={`bg-lime-200/30 border-2 border-lime-200 px-6 py-2 rounded-full cursor-pointer hover:bg-lime-200/70 ${
                                isVideoOn ? "bg-lime-200/70" : ""
                            }`}
                        >
                            {isVideoOn ? (
                                <FaVideo className="text-black text-2xl" />
                            ) : (
                                <FaVideoSlash className="text-2xl" />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3 w-full rounded-xl bg-white p-3">
                        <h1 className="bg-green-400 text-sm font-bold px-3 py-1 text-white rounded-full">
                            <span>Answered</span>: {answered}
                        </h1>
                        <h1 className="bg-red-400 text-sm font-bold px-3 py-1 text-white rounded-full">
                            <span>Unanswered</span>: {unanswered}
                        </h1>
                        <h1 className="bg-orange-400 text-sm font-bold px-3 py-1 text-white rounded-full">
                            <span>Skipped</span>: {skipped}
                        </h1>
                    </div>
                </div>

                <div className="flex w-[60%] h-[88%] flex-col px-3">
                    <div className="h-28 border-b-2 border-neutral-200 mb-2">
                        <p className="text-lg inline-block px-3 py-1 rounded-full font-semibold mb-2 bg-[#eaff96ad] border-2 border-[#ddff53] text-neutral-900">
                            Question {currentQuestionIndex + 1} of {interview.questions.length}
                        </p>
                        <p className="text-neutral-800 font-semibold mb-4">
                            {interview.questions[currentQuestionIndex].question}
                        </p>
                    </div>
                    <div>
                        <label htmlFor="userEditor" className="text-neutral-600 font-semibold">
                            Provide Your Answer Below
                        </label>
                        <textarea
                            className="bg-neutral-200/30 mt-2 w-full h-[22rem] resize-none text-lg text-zinc-700 font-semibold p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-lime-200 shadow-sm"
                            name="userEditor"
                            placeholder="Describe your answer in detail...!"
                            id="UserEditor"
                            value={text}
                            onChange={handleTextChange}
                            ref={textareaRef}
                        ></textarea>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handleSkip}
                            className="px-4 py-2 bg-gray-400 text-bold text-gray-800 rounded-lg hover:bg-gray-500 transition-colors"
                        >
                            Skip
                        </button>
                        <button
                            disabled={!text.trim() || submitLoading}
                            onClick={onNextClick}
                            className={`px-4 py-2 bg-[#eaff96ad] border-2 border-[#ddff53] font-bold text-neutral-800 rounded-lg hover:bg-[#d5ed76ad] ${
                                !text.trim() || submitLoading
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            } transition-all duration-200`}
                        >
                            {submitLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="text-2xl font-bold animate-spin" />
                                    Submitting Interview, please wait...
                                </span>
                            ) : currentQuestionIndex === interview.questions.length - 1 ? (
                                'Submit Interview'
                            ) : (
                                'Next Question'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewByAi;
