import StackBlocks from '@/components/auth-component/StackBlocks'
import React from 'react'

const page = () => {
    return (
        <div className=' h-screen overflow-hidden flex items-center justify-between gap-4 bg-white'>
            <div className=' w-[60%]'>
                
            </div>

            <div className=' w-[40%] '>
                <StackBlocks />
            </div>
        </div>
    )
}

export default page