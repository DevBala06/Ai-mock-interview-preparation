import connectToDb from "@/utils/config/db";
import NewUser from "@/utils/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET (request: NextRequest,
    { params }: { params: { id: string } }) {
    try {
        await connectToDb();
        const user = await NewUser.findOne({clerkId:params.id});

        if(!user){
            return NextResponse.json(
                { error: "Interview not found" },
                { status: 404 }
              );
        }
       
 return NextResponse.json({message:"User fetched successfully",user}
 )
    } catch (error: any) {
        console.error("Error fetching users:", error);
        return NextResponse.json({
            message: "Failed to fetch users", error: error.message
        }, { status: 500 });
    }
};

export async function PUT(req: NextRequest) {
  try {
    await connectToDb();
    const { clerkId, interviewLimit } = await req.json();
    console.log(interviewLimit);

    if (!clerkId || interviewLimit == undefined) {
      return NextResponse.json(
        { message: 'Missing required parameters: clerkId or interviewLimit' },
        { status: 400 }
      );
    }

    const user = await NewUser.findOneAndUpdate(
      { clerkId }, 
      { interviewLimit }, 
      { new: true } 
    );

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Interview limit updated successfully', user },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating interviewsLimit:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating the user', error },
      { status: 500 }
    );
  }
}