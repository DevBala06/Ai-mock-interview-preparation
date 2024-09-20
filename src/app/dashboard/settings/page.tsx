"use client"

import Pricing from '@/components/Pricing';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'

const page = () => {

    const [personalDetails , setPersonalDetails] = useState(false);
    const {user} = useUser();

    const primaryEmail = user?.emailAddresses.find(email => email.id === user?.primaryEmailAddressId)?.emailAddress || "default@example.com";
  return (
    <>
    <div className=''>
        <div className='border-b-2 border-b-gray-100 px-2 py-4'>
            <h1 className='text-2xl font-semibold'>Settings</h1>
        </div>
        <div>
            <div className='flex  text-sm font-medium cursor-pointer border-b-2 border-b-gray-100 text-gray-400 gap-x-6 px-2  pt-12 '>
                <h1 onClick={()=>setPersonalDetails(true)} className={`relative pb-2 ${personalDetails ? "text-[#0A9C93] border-b-2 border-[#0a9c92a2]":""}`}>Personal Details
                </h1>
                <h1 onClick={()=>setPersonalDetails(false)} className={`relative pb-2 ${personalDetails ? "":"text-[#0A9C93] border-b-2 border-[#0a9c92a2]"}`}>Plan & Pricing
                </h1>
            </div>
            <div>
{personalDetails ? (
    <div className="text-sm font-semibold">
    <form className="space-y-4">
      {/* Username Field */}
      <div className='w-2/5'>
        <label htmlFor="username" className="block text-sm text-gray-700">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={user?.username || ''}
          readOnly
          className="mt-1 p-2 w-full bg-zinc-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      {/* Email Field */}
      <div className='w-2/5'>
        <label htmlFor="email" className="block text-sm text-gray-700">
          Email Id:
        </label>
        <input
          type="email"
          id="email"
          value={primaryEmail || ''}
          readOnly
          className="mt-1 p-2 w-full bg-zinc-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  </div>
  
): (
    <div className='w-5/6 mx-auto'>
        <Pricing/>
    </div>
)}
            </div>
        </div>
    </div>
    </>
  )
}

export default page