"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LayoutGrid, List, Trash2 } from "lucide-react";
import { LuRefreshCw } from "react-icons/lu";
import Header from "../_components/Header";
import { motion } from "framer-motion";
import UserPermissionModal from "../_components/UserPermissionModal";
import { DeleteModal } from "../_components/DeleteModal";

interface InterviewData {
  _id: string;
  jobRole: string;
  technologies: string;
  difficultyLevel: string;
  createdAt: string;
  status: string
}

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<InterviewData[]>([]);
  console.log(interviews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const { user } = useUser();

  const fetchInterviews = async () => {
    try {
      const response = await axios.get("/api/generate-interview", {
        params: { userId: user?.id },
      });
      setInterviews(response.data.interviews);
    } catch (err) {
      setError("Failed to fetch interviews");
      console.error("Error fetching interviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (user?.id) {
      fetchInterviews();
    }
  }, [user?.id]);

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete(`/api/generate-interview`, { params: { userId } });
      // Update the interviews state after deletion
      setInterviews(interviews.filter(interview => interview._id !== userId));
    } catch (error) {
      console.error("Failed to delete interview", error);
    }
  };


  if (loading) {
    return <div className="text-center mt-8">Loading interviews...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  const CardView = () => {
    const [openModal, setOpenModal] = useState<string | null>(null); // Store interview ID or null if no modal is open

    // Handle opening the modal and passing the interview ID
    const handleOpenModal = (id: string) => {
      setOpenModal(id);
    };

    // Handle closing the modal
    const handleCloseModal = () => {
      setOpenModal(null);
    };
    // bg-[#d7f462]
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map((interview) => (
          <div key={interview._id}>
            <div className=" border border-zinc-300 rounded-md p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-zinc-900">{interview.jobRole}</h1>
                <button className={`px-3 py-1 rounded-full text-xs font-semibold ${interview.status === "completed" ? "bg-[#d7f462] border border-[#9fb547] text-neutral-800" : "bg-red-300 border border-red-500"} `}>{interview.status.toLocaleUpperCase()}</button>
              </div>
              <div>
                <h1 className="text-zinc-800 font-semibold py-1">
                  Technologies:{" "}
                  <span className="text-zinc-600 font-semibold text-sm">
                    {interview.technologies}
                  </span>
                </h1>
                <h1 className="text-zinc-800 font-semibold py-1">
                  Difficulty:{" "}
                  <span className=" text-zinc-600 font-semibold">
                    {interview.difficultyLevel}
                  </span>
                </h1>
                <h1 className="text-zinc-800 font-semibold py-1">
                  Created:{" "}
                  <span className="text-zinc-700 font-semibold">
                    {new Date(interview.createdAt).toLocaleDateString()}
                  </span>
                </h1>
              </div>
              <div className="py-3 flex justify-between">
                {interview.status === "pending" ? (
                  <button
                    className="px-2.5 py-1.5 border-2 border-red-400 rounded-md text-sm font-semibold hover:bg-red-300 transition-all duration-200"
                    onClick={() => handleOpenModal(interview._id)}
                  >
                    Start Interview
                  </button>

                ) : (
                  <div className="flex gap-4">
                    <Link href={`/dashboard/feedback/${interview._id}`}>
                      <button className="px-2.5 py-1.5 border-2 border-[#d7ff35] rounded-md text-sm font-semibold hover:bg-[#c8e940]" >
                        See feedbacks
                      </button>
                    </Link>
                    <button
                      className="px-2.5 py-1.5 border-2 border-red-500 rounded-md text-sm font-semibold hover:bg-red-300 transition-all duration-200"
                      onClick={() => handleOpenModal(interview._id)}
                    >
                      Retake
                    </button>
                  </div>
                )}
                <DeleteModal
                  interviewId={interview._id}
                  handleDelete={handleDelete}
                />
              </div>
            </div>

            {/* Only render the modal if the interview's ID matches the openModal state */}
            {openModal === interview._id && (
              <UserPermissionModal
                openModal={true}
                interviewId={interview._id}
                handleCloseModal={handleCloseModal}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const TableView = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job Role</TableHead>
          <TableHead>Technologies</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {interviews.map((interview) => (
          <TableRow key={interview._id}>
            <TableCell>{interview.jobRole}</TableCell>
            <TableCell>{interview.technologies}</TableCell>
            <TableCell>{interview.difficultyLevel}</TableCell>
            <TableCell>
              {new Date(interview.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Link href={`/dashboard/interviews/${interview._id}`}>
                <Button variant="default">Start Interview</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="container mx-auto px-4">
      <Header />
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Interviews</h1>
          <div className="flex gap-x-4">
            <motion.button
              className="text-xl"
              type="button"
              onClick={() => fetchInterviews()}
              whileTap={{ rotate: 180 }}
              transition={{ duration: 0.7 }}
            >
              <LuRefreshCw />
            </motion.button>
            <Button
              variant="outline"
              onClick={() =>
                setViewMode(viewMode === "card" ? "table" : "card")
              }
            >
              {viewMode === "card" ? (
                <List className="mr-2 h-4 w-4" />
              ) : (
                <LayoutGrid className="mr-2 h-4 w-4" />
              )}
              {viewMode === "card" ? "Table View" : "Card View"}
            </Button>
          </div>
        </div>
        {interviews.length === 0 ? (
          <div className=" flex items-center justify-center border border-zinc-300">
            <p className="text-lg text-zinc-700">
              No interviews found. Create your first interview!
            </p>
          </div>
        ) : viewMode === "card" ? (
          <CardView />
        ) : (
          <TableView />
        )}
      </div>
    </div>
  );
}
