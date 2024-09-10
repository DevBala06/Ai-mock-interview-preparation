'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Header from '../_components/Header'

interface InterviewData {
  _id: string
  jobRole: string
  technologies: string
  difficultyLevel: string
  createdAt: string
}

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<InterviewData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('/api/generate-interview')
        setInterviews(response.data.interviews)
      } catch (err) {
        setError('Failed to fetch interviews')
        console.error('Error fetching interviews:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchInterviews()
  }, [])

  if (loading) {
    return <div className="text-center mt-8">Loading interviews...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  return (
    <div className="">
      <div>
        <Header />
      </div>
      <div className=' mt-10'>
        {interviews.length === 0 ? (
          <p>No interviews found. Create your first interview!</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {interviews.map((interview) => (
              <li key={interview._id} className="border border-zinc-300 hover:shadow-md rounded-lg p-5">
                <h2 className="text-xl font-semibold py-1">{interview.jobRole}</h2>
                <p className="text-zinc-700 text-sm font-semibold">Technologies: {interview.technologies}</p>
                <p className="text-zinc-700 text-sm font-semibold">Difficulty: {interview.difficultyLevel}</p>
                <p className="text-zinc-700 text-sm font-semibold">
                  Created: {new Date(interview.createdAt).toLocaleDateString()}
                </p>
                <Link href={`/dashboard/interviews/${interview._id}`}>
                  <button className="mt-3 inline-block bg-green-500 text-white text-sm px-3 py-1.5 rounded hover:bg-green-300 transition-colors">
                    Start Interview
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}