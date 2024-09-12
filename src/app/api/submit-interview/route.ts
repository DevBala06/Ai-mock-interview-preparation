import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/utils/config/db";
import { chatSession } from "@/utils/gemini-ai-model/question_answer_model";
import Interview from "@/utils/models/interviewSchema";




export async function GET() {
  return NextResponse.json({
    message: "Working"
  })
}


export async function POST(request: NextRequest) {
  try {
    await connectToDb();

    const body = await request.json();
    const { interviewId, userAnswers } = body;

    if (!interviewId || !userAnswers) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch the original interview questions
    const interview = await Interview.findById(interviewId);
    console.log(interview);
    
    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    // Prepare the input for Gemini API
    const inputPrompt = `Analyze the following interview responses:

    ${userAnswers.map((answer: string, index: number) => `
    Question ${index + 1}: ${interview.questions.question}
    Expected Answer: ${interview.questions.expectedAnswer}
    User's Answer: ${answer}
    `).join('\n')}

    Please provide feedback on each answer, including:
    1. Accuracy of the response
    2. Completeness of the answer
    3. Suggestions for improvement
    4. Overall performance score (out of 100)

    Format the response as a JSON object with the following structure:
    {
      "feedback": [
        {
          "questionNumber": 1,
          "accuracy": "...",
          "completeness": "...",
          "suggestions": "..."
        },
        // ... (for each question)
      ],
      "overallPerformance": 85,
      "generalFeedback": "..."
    }`;

    const result = await chatSession.sendMessage(inputPrompt);
    const feedbackResponse = await result.response.text();
    const parsedFeedback = JSON.parse(feedbackResponse);

    // Update the existing Interview document with user answers and feedback
    interview.userAnswers = userAnswers;
    interview.feedback = parsedFeedback;
    await interview.save();

    return NextResponse.json({
      message: "Interview answers submitted and feedback generated",
      interviewId: interview._id
    });
  } catch (error) {
    console.error("Error processing interview answers:", error);
    return NextResponse.json(
      { error: "Failed to process interview answers" },
      { status: 500 }
    );
  }
}
