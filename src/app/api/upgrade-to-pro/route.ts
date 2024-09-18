import connectToDb from "@/utils/config/db";
import { NextResponse, NextRequest } from "next/server";
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET_KEY!,
});

export async function POST(request:NextRequest) {
    await connectToDb();

    const body = await request.json();
    const {name,description,price,userId} = body ; 
    const priceInPaise = parseInt(price, 10) * 100;

    



    try {
        
        const plan = await razorpay.plans.create({
            period: "monthly",
            interval: 1,
            item: {
              name,
              amount: priceInPaise,
              currency: "INR",
              description,
            },
            notes: {
                note_key: `Monthly ${name} membership - Mock.io`,
              }});
        
        const subscription = await razorpay.subscriptions.create({
            plan_id: plan.id,
            customer_notify: 1,
            quantity: 1,
            total_count: 1200,
            addons: [
              {
                item: {
                  name:`${name} Membership`,
                  amount: priceInPaise,
                  currency: "INR"
                }
              }
            ],
            notes: {
                note_key: `Monthly ${name} membership - Mock.io`,
            }})

        const order = await razorpay.orders.create({
                amount: priceInPaise,
                currency: "INR",
                receipt: subscription.id,
                payment_capture: true,
            });

            return NextResponse.json({
                message: "Subscription created successfully",
                subscriptionId: subscription.id,
                orderId: order.id,
                keyId: process.env.RAZORPAY_KEY_ID,
                amount:priceInPaise,
            });

         
    } catch (error) {
        return NextResponse.json({
            message:"Error occured",
            status:500,
            error,
        })
    }
}