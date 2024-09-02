<<<<<<< HEAD
import { NextResponse } from "next/server";
import connectToDb from "@/utils/config/db";
import NewInterview from "@/utils/models/newInterview.model";

=======

import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/utils/config/db";
import NewInterview from "@/utils/models/newInterview.model";


export const GET = async (request:NextRequest) => {
    try {
        await connectToDb();

        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        const interviews = await NewInterview.find({userId});

        return NextResponse.json({
            message: "Interviews fetched successfully",
            interviews
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching interviews:", error);
        return NextResponse.json({
            message: "Failed to fetch interviews", error: error.message
        }, { status: 500 });
    }
};

>>>>>>> 4da2ea92bcc56da993de452dd2c417031dc58419
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
