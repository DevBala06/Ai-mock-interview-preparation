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

export default function InterviewByAi() {
    const params = useParams();
    const router = useRouter();
    const interviewId = params.id as string;

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
        <div className="max-md:w-full max-md:pl-12 max-md:mx-auto flex flex-col h-screen p-4 lg:p-0 space-y-4">
            <div className="bg-white border border-zinc-300 p-3 w-full rounded-md">
                <div className="relative flex items-center gap-3">
                    <Briefcase className="text-xl lg:text-2xl text-[#D8F275]" />
                    <h1 className="text-black text-sm lg:text-lg font-bold">
                        Interview/ <span className="text-neutral-900">{interview.jobRole}</span>
                    </h1>
                    <Link href="/dashboard/interviews" className="absolute right-0">
                        <button className="px-2 py-1 lg:px-3 lg:py-2 text-xs lg:text-sm font-semibold rounded-md bg-[#D8F275] flex items-center justify-center gap-2">
                            <IoMdExit className="text-zinc-900 text-base lg:text-xl" />
                            <span className="hidden sm:inline">Exit interview</span>
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 h-full">
                <div className="lg:w-2/5 flex flex-col space-y-4">
                    <div className="relative w-full h-48 lg:h-64">
                        {isVideoOn ? (
                            <Webcam className="w-full h-full rounded-lg border-2 border-neutral-200 object-cover" />
                        ) : (
                            <div className="w-full h-full rounded-lg border-2 border-neutral-200 bg-neutral-200/30 flex items-center justify-center">
                                <p className="text-gray-500">Video is off</p>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={isRecording ? stopSpeechToText : startSpeechToText}
                            className={`p-3 rounded-full ${isRecording ? "bg-lime-200" : "bg-lime-200/30"} border-2 border-lime-200`}
                        >
                            {isRecording ? (
                                <FaMicrophone className="text-black text-xl" />
                            ) : (
                                <FaMicrophoneSlash className="text-xl" />
                            )}
                        </button>
                        <button
                            onClick={() => setIsVideoOn(!isVideoOn)}
                            className={`p-3 rounded-full ${isVideoOn ? "bg-lime-200" : "bg-lime-200/30"} border-2 border-lime-200`}
                        >
                            {isVideoOn ? (
                                <FaVideo className="text-black text-xl" />
                            ) : (
                                <FaVideoSlash className="text-xl" />
                            )}
                        </button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-xl">
                        <span className="bg-green-400 text-xs font-bold px-2 py-1 text-white rounded-full">
                            Answered: {answered}
                        </span>
                        <span className="bg-red-400 text-xs font-bold px-2 py-1 text-white rounded-full">
                            Unanswered: {unanswered}
                        </span>
                        <span className="bg-orange-400 text-xs font-bold px-2 py-1 text-white rounded-full">
                            Skipped: {skipped}
                        </span>
                    </div>
                </div>

                <div className="lg:w-3/5 flex flex-col space-y-4">
                    <div className="border-b-2 border-neutral-200 pb-2">
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 bg-[#eaff96ad] border-2 border-[#ddff53] text-neutral-900">
                            Question {currentQuestionIndex + 1} of {interview.questions.length}
                        </span>
                        <p className="text-neutral-800 font-semibold text-sm lg:text-base">
                            {interview.questions[currentQuestionIndex].question}
                        </p>
                    </div>
                    <div className="flex-grow flex flex-col">
                        <label htmlFor="userEditor" className="text-neutral-600 font-semibold text-sm mb-1">
                            Provide Your Answer Below
                        </label>
                        <textarea
                            className="flex-grow bg-neutral-200/30 w-full resize-none text-sm lg:text-base text-zinc-700 font-semibold p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-lime-200 shadow-sm"
                            name="userEditor"
                            placeholder="Describe your answer in detail...!"
                            id="UserEditor"
                            value={text}
                            onChange={handleTextChange}
                            ref={textareaRef}
                        ></textarea>
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={handleSkip}
                            className="px-3 py-2 bg-gray-400 text-xs lg:text-sm font-bold text-gray-800 rounded-lg hover:bg-gray-500 transition-colors"
                        >
                            Skip
                        </button>
                        <button
                            disabled={!text.trim() || submitLoading}
                            onClick={onNextClick}
                            className={`px-3 py-2 bg-[#eaff96ad] border-2 border-[#ddff53] text-xs lg:text-sm font-bold text-neutral-800 rounded-lg hover:bg-[#d5ed76ad] ${
                                !text.trim() || submitLoading
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            } transition-all duration-200`}
                        >
                            {submitLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="text-xl font-bold animate-spin" />
                                    <span className="hidden sm:inline">Submitting...</span>
                                </span>
                            ) : currentQuestionIndex === interview.questions.length - 1 ? (
                                'Submit'
                            ) : (
                                'Next'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}