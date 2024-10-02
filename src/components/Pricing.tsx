"use client"
import React, { useRef, useState } from "react";
import { FaSquareCheck } from "react-icons/fa6";
import { pricingPlans } from "@/data/pricingData"; // Ensure the path to your pricing data is correct
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Razorpay from "razorpay";
import Script from 'next/script'
import subscriptions from "razorpay/dist/types/subscriptions";
import { useRouter } from "next/navigation";


declare global{interface Window{Razorpay:any}};

// Define the type for the Pricing data structure
type Pricing = {
  name: string;
  description: string;
  price: string;
  duration: string;
  dailyLimit:Number;
  features: string[];
};

// Main Pricing component that renders the pricing plans
const Pricing = () => {

  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-8 md:gap-14 p-4">
      {/* Header section */}
      <div className="flex items-center justify-center flex-col gap-2 md:gap-5">
        <h1 className="text-2xl text-center lg:text-5xl font-bold capitalize">
          Smart tech with smart pricing.
        </h1>
        <p className="text-sm md:text-base font-semibold text-center px-4 text-gray-600">
          Commit to a year, and watch your savings grow with our exclusive
          rates!
        </p>
      </div>

      {/* Pricing cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-14">
        {pricingPlans.map((plan) => (
          <TiltCard key={plan.name} items={plan} />
        ))}
      </div>
    </div>
  );
};

// TiltCard component that implements the tilt effect using Framer Motion
const TiltCard = ({ items }: { items: Pricing }) => {

  const {isSignedIn,user} = useUser();
  const router = useRouter();
  const primaryEmail = user?.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress || "default@example.com";
  const [isProcessing , setIsProcessing] = useState(false);
  

  const handleSubscription = async()=>{
    setIsProcessing(true);
    try {
      if(isSignedIn){
        if(user){
          const response = await axios.post("/api/upgrade-to-pro",{
            ...items,          
            userId: user?.id   
        },
        {
            headers: {
              'Content-Type': 'application/json',
          }
          });
          console.log("Success:", response.data);
          const { subscriptionId, orderId, keyId ,amount } = response.data;
  
          const options = {
            key:keyId,
            amount,
            currency:"INR",
            name:"Mock.io",
            description:"Test transaction",
            order_id:orderId,
            handler:async function(response:any){
              console.log("Payment Successful",response);
              const res = await axios.post("/api/new-user",{
                clerkId:user?.id,
                userName:user.username || "default",
                email:primaryEmail,
                subscription:items?.name,
                interviewLimit:items?.dailyLimit,
                updatedAt: new Date(),
              },{
                headers: {
                'Content-Type': 'application/json',
              },});
              console.log("Subscriptiom",items?.name);
              console.log("User updated",res.data)
            },
            prefill: {
              name: 'Customer Name',
              email: 'customer@example.com',
              contact: '9999999999',
          },
          theme: {
              color: '#3399cc',
          },
          }
          const rzp1 = new window.Razorpay(options);
          rzp1.open()
        }
      }else {
        router.push('/sign-up?redirectTo=/dashboard/settings');
      }
      

    } catch (error) {
      console.log("Payment failed",error)
    }finally{
      setIsProcessing(false);
    }
    

  }

  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative justify-center items-center  border border-violet-500/20 rounded-lg p-3 flex flex-col gap-3 bg-transparent  "
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="  rounded-xl p-6 bg-white shadow-lg"
      >
        <div
          className="relative"

        >
          <h1

            className="text-2xl font-semibold"
          >
            {items.name}
          </h1>
        </div>
        <div className="py-2">
          <p
            className="text-sm">{items.description}</p>
        </div>
        <div className="flex items-end justify-start gap-1">
          <h1
            className="text-5xl font-bold">₹{items.price}</h1>
          <span
          >/</span>
          <p
          >{items.duration}</p>
        </div>
        <div className="py-4">
          <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
          <button
          disabled={isProcessing}
            className="w-full rounded-lg border border-slate-500 hover:bg-black  hover:text-white flex items-center justify-center gap-2 font-semibold px-2 py-2 transition-all ease-in duration-700" onClick={handleSubscription}>
            {isProcessing ?"Processing":"Get started"}
          </button>
        </div>
        <div

          className="mt-3"
        >
          <ul
            className="list-none mt-2 flex flex-col gap-2">
            {items.features.map((feature, index) => (
              <Step key={index} title={feature} />
            ))}
          </ul>
        </div>
      </div>

    </motion.div>
  );
};

// Step component for each feature
const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-center justify-start">
      <FaSquareCheck className="text-violet-500" />
      <p className="font-semibold">{title}</p>
    </li>
  );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

export default Pricing;
