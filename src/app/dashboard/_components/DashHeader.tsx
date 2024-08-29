'use client'

import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { PiHandWavingBold } from "react-icons/pi";
import DashHeaderLoader from "./Loaders/DashHeaderLoader";

const DashHeader = () => {
    const { user } = useUser()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <DashHeaderLoader />
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-3">
                    <h1 className="text-2xl text-zinc-800 font-bold ">Welcome back {user?.username}</h1>
                    <PiHandWavingBold className="text-2xl" />
                </div>
                <div>
                    <div className="flex items-center justify-center gap-5">
                        <div>
                            <div className="flex items-center justify-center gap-3 bg-white px-4 py-1.5 rounded-full shadow-sm">
                                <FaSearch className="text-gray-600 text-lg" />
                                <input
                                    className=" outline-none bg-none"
                                    placeholder="Find your interviews..."
                                    type="text"
                                />
                            </div>
                        </div>
                        <UserButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashHeader;
