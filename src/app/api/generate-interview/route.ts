import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/utils/config/db";
import { chatSession } from "@/utils/gemini-ai-model/question_answer_model";
import Interview from "@/utils/models/interviewSchema";

export async function GET(request: NextRequest) {
  try {
    await connectToDb();

    // Parse URL to get the query parameter (userId)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId'); // Get userId from the query parameters

    let interviews;

    if (userId) {
      // Fetch interviews related to a specific userId
      interviews = await Interview.find({ userId }).sort({ createdAt: -1 });
    }

    return NextResponse.json({ interviews });
  } catch (error) {
    console.error('Error fetching interviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interviews' },
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest) {
  try {
    await connectToDb();

    const body = await request.json();
    const { jobRole, technologies, difficultyLevel, userId, userName } = body;
    console.log(userId);


    if (!jobRole || !technologies || !difficultyLevel) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const interviewerNames = [
      "Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Patel", "Olivia Kim"
    ];
    const randomInterviewer = interviewerNames[Math.floor(Math.random() * interviewerNames.length)];

    const inputPrompt = `Create an interview dialogue flow for a ${jobRole} position with the following tech stack: ${technologies}. The difficulty level should be ${difficultyLevel}. 
      
        Start with a personalized introduction: "Hello ${userName}, I'm ${randomInterviewer}, your interviewer for today's interview. It's great to meet you today(This is an exaple promt you can use yours greeting users), for this ${jobRole} position interview."
        
        Then, begin with an opening question that's always a variation and every time generate different question of "Tell me about yourself" or a similar introductory question.
        
        Provide the response as a Json format, where each object represents a dialogue turn and includes the following properties: 
        - questionNumber (starting from 1)
        - question (the actual question)
        - expectedAnswer (expected answer)
        
        The first object should be the introduction, the second should be the opening question, and the rest should be technical questions related to the job role and technologies.
      
        Example structure don't response me back exactly same, imrovise the questions set and use the provided names or values:
        [
            {
              "questionNumber": 1,
              "question": " such as:  Hello ${userName} use the provided user name, I'm ${randomInterviewer}, your personal interviewer for this interview. It's great to meet you today for this ${jobRole} position interview.",
              "expectedAnswer": "Hello, Mr/Mrs ${randomInterviewer}, ${userName} use the provided user name"
            },
            {
              "questionNumber": 2,
              "question": "Generate a random question asked by the real interviewer",
              "expectedAnswer": "Answer based on the question"
            },
            {
              "questionNumber": 3,
              "question": "Generate a random question asked by the real interviewer",
              "expectedAnswer": "Answer based on the question"
            }
            // ... generate all the question as provided inpormation maximum question is 8, 9, 10 not extra.
        ]`;

    const result = await chatSession.sendMessage(inputPrompt);

    const rawResponse = await result.response.text();
    const parsedQuestions = JSON.parse(rawResponse);

    // console.log(parsedQuestions);


    const questions = parsedQuestions.map((q: any) => ({
      questionNumber: q.questionNumber,
      question: q.question,
      expectedAnswer: q.expectedAnswer,
    }));

    const newInterview = await Interview.create({
      userId,
      jobRole: jobRole,
      technologies: technologies,
      difficultyLevel: difficultyLevel,
      questions,

    });

    return NextResponse.json({
      message: "Interview questions created",
      interviews: newInterview,
    }, { status: 200 });
  } catch (error) {
    console.error("Error generating interview:", error);
    return NextResponse.json(
      { error: "Failed to generate interview" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectToDb();

    const { searchParams } = new URL(request.url);
    const interviewId = searchParams.get("userId");

    if (!interviewId) {
      return NextResponse.json(
        { error: "Interview ID is required" },
        { status: 400 }
      );
    }

    const deletedInterview = await Interview.findByIdAndDelete(interviewId);

    if (!deletedInterview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Interview deleted successfully", deletedInterview },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting interview:", error);
    return NextResponse.json(
      { error: "Failed to delete interview" },
      { status: 500 }
    );
  }
}

