import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/utils/config/db";
import Interview from "@/utils/models/interviewSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDb();

    const interview = await Interview.findById(params.id);

    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ interview });
  } catch (error) {
    console.error("Error fetching interview:", error);
    return NextResponse.json(
      { error: "Failed to fetch interview" },
      { status: 500 }
    );
  }
}