import { NextResponse } from "next/server";
import connectToDb from "@/utils/config/db";
import NewInterview from "@/utils/models/newInterview.model";

export const POST = async (request: Request) => {
    try {
        await connectToDb();

        const body = await request.json();
        console.log(body);
        

        const { jobRole, technologies, difficultyLevel, queryResponseFromAi, userId } = body;

        if (!Array.isArray(queryResponseFromAi) || !queryResponseFromAi.every(q => q.question && q.answer)) {
            return NextResponse.json({
                message: "Invalid format for queryResponseFromAi. Each item must have a 'question' and 'answer'."
            }, { status: 400 });
        }

        const newInterview = await NewInterview.create({
            userId,
            jobRole,
            technologies,
            difficultyLevel,
            queryResponseFromAi,
        });

        return NextResponse.json({
            message: "Interview created successfully",
            interview: newInterview
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error creating interview:", error);
        return NextResponse.json({
            message: "Failed to create interview",
            error: error.message
        }, { status: 500 });
    }
};
