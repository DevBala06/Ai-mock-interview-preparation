
'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface Question {
  questionNumber: number
  question: string
  expectedAnswer: string
}

interface FeedbackItem {
  questionNumber: number
  accuracy: string
  completeness: string
  suggestions: string
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
    overallPerformance: number
    generalFeedback: string
  }
}

export default function FeedbackPage() {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  console.log(`This is ${params}`);


  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/generate-interview/${params.id}`)
        setInterviewData(response.data.interview)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching interview data:", error)
        setError("Failed to load interview feedback. Please try again later.")
        setLoading(false)
      }
    }

    if (params.id) {
      fetchInterviewData()
    }
  }, [params.id])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading feedback...</div>
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!interviewData) {
    return <div className="flex justify-center items-center h-screen">No feedback data available.</div>
  }

  return (
    <div className="container mx-auto px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Interview Feedback</CardTitle>
          <CardDescription>
            Job Role: {interviewData.jobRole} | Technologies: {interviewData.technologies} | Difficulty: {interviewData.difficultyLevel}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Overall Performance</h3>
            <Progress value={interviewData.feedback.overallPerformance} className="w-full" />
            <p className="mt-2 text-sm text-gray-600">{interviewData.feedback.overallPerformance}% - {interviewData.feedback.generalFeedback}</p>
          </div>
        </CardContent>
      </Card>

      <div>
        <div>

        </div>
        <div>

        </div>
        <div>
          
        </div>
      </div>


      {/* <Accordion type="single" collapsible className="w-full">
        {interviewData.feedback.feedback.map((item, index) => (
          <AccordionItem key={item.questionNumber} value={`item-${item.questionNumber}`}>
            <AccordionTrigger>
              <div className="flex items-center">
                <span className="mr-2">Question {item.questionNumber}</span>
                {item.accuracy.toLowerCase().includes('correct') ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p><strong>Question:</strong> {interviewData.questions[index].question}</p>
                <p><strong>Your Answer:</strong> {interviewData.userAnswers[index]}</p>
                <p><strong>Expected Answer:</strong> {interviewData.questions[index].expectedAnswer}</p>
                <p><strong>Accuracy:</strong> {item.accuracy}</p>
                <p><strong>Completeness:</strong> {item.completeness}</p>
                <p><strong>Suggestions:</strong> {item.suggestions}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion> */}
      <div className='flex flex-col gap-7'>
        {interviewData.feedback.feedback.map((item, index) => (
          <div className='bg-gray-50 rounded-lg border border-zinc-200 p-10' key={item.questionNumber}>
            <div className=''>
              <div>
                <h1 className=' text-zinc-800 font-semibold'>Question: { item.questionNumber}</h1>
              </div>
              <div className='py-3'>
                <div className='py-2'>
                  <span className=' text-zinc-800 font-semibold'>Answer</span>
                  <p className='py-1 font-semibold text-zinc-500'>{interviewData.questions[index].question}</p>
                </div>
                <div className='py-2'>
                  <span className=' text-zinc-800 font-semibold'>Your Answer</span>
                  <p className='py-1 font-semibold text-zinc-500'>{interviewData.userAnswers[index]}</p>
                </div>
                <div className='py-2'>
                  <span className=' text-zinc-800 font-semibold'> Expected Answer</span>
                  <p className='py-1 font-semibold text-zinc-500'>{interviewData.questions[index].expectedAnswer}</p>
                </div>
                <div className='py-2'>
                  <span className=' text-zinc-800 font-semibold'>Feedback</span>
                  <p className='py-1 font-semibold text-zinc-500'>{item.suggestions}</p>
                </div>
              </div>
            </div>
            <div className='flex gap-3'>
              <p className='px-4 py-0.5 bg-orange-50 border border-orange-300 rounded-full text-sm font-semibold'>Accuracy: {item.accuracy}</p>
              <p className='px-4 py-0.5 bg-green-50 border border-green-300 rounded-full text-sm font-semibold'>Completeness: {item.completeness}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}