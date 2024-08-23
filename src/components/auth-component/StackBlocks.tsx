'use client'

import React, { useEffect, useState } from 'react';
import { GiKeyCard } from "react-icons/gi";
import wave from '../../assets/wave.png'
import Image from 'next/image';

const StackBlocks = () => {
    const [counter, setCounter] = useState(0);
    const [counter2, setCounter2] = useState(0);

    useEffect(() => {
        const interval1 = setInterval(() => {
            setCounter(prevCounter => {
                if (prevCounter < 300) {
                    return prevCounter + 1;
                } else {
                    clearInterval(interval1);
                    return prevCounter;
                }
            });
        }, 5);

        const interval2 = setInterval(() => {
            setCounter2(prevCounter => {
                if (prevCounter < 500) {
                    return prevCounter + 1;
                } else {
                    clearInterval(interval2);
                    return prevCounter;
                }
            });
        }, 5);

        // Cleanup function to clear intervals
        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        };
    }, []);

    return (
        <div className='h-screen relative bg-[#5566FF] rotate-3'>
            <div className='absolute -top-[11rem] -left-28 rounded-[3rem] w-[90%] md:w-[40rem] h-[30%] bg-blue-800 -rotate-[17deg] z-30'></div>
            <div className='absolute -top-28 -right-28 rounded-3xl w-[80%] md:w-[70%] h-[30%] bg-blue-400 z-20'></div>
            <div className='h-full bg-blue-500 relative rotate-0 overflow-hidden'>
                <div className='absolute -right-5 top-[43%] w-[95%] md:w-[45rem] h-[40%] bg-blue-400 rounded-[3rem] -rotate-[17deg]'></div>
            </div>
            <div className='absolute top-[56%] -right-[2rem] md:-right-[6rem] w-[100%] md:w-[48rem] h-[40%] bg-blue-300 rounded-[3rem] -rotate-28 overflow-hidden'></div>
            <div className='absolute top-[80%] -right-10 md:-right-28 w-[90%] md:w-[40rem] h-[40%] bg-blue-500 rounded-3xl -rotate-45'></div>
            <div className='absolute top-[19%] left-[25%] flex flex-col gap-14 z-50 -rotate-3'>
                <div className='w-40 h-56 bg-white rounded-lg'>
                    <div className='p-5 pb-0'>
                        <h1 className='text-sm font-bold text-orange-500'>Registered Users</h1>
                        <p className='text-2xl text-gray-900 font-bold'>{counter}+</p>
                    </div>
                    <div className='h-auto w-auto'>
                        <Image src={wave} alt='wave' width={300} height={300} />
                    </div>
                    <div className='p-5 pt-0'>
                        <h1 className='text-sm font-bold text-orange-500'>Interviews</h1>
                        <p className='text-2xl text-gray-900 font-bold'>{counter2}+</p>
                    </div>
                </div>
                <div className='w-96 h-48 p-5 bg-white rounded-lg flex items-center justify-between gap-5'>
                    <div className='w-[40%]'>
                        <div className='flex flex-col gap-4'>
                            <div className='w-[40%] h-2 bg-blue-500 rounded-full'></div>
                            <div className='w-[80%] h-2 bg-gray-200 rounded-full'></div>
                            <div className='w-[60%] h-2 bg-gray-200 rounded-full'></div>
                            <div className='w-[75%] h-2 bg-gray-200/40 rounded-full'></div>
                            <div className='w-[85%] h-2 bg-gray-200/50 rounded-full'></div>
                        </div>
                    </div>
                    <div className='w-[60%] flex flex-col gap-2'>
                        <div>
                            <GiKeyCard className='text-orange-500 text-4xl' />
                        </div>
                        <h1 className='text-zinc-900 font-extrabold'>Your data your rules</h1>
                        <p className='text-xs text-zinc-500 font-semibold'>Your data belongs to you, and our encryption ensures that.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StackBlocks;
