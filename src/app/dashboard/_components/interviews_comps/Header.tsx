import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='flex items-center justify-between max-w-6xl mx-auto'>
      <div>
        <h1 className='text-lg text-zinc-800 font-semibold'>Interviews</h1>
      </div>
      <div>
        <Link href="/dashboard/create-interview">
          <button className='bg-[#d6f462] text-zinc-800 px-4 py-2 rounded-lg font-bold hover:bg-[#cff143]'>Create interview</button>
        </Link>
      </div>
    </div>
  )
}

export default Header