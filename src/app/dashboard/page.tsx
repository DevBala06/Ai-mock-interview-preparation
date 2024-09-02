'use client';
import React, { useState } from 'react';
import DashHeader from './_components/DashHeader';
import { chatSession } from '@/utils/gemini-ai-model/question_answer_model';
import { Loader2Icon } from 'lucide-react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

const Page = () => {
  const [jobRole, setRole] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [difficultyLevel, setLevel] = useState('easy');
  const [loading, setLoading] = useState(false);
  const [responseFromAi, setResponseFromAi] = useState('');

  const { user } = useUser()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `jobrole: ${jobRole}, technologies: ${technologies}, difficultyLevel: ${difficultyLevel}. Based on these provided information, generate 5 interview questions in JSON format with "question" and "answer" fields in each JSON object.`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const formattedResponse = result.response.text()
        .replace("```json", "")
        .replace("```", "");
      const parsedResponse = JSON.parse(formattedResponse);

      setResponseFromAi(parsedResponse);

      // Sending the data to the backend including the generated response
      const response = await axios.post('http://localhost:3000/api/new-interview', {
        userId: user?.id,
        jobRole,
        technologies,
        difficultyLevel,
        queryResponseFromAi: parsedResponse
      });

      console.log('Data successfully inserted:', response.data);

    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <DashHeader />
      </div>

      <form className='grid gap-4 mt-8' onSubmit={onSubmit}>
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
      )}
    </div>
  );
};

export default Page;
