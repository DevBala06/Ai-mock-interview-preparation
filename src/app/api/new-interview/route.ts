
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

export const POST = async (request: Request) => {
    try {
        await connectToDb();


        const body = await request.json();

        const { jobRole, technologies, difficultyLevel, queryResponseFromAi, sfResponseFromAi , userId } = body;
        

        const newInterview = await NewInterview.create({
            userId,
            jobRole,
            technologies,
            difficultyLevel,
            queryResponseFromAi,
            sfResponseFromAi,
        });

        const savedInterview = await newInterview.save();

        return NextResponse.json({
            message: "Interview created successfully",
            interview: savedInterview
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error creating interview:", error);
        return NextResponse.json({
            message: "Failed to create interview", error: error.message
        }, { status: 500 });
    }
};
