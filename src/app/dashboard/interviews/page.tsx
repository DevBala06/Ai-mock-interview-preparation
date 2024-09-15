"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { fetchInterviews } from "@/utils/actions";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const InterviewCard = dynamic(() => import('@/DashboardComponents/InterviewCard'), { ssr: false });
const Header = dynamic(() => import('@/DashboardComponents/Header'), { ssr: false });

interface InterviewData {
  _id: string;
  jobRole: string;
  technologies: string;
  difficultyLevel: string;
  createdAt: string;
  status: string
}

const page = () => {
  const [interviews, setInterviews] = useState<InterviewData[]>([]);
  console.log(interviews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const fetchInterviewsData = useCallback(async () => {
    if (user?.id) {
      try {
        setLoading(true);
        const data = await fetchInterviews(user.id);
        setInterviews(data);
      } catch (error) {
        setError("Failed to fetch interviews. Please try again later.");
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [user?.id]);

  useEffect(() => {
    fetchInterviewsData();
  }, [fetchInterviewsData]);

  const handleInterviewCreated = useCallback(() => {
    fetchInterviewsData();
  }, [fetchInterviewsData]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen gap-2">
      <Loader2 className="w-8 h-8 animate-spin" />
      <p className="text-lg font-bold text-neutral-800">Loading please wait...</p>
    </div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete(`/api/generate-interview`, { params: { userId } });
      setInterviews(interviews.filter(interview => interview._id !== userId));
    } catch (error) {
      console.error("Failed to delete interview", error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Header onInterviewCreated={handleInterviewCreated} />
      </div>
      <div>
        {interviews.length === 0 ? (
          <div className="flex items-center justify-center h-[76vh]">
            <p className="text-center text-2xl font-semibold text-neutral-800">No interviews found. Create your first interview!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
              interviews.map((interview) => (
                <InterviewCard
                  _id={interview._id}
                  key={interview._id}
                  jobRole={interview.jobRole}
                  technologies={interview.technologies}
                  difficultyLevel={interview.difficultyLevel}
                  createdAt={interview.createdAt}
                  status={interview.status}
                  handleDelete={() => handleDelete(interview._id)}
                />
              ))
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default page