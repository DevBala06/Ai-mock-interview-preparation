import { motion, AnimatePresence } from 'framer-motion';
import { Loader2Icon } from "lucide-react";
import { useInterviewForm } from '@/hooks/useInterviewForm';
import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
  interviewLimit:number;
  setInterviewLimit:Dispatch<SetStateAction<number>>;
  interviewCount:number;
  setInterviewCount:Dispatch<SetStateAction<number>>;
  openModal: boolean;
  handleCloseModal: () => void;
  onSuccessRedirect: (interviewId: string) => void;
}

const Modal: React.FC<ModalProps> = ({ openModal, handleCloseModal, onSuccessRedirect ,interviewLimit,setInterviewLimit,interviewCount,setInterviewCount}) => {
  const { loading, onSubmit } = useInterviewForm({ handleCloseModal, onSuccessRedirect ,interviewLimit,setInterviewLimit,interviewCount,setInterviewCount});

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
      {openModal && (
        <div
          className="fixed inset-0 z-50 px-4 flex items-center justify-center bg-black bg-opacity-50 md:px-0"
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white p-5 w-full max-w-md rounded-lg shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center relative mb-4">
              <div>
                <h2 className=" text-lg md:text-xl font-black">Start Your Mock Interview</h2>
                <p className="text-xs font-semibold text-zinc-600">
                  Create Your Custom AI Mock Interview
                </p>
              </div>
              <button
                className="text-3xl absolute -top-3 right-0 text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-zinc-800">
                  Role
                </label>
                <input
                  type="text"
                  name="jobRole"
                  id="role"
                  placeholder="Front-end Developer"
                  className="mt-1 px-2 py-1 block w-full rounded-sm border-zinc-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="technologies" className="block text-sm font-semibold text-zinc-800">
                  Technologies
                </label>
                <textarea
                  name="technologies"
                  id="technologies"
                  placeholder="React, Bootstrap, Express"
                  className="mt-1 resize-none px-2 py-1 h-20 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="difficulty" className="block text-sm font-semibold text-zinc-800">
                  Difficulty
                </label>
                <select
                  name="difficultyLevel"
                  id="difficulty"
                  className="mt-1 px-3 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-[#d6f462] text-zinc-800 font-bold rounded-md hover:bg-[#c1e052] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2Icon className="animate-spin" />
                    Generating from AI...
                  </span>
                ) : (
                  "Start Interview"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Modal;