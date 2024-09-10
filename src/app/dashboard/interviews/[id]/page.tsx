'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

interface Question {
  questionNumber: number;
  question: string;
  expectedAnswer: string;
}

interface InterviewData {
  _id: string;
  jobRole: string;
  technologies: string;
  difficultyLevel: string;
  questions: Question[];
  createdAt: string;
}

export default function page() {
  const [interview, setInterview] = useState<InterviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await axios.get(`/api/generate-interview/${params.id}`)
        setInterview(response.data.interview)
      } catch (err) {
        setError('Failed to fetch interview')
        console.error('Error fetching interview:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchInterview()
  }, [params.id])

  if (loading) {
    return <div className="text-center mt-8">Loading interview...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  if (!interview) {
    return <div className="text-center mt-8">Interview not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{interview.jobRole} Interview</h1>
      <div className="mb-6">
        <p className="text-lg"><strong>Technologies:</strong> {interview.technologies}</p>
        <p className="text-lg"><strong>Difficulty:</strong> {interview.difficultyLevel}</p>
        <p className="text-lg"><strong>Created:</strong> {new Date(interview.createdAt).toLocaleDateString()}</p>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Questions</h2>
      <ul className="space-y-6">
        {interview.questions.map((question) => (
          <li key={question.questionNumber} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-medium mb-2">Question {question.questionNumber}</h3>
            <p className="mb-2"><strong>Q:</strong> {question.question}</p>
            <p><strong>Expected Answer:</strong> {question.expectedAnswer}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-between">
        <Link href="/interviews">
          < button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
            Back to Interviews
          </button>
        </Link>
        <Link href={`/interviews/${interview._id}/start`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Start Interview
          </button>
        </Link>
      </div>
    </div>
  )
}