import React from 'react'
import { FaSquareCheck } from "react-icons/fa6";
import { pricingPlans } from '@/utils/pricingData';

type Pricing = {
    name:string;
    description:string;
    price:string;
    duration:string;
    features:string;
}
const Pricing = () => {
    return (
        <div className='w-full h-full flex items-center justify-center flex-col gap-8  md:gap-14 p-4' >
            <div className='flex items-center justify-center flex-col gap-2 md:gap-5'>
                <div className=''>
                    <h1 className=' text-2xl text
                    -center lg:text-5xl   font-bold capitalize'>Smart tech with smart pricing.</h1>
                </div>
                <div>
                    <p className='text-sm md:text-base font-semibold text-center px-4 text-gray-600'>Commit to a year, and watch your savings grow with our exclusive rates!</p>
                </div>
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 md:gap-14'>
                {pricingPlans.map((items) => (
                    <div key={items.name} className='border border-violet-500/20 rounded-lg p-5 flex flex-col gap-3'>
                        <div>
                            <h1 className='text-2xl font-semibold '>{items.name}</h1>
                        </div>
                        <div>
                            <p className='text-sm '>Great for beginners starting their interview preparation journey.</p>
                        </div>
                        <div className='flex items-end justify-start gap-1'>
                            <h1 className='text-5xl font-bold e'>${items.price}</h1>
                            <span>/</span>
                            <p>MO.</p>
                        </div>
                        <div>
                            <button className='w-full rounded-lg border border-slate-500 hover:bg-gradient-to-r  hover:from-violet-300  hover:to-orange-300  hover:text-slate-900 flex items-center justify-center gap-2 font-semibold px-2 py-2 transition-all ease-in duration-700'>Get started </button>
                        </div>
                        <div className='mt-3'>
                            <ul className="list-none mt-2 flex flex-col gap-2 ">
                                <Step title={items.features[0]} />
                                <Step title={items.features[1]} />
                                <Step title={items.features[2]} />
                                <Step title={items.features[3]} />
                                <Step title={items.features[4]} />
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const Step = ({ title }: { title: any }) => {
    return (
        <li className="flex gap-2 items-center justify-start">
            <FaSquareCheck className='text-violet-500' />
            <p className="font-semibold">{title}</p>
        </li>
    );
};


export default Pricing