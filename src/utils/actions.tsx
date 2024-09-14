import axios from "axios";
import { GetInterviewTypes } from './Types/GetInterviewTypes';

export const fetchInterviews = async (userId: string): Promise<GetInterviewTypes[]> => {
    if (!userId) {
        throw new Error("User ID is required");
    }

    try {
        const response = await axios.get("/api/generate-interview", {
            params: { userId },
        });
        if (!response.data.interviews) {
            throw new Error("No interviews found for the given user");
        }
        return response.data.interviews;
    } catch (error: any) {
        console.error("Error fetching interviews", error);
        throw new Error("Error fetching interviews");
    }
};

export const fetchSingleInterview = async (interviewId: string): Promise<GetInterviewTypes> => {
    if (!interviewId) {
        throw new Error("Interview ID is required");
    }

    try {
        const response = await axios.get(`/api/generate-interview/${interviewId}`);
        if (!response.data.interview) {
            throw new Error("Interview not found");
        }
        return response.data.interview;
    } catch (error: any) {
        console.error("Error fetching interview", error);
        throw new Error("Error fetching interview");
    }
};

export const createNewInterview = async (userData: {
    jobRole: string;
    technologies: string;
    difficultyLevel: string;
    userId: string | undefined;
    username: string | undefined;
}): Promise<{ interview: GetInterviewTypes }> => {
    try {
        const response = await axios.post("/api/interviews", userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error creating new interview", error);
        throw new Error("Error creating new interview");
    }
};

export const deleteInterview = async (interviewId: string): Promise<void> => {
    try {
        await axios.delete(`/api/interviews/${interviewId}`);
    } catch (error: any) {
        console.error("Failed to delete interview", error);
        throw new Error("Failed to delete interview");
    }
};

export const submitInterview = async (interviewId: string, userAnswers: { question: string; answer: string }[]): Promise<{ interviewId: string }> => {
    try {
        const response = await axios.post('/api/submit-interview', {
            interviewId,
            userAnswers,
        });
        return response.data;
    } catch (error: any) {
        console.error("Error submitting answers:", error);
        throw new Error("Failed to submit answers. Please try again.");
    }
};