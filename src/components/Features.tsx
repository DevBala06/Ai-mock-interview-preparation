'use client';
import React, {  useRef } from 'react';
import { features } from '@/data/features';
import Link from 'next/link';
import { FaArrowTurnUp } from "react-icons/fa6";



// Define the feature type
type Feature = {
  title: string;
  description: string;
  image: any;
  link: string;
  color: string;
  id:number;
  titleBgColor:string;
  titleTextColor:string;
  titleBrief:string;
};

type Index = {
    index:number;
}

const Features: React.FC = () => {
  return (
    <div className="relative">
      <h1 className="text-center text-3xl font-bold mb-7">Features Section</h1>
      <Cards features={features} />
    </div>
  );
};

export const Card: React.FC<Feature> = ({ title, description, image, link, color , id , titleBgColor,titleTextColor,titleBrief}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  

  return (
    <div className='w-full h-screen sticky top-[1%]  '>
        <div
      ref={cardRef}
      className={`w-[87%] h-[90vh] flex flex-col justify-between relative  mx-auto rounded-xl overflow-hidden shadow-lg mb-12`}
      style={{ backgroundColor: color,top:`calc( ${id*70}px)` }}
    >
      <div className="p-6 flex ">
       <div className=' flex flex-col h-full' >
       <div className='w-3/4 h-3/4'>
        <h2 className="text-[13px] font-semibold uppercase max-w-fit py-1 px-3 rounded-full  mb-4 " style={{backgroundColor:titleBgColor,color:titleTextColor}}>{title}</h2>
        <h3 className='text-5xl font-normal tracking-normal w-[90%] leading-tight '>{titleBrief}</h3>
        </div>
        <div className='h-2/5'>
        <p className="mb-6 text-xl w-1/2 font-semibold ">{description}</p>
        <Link
          href={link}
          className="flex justify-center items-center gap-x-3 max-w-fit text-xl font-semibold px-6 py-2 bg-transparent text-black border-2 border-black rounded-lg"
        >
          Explore <FaArrowTurnUp className="rotate-90 translate-y-[3px] text-[11px]  xl:text-lg"/>
        </Link>
        </div>
       </div>
     <div className='w-3/6 h-full pr-28 mt-28  '>
     <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwj_1zRTwMQtWXfB9_LIja4AC7uOSfCXJUQ&s'
        alt={title}
        className="w-full h-1/3  object-cover border border-gray-400 scale-[1.6]  rounded-xl"
      />
     </div>
      </div>
    </div>
    </div>
  );
};

// Cards Component
const Cards: React.FC<{ features: Feature[] }> = ({ features }) => {
  return (
    <div className="relative">
      {features.map((feature, i) => (
        <Card key={i} {...feature} />
      ))}
    </div>
  );
};

export default Features;
