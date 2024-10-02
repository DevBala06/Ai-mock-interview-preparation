import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

interface UserData {
    jobRole: string;
    technologies: string;
    difficultyLevel: string;
    userId: string | undefined;
    username: string | undefined;
}

interface UseInterviewFormProps {
    handleCloseModal: () => void;
    onSuccessRedirect: (interviewId: string) => void;
    interviewLimit:number;
    setInterviewLimit:Dispatch<SetStateAction<number>>;
}

export const useInterviewForm = ({ handleCloseModal, onSuccessRedirect, interviewLimit, setInterviewLimit }: UseInterviewFormProps) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const { user } = useUser();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const userData: UserData = {
            jobRole: formData.get("jobRole") as string,
            technologies: formData.get("technologies") as string,
            difficultyLevel: formData.get("difficultyLevel") as string,
            userId: user?.id,
            username: user?.username as string
        };

        try {
            setLoading(true);

            const response = await axios.post("/api/generate-interview", userData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log("Success:", response.data);
            if (interviewLimit && interviewLimit > 0) {
                const updatedInterviewLimit = interviewLimit - 1;
                setInterviewLimit(updatedInterviewLimit);
          
                await axios.put(
                  `/api/new-user/${user?.id}`,
                  {
                    interviewLimit: updatedInterviewLimit, 
                    clerkId: user?.id,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
              }
            
            onSuccessRedirect(response.data.interviews._id);

        } catch (error) {
            console.error("Error:", error);
            setErrors(errors)
        } finally {
            setLoading(false);
            handleCloseModal();
        }
    };

    return { loading, onSubmit, errors, setErrors };
};