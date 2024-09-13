'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PerformanceChart } from '../../_components/charts/PerformanceChar'
import { Skeleton } from "@/components/ui/skeleton"

interface Question {
  questionNumber: number
  question: string
  expectedAnswer: string
}

interface AnalyticalSkills {
  accuracy: number
  correctness: number
  problemSolving: number
  relevance: number
  creativity: number
  efficiency: number
  communication: number
  clarity: number
}

interface FeedbackItem {
  questionNumber: number
  analyticalSkills: AnalyticalSkills[]
}

interface InterviewData {
  _id: string
  jobRole: string
  technologies: string
  difficultyLevel: string
  questions: Question[]
  userAnswers: string[]
  feedback: {
    feedback: FeedbackItem[]
    overallAnalyticalSkills: AnalyticalSkills[]
    overallPerformance: number
    generalFeedback: string
  }
  status: string
}

export default function FeedbackPage() {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const response = await axios.get(`/api/generate-interview/${params.id}`)
        setInterviewData(response.data.interview)
      } catch (error) {
        console.error("Error fetching interview data:", error)
        setError("Failed to load interview feedback. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchInterviewData()
    }
  }, [params.id])

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorCard message={error} />
  }

  if (!interviewData) {
    return <ErrorCard message="No feedback data available." />
  }

  return (
    <div className="-mt-1">
      <div className=" rounded-md border border-neutral-200 p-6 pt-3">
        <div className=''>
          <h1 className="text-2xl font-bold text-neutral-800">Interview Feedback</h1>
          <div className=''>
            <p className='text-neutral-700 font-semibold py-2 pb-0'>Job Role: {interviewData.jobRole} | Technologies: {interviewData.technologies} | Difficulty: {interviewData.difficultyLevel}</p>
          </div>
        </div>
        <div className='mt-6'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <PerformanceChart overallScore={interviewData.feedback.overallPerformance} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">AI Feedback</h3>
              <p className="text-neutral-700 mb-4">{interviewData.feedback.generalFeedback}</p>
              <div className=" w-full">
                {interviewData.feedback.overallAnalyticalSkills.map((skills) => (
                  <div className='flex items-start justify-start gap-4 flex-wrap'>
                    <p className='px-2 py-0.5 text-sm rounded-full border-2 border-green-400 bg-green-300 text-neutral-800 font-semibold'>Accuracy: {skills.accuracy}%</p>
                    <p className='px-2 py-0.5 text-sm rounded-full border-2 border-blue-400 bg-blue-300 text-neutral-800 font-semibold'>Correctness: {skills.correctness}%</p>
                    <p className='px-2 py-0.5 text-sm rounded-full border-2 border-lime-400 bg-lime-300 text-neutral-800 font-semibold'>Clearity: {skills.clarity}%</p>
                    <p className='px-2 py-0.5 text-sm rounded-full border-2 border-orange-400 bg-orange-300 text-neutral-800 font-semibold'>Communication: {skills.communication}%</p>
                    <p className='px-2 py-0.5 text-sm rounded-full border-2 border-yellow-400 bg-yellow-300 text-neutral-800 font-semibold'>Efficiency: {skills.efficiency}%</p>
                    <p className='px-2 py-0.5 text-sm rounded-full border-2 border-emerald-400 bg-emerald-300 text-neutral-800 font-semibold'>Problem Solving: {skills.problemSolving}%</p>
                    <p className='px-2 py-0.5 text-sm rounded-full border-2 border-indigo-400 bg-indigo-300 text-neutral-800 font-semibold'>Creativity: {skills.creativity}%</p>
                    <p className='px-2 py-0.5 text-sm rounded-full border-2 border-fuchsia-400 bg-fuchsia-300 text-neutral-800 font-semibold'>Relevance: {skills.relevance}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-5">
        {interviewData.feedback.feedback.map((item, index) => (
          <Card key={item.questionNumber} className=''>
            <CardHeader>
              <CardTitle>Question {item.questionNumber}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Question:</h4>
                  <p>{interviewData.questions[index].question}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Your Answer:</h4>
                  <p>{interviewData.userAnswers[index]}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Expected Answer:</h4>
                  <p>{interviewData.questions[index].expectedAnswer}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Analytical Skills:</h4>
                  <div>
                    {item.analyticalSkills.map((skills, value) => (
                      <div className='flex items-start justify-start gap-4 flex-wrap'>
                        <p className='px-2 py-0.5 text-sm rounded-full border-2 border-green-400 bg-green-300 text-neutral-800 font-semibold'>Accuracy: {skills.accuracy}%</p>
                        <p className='px-2 py-0.5 text-sm rounded-full border-2 border-blue-400 bg-blue-300 text-neutral-800 font-semibold'>Correctness: {skills.correctness}%</p>
                        <p className='px-2 py-0.5 text-sm rounded-full border-2 border-lime-400 bg-lime-300 text-neutral-800 font-semibold'>Clearity: {skills.clarity}%</p>
                        <p className='px-2 py-0.5 text-sm rounded-full border-2 border-orange-400 bg-orange-300 text-neutral-800 font-semibold'>Communication: {skills.communication}%</p>
                        <p className='px-2 py-0.5 text-sm rounded-full border-2 border-yellow-400 bg-yellow-300 text-neutral-800 font-semibold'>Efficiency: {skills.efficiency}%</p>
                        <p className='px-2 py-0.5 text-sm rounded-full border-2 border-emerald-400 bg-emerald-300 text-neutral-800 font-semibold'>Problem Solving: {skills.problemSolving}%</p>
                        <p className='px-2 py-0.5 text-sm rounded-full border-2 border-indigo-400 bg-indigo-300 text-neutral-800 font-semibold'>Creativity: {skills.creativity}%</p>
                        <p className='px-2 py-0.5 text-sm rounded-full border-2 border-fuchsia-400 bg-fuchsia-300 text-neutral-800 font-semibold'>Relevance: {skills.relevance}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-64 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-16 w-32 mx-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
      {[1, 2, 3].map((i) => (
        <Card key={i} className="mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{message}</p>
        </CardContent>
      </Card>
    </div>
  )
}