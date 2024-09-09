"use client";
import React, { useState } from "react";
import DashHeader from "./_components/DashHeader";
import { chatSession } from "@/utils/gemini-ai-model/question_answer_model";
import { Loader2Icon } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Modal from "./_components/Modal";

const Page = () => {
  const [jobRole, setRole] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [difficultyLevel, setLevel] = useState("easy");
  const [loading, setLoading] = useState(false);
  const [responseFromAi, setResponseFromAi] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const interviewData = [
    { title: 'Technical Interviews', message: 'Not enough data to display' },
    { title: 'Behavioral Interviews', message: 'Not enough data to display' },
    { title: 'Interviews Progress (Technical)', message: 'Not enough data to display' },
    { title: 'Interviews Progress (Behavioral)', message: 'Not enough data to display' },
  ];

  const interviewStats = [
    {
      title: 'Total Interviews',
      value: '0',
      percentage: '0%',
      description: 'from last week',
    },
    {
      title: 'Total time spent',
      value: '0 min',
      percentage: '0%',
      description: 'from last week',
    },
    {
      title: 'Completed interviews',
      value: '0',
      percentage: '0%',
      description: 'of total interviews',
    },
  ];

  const { user } = useUser();

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
    <div>
      <div>
        <DashHeader />
      </div>

      {/* <form className='grid gap-4 mt-8' onSubmit={onSubmit}>
        <div>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            placeholder='Front-end Developer'
            className='input-class'
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="technologies">Technologies</label>
          <textarea
            id="technologies"
            placeholder='React, Bootstrap, Express'
            className='textarea-class'
            onChange={(e) => setTechnologies(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            className='select-class'
            onChange={(e) => setLevel(e.target.value)}
            value={difficultyLevel}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <button disabled={loading} type="submit" className='px-4 py-2 bg-blue-400 text-white rounded-md'>
            {loading ? (
              <span className='flex items-center justify-center gap-2'>
                <Loader2Icon className='text-lg animate-spin' /> Generating from AI...
              </span>
            ) : "Start Interview"}
          </button>
        </div>
      </form>

      {responseFromAi && (
        <div className='mt-8'>
          <h2>Generated Interview Questions:</h2>
          <pre className='bg-gray-100 p-4 rounded-md'>
            {JSON.stringify(responseFromAi, null, 2)}
          </pre>
        </div>
      )} */}

      <div>
        <div>
          <div className="flex justify-between font-extrabold text-base mt-9 items-center mx-auto">
            <h3>Overview</h3>
            <button
              type="button"
              className="bg-[#D8F275] px-3 py-2 text-[#1f1e30ea] rounded-lg"
              onClick={openModal}
            >
              Create interview
            </button>

            {isModalOpen && (
        <Modal isModalOpen={isModalOpen}  onClose={closeModal}>
          
          
          <form className='grid gap-4 mt-8' onSubmit={onSubmit}>
        <div>
          <label htmlFor="role" className="block text-sm">Role</label>
          <input
            type="text"
            id="role"
            placeholder='Front-end Developer'
            className='input-class border mt-1 border-gray-300  rounded-lg p-1 font-bold text-sm placeholder:font-bold placeholder:text-sm focus:outline-none w-full'
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="technologies" className="block text-sm">Technologies</label>
          <textarea
            id="technologies"
            placeholder='React, Bootstrap, Express'
            className='textarea-class mt-1  border border-gray-300   rounded-lg p-1 placeholder:font-bold placeholder:text-sm focus:outline-none w-full'
            onChange={(e) => setTechnologies(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="difficulty" className="text-sm mb-4">Difficulty</label>
          <select
            id="difficulty"
            className='select-class ml-4 text-sm focus:outline-none '
            onChange={(e) => setLevel(e.target.value)}
            value={difficultyLevel}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <button disabled={loading} type="submit" className='px-4 py-2 bg-blue-400 text-white rounded-md'>
            {loading ? (
              <span className='flex items-center justify-center gap-2 cursor-not-allowed'>
                <Loader2Icon className='text-lg animate-spin ' /> Generating from AI...
              </span>
            ) : "Start Interview"}
          </button>
        </div>
      </form>
        </Modal>
      )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-1">
          {interviewStats.map((stat, index) => (
        <div key={index} className="mt-3 border-t-2 pt-4 border-slate-300 space-y-2">
          <h1 className="font-bold text-base">{stat.title}</h1>
          <h1 className="font-bold text-3xl">{stat.value}</h1>
          <div className="flex gap-x-1 text-sm font-bold">
            <h1 className="bg-[#D8F275] px-2 rounded-md ">{stat.percentage}</h1>
            <h1 className="text-gray-600">{stat.description}</h1>
          </div>
        </div>
      ))}

            <div className="mt-3 border-t-2 pt-4 border-slate-300 space-y-2">
              <h1 className="font-bold text-base">Available interviews</h1>
              <h1 className="font-bold text-3xl">1</h1>
              <h1 className="bg-[#D8F275] text-slate-700 w-fit px-2 rounded-md text-sm font-bold">
                Free credit
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1  xl:grid-cols-2 gap-6 mt-6 ">
          {interviewData.map((interview, index) => (
        <div key={index} className="flex flex-col items-center border gap-y-3 border-[#1f1e3048] p-14 rounded-md">
          <h2 className="text-base text-gray-600 font-semibold">{interview.message}</h2>
          <h1 className="font-bold">{interview.title}</h1>
        </div>
      ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
