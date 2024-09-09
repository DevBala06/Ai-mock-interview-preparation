import { useState } from "react";
import { motion } from 'framer-motion';
import { chatSession } from "@/utils/gemini-ai-model/question_answer_model";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";

const Modal = ({openModal, handleCloseModal}: any) => {
  const [jobRole, setRole] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [difficultyLevel, setLevel] = useState("easy");
  const [loading, setLoading] = useState(false);
  const [responseFromAi, setResponseFromAi] = useState("");

  const { user } = useUser();

  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `jobrole: ${jobRole}, technologies: ${technologies}, difficultyLevel: ${difficultyLevel}. Based on these provided information, generate 5 interview questions in JSON format with "question" and "answer" fields in each JSON object.`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const formattedResponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      const parsedResponse = JSON.parse(formattedResponse);

      setResponseFromAi(parsedResponse);

      // Sending the data to the backend including the generated response
      const response = await axios.post(
        "http://localhost:3000/api/new-interview",
        {
          userId: user?.id,
          jobRole,
          technologies,
          difficultyLevel,
          queryResponseFromAi: parsedResponse,
        }
      );

      console.log("Data successfully inserted:", response.data);
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white p-5 w-[30%] rounded-lg shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center relative">
              <div className="mr-7">
                <h2 className="text-xl font-black">Start Your Mock Interview</h2>
                <p className="text-xs font-semibold text-gray-400">
                  Create Your Custom AI Mock Interview
                </p>
              </div>
              <button
                className="text-3xl absolute -top-3 right-0 text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <div>
              <form className="grid gap-4 mt-8" onSubmit={onSubmit}>
                <div>
                  <label htmlFor="role" className="block text-sm">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    placeholder="Front-end Developer"
                    className="input-class border mt-1 border-gray-300 rounded-lg p-1 font-bold text-sm placeholder:font-bold placeholder:text-sm focus:outline-none w-full"
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="technologies" className="block text-sm">
                    Technologies
                  </label>
                  <textarea
                    id="technologies"
                    placeholder="React, Bootstrap, Express"
                    className="textarea-class mt-1 border border-gray-300 rounded-lg p-1 placeholder:font-bold placeholder:text-sm focus:outline-none w-full"
                    onChange={(e) => setTechnologies(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="difficulty" className="text-sm mb-4">
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    className="select-class ml-4 text-sm focus:outline-none"
                    onChange={(e) => setLevel(e.target.value)}
                    value={difficultyLevel}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="px-4 py-2 bg-[#d6f462] text-zinc-800 font-bold rounded-md"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2 cursor-not-allowed">
                        <Loader2Icon className="text-lg animate-spin" />{" "}
                        Generating from AI...
                      </span>
                    ) : (
                      "Start Interview"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Modal;
