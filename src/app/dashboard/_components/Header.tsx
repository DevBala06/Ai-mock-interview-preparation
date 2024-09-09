'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Modal from './Modal'

const Header = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div className='flex items-center justify-between max-w-7xl mx-auto'>
      <div>
        <h1 className='text-lg text-zinc-800 font-semibold'>Interviews</h1>
      </div>
      <div>
        <Link href="/dashboard/interviews">
          <button onClick={handleOpenModal} className='bg-[#d6f462] text-zinc-800 px-4 py-2 rounded-lg font-bold hover:bg-[#cff143]'>Create interview</button>
          <Modal openModal={openModal} handleCloseModal={handleCloseModal} />
        </Link>
      </div>
    </div>
  )
}

export default Header