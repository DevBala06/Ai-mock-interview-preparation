'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

interface HeaderProps {
  onInterviewCreated: () => void;
}

const Header: React.FC<HeaderProps> = ({ onInterviewCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interviewLimit, setInterviewLimit] = useState<number>(0);
const {user} = useUser();
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const userId = user?.id;
      const UserData = await axios.get(`/api/new-user/${userId}`);
      console.log(UserData?.data?.user?.interviewLimit);
      // var interviewLimitCount = UserData?.data?.user?.interviewLimit;
      const updatedCount =  UserData?.data?.user?.interviewLimit;
      setInterviewLimit(updatedCount);
      console.log(interviewLimit);

      // if (interviewLimit) {
      //   setInterviewLimit((prevLimit:any) => prevLimit - 1);
      // }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const openModal = async() => {
    if (user) {
        await fetchUserData();
        if (interviewLimit > 0) {
          setIsModalOpen(true);
        } else {
          alert('You have reached your interview limit.');
        }
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleSuccessRedirect = (interviewId: string) => {
    onInterviewCreated();
    router.push(`/dashboard/interviews/`)
  }


  return (
    <div className='flex items-center justify-between max-w-7xl mx-auto lg:max-w-full'>
      <div>
        <h1 className=' text-lg lg:text-2xl text-zinc-800 font-bold '>Your Interviews</h1>
      </div>
      <div>
        <button onClick={openModal} className='bg-[#d6f462] text-sm py-1.5 px-2 text-zinc-800 md:px-4 md:py-2 md:text-base rounded-lg font-bold hover:bg-[#cff143] text-nowrap'>Create interview</button>
        <Modal
          interviewLimit = {interviewLimit}
          setInterviewLimit = {setInterviewLimit}
          openModal={isModalOpen}
          handleCloseModal={closeModal}
          onSuccessRedirect={handleSuccessRedirect}
        />
      </div>
    </div>
  )
}

export default Header