import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/utils/config/db";
import { chatSession } from "@/utils/gemini-ai-model/question_answer_model";
import Interview from "@/utils/models/interviewSchema";

export async function POST(request: NextRequest) {
  try {
    await connectToDb();

    const body = await request.json();
    const { interviewId, userAnswers } = body;

    if (!interviewId || !userAnswers || !Array.isArray(userAnswers)) {
      return NextResponse.json(
        { error: "Missing required fields or invalid data format" },
        { status: 400 }
      );
    }

    // Fetch the original interview questions
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    // Ensure userAnswers is an array of strings
    const formattedUserAnswers = userAnswers.map((answer: any) => answer.answer);

    // Prepare the input for Gemini API
    const inputPrompt = `Analyze the following interview responses:

    ${interview.questions.map((question: any, index: number) => `
    Question ${question.questionNumber}: ${question.question}
    Expected Answer: ${question.expectedAnswer}
    User's Answer: ${formattedUserAnswers[index]}
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
    let parsedFeedback;

    try {
      parsedFeedback = JSON.parse(feedbackResponse);
    } catch (error) {
      console.error("Error parsing Gemini API response:", error);
      return NextResponse.json(
        { error: "Failed to parse feedback response" },
        { status: 500 }
      );
    }

    // Update the existing Interview document with user answers and feedback
    interview.userAnswers = formattedUserAnswers;
    interview.feedback = parsedFeedback;
    interview.status = 'completed';
    await interview.save();

    return NextResponse.json({
      message: "Interview answers submitted and feedback generated",
      interviewId: interview._id,
      userId: interview.userId
    });
  } catch (error) {
    console.error("Error processing interview answers:", error);
    return NextResponse.json(
      { error: "Failed to process interview answers" },
      { status: 500 }
    );
  }
}