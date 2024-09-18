import connectToDb from "@/utils/config/db";
import NewUser from "@/utils/models/user.model";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDb();

        const users = await NewUser.find();

        return NextResponse.json({
            message: "Users fetched successfully",
            users
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching users:", error);
        return NextResponse.json({
            message: "Failed to fetch users", error: error.message
        }, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        await connectToDb();

        const body = await request.json();

        const { clerkId, userName, email, createdAt, updatedAt ,subscription } = body;
        // const currentUser = await NewUser.findOne({ clerkId });
        
        if(subscription){
            if(clerkId){
                const updatedUser = await NewUser.findOneAndUpdate(
                    { clerkId },
                    {
                        subscription,
                        updatedAt,
                    },
                    {new:true}
    
                )
                return NextResponse.json({
                message: "User updated successfully",
                updatedUser,
            }, { status: 201 });
            }

        }else{

        const user = await NewUser.findOneAndUpdate(
            { clerkId },
            {
              userName,
              email,
              createdAt,
              updatedAt,
            },
            { upsert: true, new: true } 
          );

        // const savedUser = await user.save();

        return NextResponse.json({
            message: "User created successfully",
            user,
        }, { status: 201 });
    }
    } catch (error: any) {
        console.error("Error creating user:", error);
        return NextResponse.json({
            message: "Failed to create user", error: error.message
        }, { status: 500 });
    }
};