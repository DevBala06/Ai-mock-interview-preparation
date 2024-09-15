"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import UserPermissionModal from "./UserPermissionModal";
import { DeleteModal } from "./DeleteModal";

interface InterviewData {
    _id: string;
    jobRole: string;
    technologies: string;
    difficultyLevel: string;
    createdAt: string;
    status: string
    handleDelete: (id: string) => void;
}

const InterviewCard: React.FC<InterviewData> = ({
    _id,
    jobRole,
    technologies,
    difficultyLevel,
    createdAt,
    status,
    handleDelete
}) => {
    const [openModal, setOpenModal] = useState<string | null>(null);

    const handleOpenModal = (id: string) => {
        setOpenModal(id);
    };

    const handleCloseModal = () => {
        setOpenModal(null);
    };

    return (
        <div className="">
            <div key={_id}>
                <div className=" border border-zinc-300 rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-zinc-900">{jobRole}</h1>
                        <button className={`px-3 py-1 rounded-full text-xs font-semibold ${status === "completed" ? "bg-[#d7f462] border border-[#9fb547] text-neutral-800" : "bg-red-300 border border-red-500"} `}>{status.toLocaleUpperCase()}</button>
                    </div>
                    <div>
                        <h1 className="text-zinc-800 font-semibold py-1">
                            Technologies:{" "}
                            <span className="text-zinc-600 font-semibold text-sm">
                                {technologies}
                            </span>
                        </h1>
                        <h1 className="text-zinc-800 font-semibold py-1">
                            Difficulty:{" "}
                            <span className=" text-zinc-600 font-semibold">
                                {difficultyLevel}
                            </span>
                        </h1>
                        <h1 className="text-zinc-800 font-semibold py-1">
                            Created:{" "}
                            <span className="text-zinc-700 font-semibold">
                                {new Date(createdAt).toLocaleDateString()}
                            </span>
                        </h1>
                    </div>
                    <div className="py-3 flex justify-between">
                        {status === "pending" ? (
                            <button
                                className="px-2.5 py-1.5 border-2 border-red-400 rounded-md text-sm font-semibold hover:bg-red-300 transition-all duration-200"
                                onClick={() => handleOpenModal(_id)}
                            >
                                Start Interview
                            </button>

                        ) : (
                            <div className="flex gap-4">
                                <Link href={`/dashboard/feedback/${_id}`}>
                                    <button className="px-2.5 py-1.5 border-2 border-[#d7ff35] rounded-md text-sm font-semibold hover:bg-[#c8e940]" >
                                        See feedbacks
                                    </button>
                                </Link>
                                <button
                                    className="px-2.5 py-1.5 border-2 border-red-500 rounded-md text-sm font-semibold hover:bg-red-300 transition-all duration-200"
                                    onClick={() => handleOpenModal(_id)}
                                >
                                    Retake
                                </button>
                            </div>
                        )}
                        <DeleteModal
                            interviewId={_id}
                            handleDelete={handleDelete}
                        />
                    </div>
                </div>

                {/* Only render the modal if the interview's ID matches the openModal state */}
                {openModal === _id && (
                    <UserPermissionModal
                        openModal={true}
                        interviewId={_id}
                        handleCloseModal={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
};

export default InterviewCard