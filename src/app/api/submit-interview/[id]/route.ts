import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/utils/config/db";
import Interview from "@/utils/models/interviewSchema";


export async function GET(request: NextRequest) {
    try {
      await connectToDb();
  
      const { searchParams } = new URL(request.url);
      const interviewId = searchParams.get('interviewId');
  
      if (!interviewId) {
        return NextResponse.json(
          { error: "Missing interviewId" },
          { status: 400 }
        );
      }
  
      const interview = await Interview.findById(interviewId);
      if (!interview) {
        return NextResponse.json(
          { error: "Interview not found" },
          { status: 404 }
        );
      }
  
      // Check if feedback exists
      if (!interview.feedback) {
        return NextResponse.json(
          { error: "Feedback not yet generated" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        interview: {
          _id: interview._id,
          jobRole: interview.jobRole,
          technologies: interview.technologies,
          difficultyLevel: interview.difficultyLevel,
          questions: interview.questions,
          userAnswers: interview.userAnswers,
          feedback: interview.feedback
        }
      });
    } catch (error) {
      console.error("Error fetching interview data:", error);
      return NextResponse.json(
        { error: "Failed to fetch interview data" },
        { status: 500 }
      );
    }
  }
  
  