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

    const formattedUserAnswers = userAnswers.map((answer: any) => answer.answer);

    const inputPrompt = `Analyze the following interview responses and provide feedback in a structured JSON format. Do not show any calculations or explanations in the response. Only return the JSON object.

    ${interview.questions.map((question: any, index: number) => `
    Question ${question.questionNumber}: ${question.question}
    Expected Answer: ${question.expectedAnswer}
    User's Answer: ${formattedUserAnswers[index]}
    `).join('\n')}

  Return only a JSON object with the following structure, filling in all values directly without explanations:

  {
  "feedback": [
    {
      "questionNumber": 1,
      answerFeedback: "Give detailed feedback on the user answer with your answer.",
      "analyticalSkills": {
        "accuracy": 0,
        "correctness": 0,
        "problemSolving": 0,
        "relevance": 0,
        "creativity": 0,
        "efficiency": 0,
        "communication": 0,
        "clarity": 0
      }
    },
    // Repeat for each question dont forget to fill any of the analytical skills values
  ],
  "overallAnalyticalSkills": {
    "accuracy": 0,
    "correctness": 0,
    "problemSolving": 0,
    "relevance": 0,
    "creativity": 0,
    "efficiency": 0,
    "communication": 0,
    "clarity": 0
  },
  "overallPerformance": 0,
  "generalFeedback": ""
}

Ensure all numerical values are integers between 0 and 100, representing percentages. Fill in all fields with appropriate values based on the interview responses. Do not include any explanations or calculations outside the JSON structure.`;

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

    interview.userAnswers = formattedUserAnswers;
    interview.feedback = {
      feedback: parsedFeedback.feedback.map((item: any) => ({
        questionNumber: item.questionNumber,
        analyticalSkills: [item.analyticalSkills] 
      })),
      overallAnalyticalSkills: [parsedFeedback.overallAnalyticalSkills], 
      overallPerformance: parsedFeedback.overallPerformance,
      generalFeedback: parsedFeedback.generalFeedback
    };
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