import StackBlocks from '@/components/auth-component/StackBlocks'
import Link from 'next/link';
import React from 'react'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { LuCheckCircle } from "react-icons/lu";
import { MdAttachEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";



const page = () => {
    return (
        <div className=' h-screen overflow-hidden flex items-center justify-between bg-white'>
            <div className=' w-[60%] mx-auto items-center justify-center '>
                <div className='w-[65%] h-screen py-8 mx-auto '>
                    <div className='flex items-center justify-start gap-36'>
                        <div>
                            <Link href='/'>
                                <IoArrowBackCircleOutline className='text-3xl font-extrabold text-gray-900' />
                            </Link>
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                            <p className='text-gray-900 font-semibold'>Already member? </p>
                            <Link href='/login'><p className='text-blue-400 font-semibold underline'>Sign In</p></Link>
                        </div>
                    </div>
                    <div className='pt-14'>
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-4xl font-bold text-gray-900'>Sign Up</h1>
                            <p className='text-sm text-gray-400 font-semibold'>Secure your interview simulations with mock.</p>
                        </div>
                    </div>

                    <form action="" className='w-[60%] mt-8'>
                        <div>
                            <div className='flex items-center justify-start gap-2 border-b-2 '>
                                <FaUser className='text-[1.2rem] font-bold text-gray-500' />
                                <input
                                    className=' w-full px-2 py-2 outline-none bg-none text-gray-600 font-semibold'
                                    type="text"
                                    name=""
                                    placeholder='username' />
                                <LuCheckCircle className=' text-lg mt-2 text-green-400 font-extrabold' />
                            </div>
                            <div>
                                <p className='text-xs text-red-500 font-semibold py-1'>*Username is required</p>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div className='flex items-center justify-start gap-2 border-b-2 '>
                                <MdAttachEmail className='text-2xl font-bold text-gray-500' />
                                <input
                                    className=' w-full px-2 py-2 outline-none bg-none text-gray-600 font-semibold'
                                    type="email"
                                    name=""
                                    placeholder='email' />
                                <LuCheckCircle className=' text-lg mt-2 text-green-400 font-extrabold' />
                            </div>
                            <div>
                                <p className='text-xs text-red-500 font-semibold py-1'>*Username is required</p>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div className='flex items-center justify-start gap-2 border-b-2 '>
                                <PiPasswordFill className='text-2xl font-bold text-gray-500' />
                                <input
                                    className=' w-full px-2 py-2 outline-none bg-none text-gray-600 font-semibold'
                                    type="password"
                                    name=""
                                    placeholder='password' />
                                <FaEyeSlash className=' text-xl mt-2 text-green-400 font-extrabold' />
                            </div>
                            <div>
                                <p className='text-xs text-red-500 font-semibold py-1'>*Username is required</p>
                            </div>
                            <div className=' mt-2'>
                                <div className='text-green-400 flex items-center justify-start gap-4'>
                                    <FaCheck className='text-sm' />
                                    <p className='text-xs text-green-500 font-semibold py-1'>At least 8 characters</p>
                                </div>
                                <div className='text-gray-400 flex items-center justify-start gap-4'>
                                    <GoDotFill className='text-sm ' />
                                    <p className='text-xs text-gray-400 font-semibold py-1'>Least one number (0-9) or a symbol</p>
                                </div>
                                <div className='text-green-400 flex items-center justify-start gap-4'>
                                    <FaCheck className='text-sm' />
                                    <p className='text-xs text-green-500 font-semibold py-1'>Lowecase (a-z) and uppercase (A-Z)</p>
                                </div>

                            </div>
                        </div>
                        <div className=' mt-3 flex items-center justify-center gap-6 bg-blue-600 py-2 rounded-lg'>
                            <button className='text-lg font-semibold text-white'>Sign up</button>
                            <div className='w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center'>
                                <FaLongArrowAltRight className='text-sm text-gray-600' />
                            </div>
                        </div>
                        <p className='text-gray-400 text-center py-2 font-semibold text-lg'>Or</p>
                        <div className=' grid grid-cols-2 gap-4'>
                            <div className=' py-2 text-gray-600 font-semibold rounded-lg bg-gray-200 flex items-center justify-center gap-2 hover:bg-gray-300 transition-all duration-500'>
                                <FcGoogle className='text-2xl' />
                                Google
                            </div>
                            <div className='py-2 text-gray-600 font-semibold rounded-lg bg-gray-200 flex items-center justify-center gap-2 hover:bg-gray-300 transition-all duration-500'>
                                <FaFacebook className='text-2xl text-blue-500' />
                                Facebook
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className=' w-[40%] '>
                <StackBlocks />
            </div>
        </div>
    )
}

export default page