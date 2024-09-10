import connectToDb from '@/utils/config/db'
import { chatSession } from '@/utils/gemini-ai-model/question_answer_model'
import Interview from '@/utils/models/interviewSchema';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    await connectToDb();
    const { interviewId, answers } = await request.json()

    // In a real application, you'd fetch the original questions from a database
    // const originalQuestions = await fetchOriginalQuestions(interviewId)
    const originalQuestions = await Interview.findOne({_id: interviewId})

    const prompt = `Evaluate the following interview answers and provide feedback. For each question, give a score out of 10 and suggestions for improvement. Questions and answers:
    ${originalQuestions.map((q: any, index: any) => `
    Question ${index + 1}: ${q.question}
    Expected Answer: ${q.expectedAnswer}
    User's Answer: ${answers[index]}
    `).join('\n')}
    
    Provide the evaluation in JSON format with the following structure for each question:
    {
      questionNumber: number,
      score: number,
      feedback: string,
      improvementSuggestions: string
    }`

    const result = await chatSession.sendMessage(prompt)
    const response = await result.response
    const evaluationText = response.text()

    // Parse the JSON response
    const evaluation = JSON.parse(evaluationText)

    // In a real application, you'd save this to a database and get an ID
    const evaluationId = Date.now().toString()

    return NextResponse.json({ evaluationId, evaluation })
  } catch (error) {
    console.error('Error submitting interview:', error)
    return NextResponse.json({ error: 'Failed to submit interview' }, { status: 500 })
  }
}

async function fetchOriginalQuestions(interviewId: string) {
  // In a real application, you'd fetch this from a database
  // For this example, we'll return mock data
  return [
    { question: "What is React?", expectedAnswer: "React is a JavaScript library for building user interfaces." },
    { question: "Explain the concept of state in React.", expectedAnswer: "State is an object that holds data that may change over time in a component." }
  ]
}