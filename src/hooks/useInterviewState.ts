import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchSingleInterview, submitInterview } from '@/utils/actions';
import { GetInterviewTypes } from '@/utils/Types/GetInterviewTypes';

interface UserAnswer {
    question: string;
    answer: string;
}

interface UseInterviewStateProps {
    interviewId: string;
}

export const useInterviewState = ({ interviewId }: UseInterviewStateProps) => {
    const [interview, setInterview] = useState<GetInterviewTypes | null>(null);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [skipped, setSkipped] = useState(0);
    const [answered, setAnswered] = useState(0);
    const [unanswered, setUnanswered] = useState(0);
    const [submitLoading, setSubmitLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchInterviewData = async () => {
            try {
                if (interviewId) {
                    const fetchedInterview = await fetchSingleInterview(interviewId);
                    setInterview(fetchedInterview);
                    setUnanswered(fetchedInterview.questions?.length || 0);
                }
            } catch (err) {
                setErrors("Failed to fetch interview");
                console.error("Error fetching interview:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInterviewData();
    }, [interviewId]);

    const saveCurrentAnswer = (text: string) => {
        if (interview) {
            setUserAnswers(prevAnswers => {
                const question = interview.questions[currentQuestionIndex].question;
                const existingAnswerIndex = prevAnswers.findIndex(answer => answer.question === question);

                if (existingAnswerIndex !== -1) {
                    const updatedAnswers = [...prevAnswers];
                    updatedAnswers[existingAnswerIndex] = { question, answer: text };
                    return updatedAnswers;
                } else {
                    return [...prevAnswers, { question, answer: text }];
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

    const handleSkip = () => {
        if (interview && currentQuestionIndex < interview.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSkipped(prevCount => prevCount + 1);
        }
    };

    const handleNext = (text: string) => {
        if (interview) {
            const isLastQuestion = currentQuestionIndex === interview.questions.length - 1;

            saveCurrentAnswer(text);
            updateAnsweredCounts();

            if (!isLastQuestion) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            } else {
                handleSubmit(text);
            }
        }
    };

    const handleSubmit = async (finalAnswer: string) => {
        if (interview) {
            try {
                setSubmitLoading(true);
                const finalUserAnswers = [
                    ...userAnswers,
                    { question: interview.questions[currentQuestionIndex].question, answer: finalAnswer }
                ];
                const response = await submitInterview(interview._id, finalUserAnswers);
                router.push(`/dashboard/feedback/${response.interviewId}`);
            } catch (error) {
                console.error("Error submitting answers:", error);
                setErrors("Failed to submit answers. Please try again.");
            } finally {
                setSubmitLoading(false);
            }
        }
    };

    return {
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
    };
};
