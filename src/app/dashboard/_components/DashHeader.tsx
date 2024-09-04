"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { PiHandWavingBold } from "react-icons/pi";
import DashHeaderLoader from "./Loaders/DashHeaderLoader";
import axios from "axios";

interface QueryResponseFromAi {
  questions: string[];
  answers: string[];
}

interface SfResponseFromAi {
  suggestions: string;
  feedback: string;
}

interface Interview {
  createdAt: string;
  difficultyLevel: string;
  jobRole: string;
  queryResponseFromAi: QueryResponseFromAi;
  sfResponseFromAi: SfResponseFromAi;
  technologies: string[];
  updatedAt: string;
  userId: string;
  _id: string;
}

interface InterviewData {
  interviews: Interview[];
  message: string;
}

const DashHeader = () => {
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const [interviewData, setInterviewData] = useState<InterviewData>({ interviews: [], message: "" });

  useEffect(() => {
    const sendUserData = async () => {
      if (user) {
        const primaryEmail = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress || "default@example.com";
        try {
          const userData = {
            clerkId: user.id,
            userName: user.username || "DefaultUsername",
            email: primaryEmail,
            createdAt: user.createdAt,
            updatedAt: new Date(),
          };

          await axios.post("/api/new-user", userData);
          console.log("User data sent to server");
        } catch (error) {
          console.error("Error sending user data", error);
        }
      }
    };

    const fetchInterviews = async () => {
      if (user) {
        try {
          const response = await axios.get("/api/new-interview", {
            params: { userId: user.id },
          });
          const data = response.data;
          console.log(data);
          setInterviewData(data);
        } catch (err) {
          console.error("Failed to fetch interviews", err);
        }
      }
    };

    if (user) {
      sendUserData();
      fetchInterviews();
    }

    setIsMounted(true);
  }, [user]);

  if (!isMounted || !user) {
    return <DashHeaderLoader />;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-2xl text-zinc-800 font-bold">
            Welcome back, {user.username}
          </h1>
          <PiHandWavingBold className="text-2xl" />
        </div>
        <div>
          <div className="flex items-center justify-center gap-5">
            <div>
              <div className="flex items-center justify-center gap-3 bg-white px-4 py-1.5 rounded-full shadow-sm">
                <FaSearch className="text-gray-600 text-lg" />
                <input
                  className="outline-none bg-transparent"
                  placeholder="Find your interviews..."
                  type="text"
                />
              </div>
            </div>
            <UserButton />
          </div>
        </div>
      </div>
      <div>
        {interviewData.interviews.length > 0 ? (
          <h1>Job Role: {interviewData.interviews[0].jobRole}</h1>
        ) : (
          <h1>No job roles available</h1>
        )}
      </div>
    </div>
  );
};

export default DashHeader;
