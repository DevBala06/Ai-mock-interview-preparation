'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Modal from './Modal';

interface HeaderProps {
  onInterviewCreated: () => void;
}

const Header: React.FC<HeaderProps> = ({ onInterviewCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
 

  const openModal = () => {
    setIsModalOpen(true);
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
        <h1 className=' text-lg lg:text-2xl text-zinc-800 font-bold'>Your Interviews</h1>
      </div>
      <div>
        <button onClick={openModal} className='bg-[#d6f462] text-sm py-1.5 px-2 text-zinc-800 md:px-4 md:py-2 md:text-base rounded-lg font-bold hover:bg-[#cff143]'>Create interview</button>
        <Modal
          openModal={isModalOpen}
          handleCloseModal={closeModal}
          onSuccessRedirect={handleSuccessRedirect}
        />
      </div>
    </div>
  )
}

export default Header