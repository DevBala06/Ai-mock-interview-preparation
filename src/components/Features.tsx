'use client';
import React, {  useRef } from 'react';
import { features } from '@/utils/features';


// Define the feature type
type Feature = {
  title: string;
  description: string;
  image: any;
  link: string;
  color: string;
  id:number;
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

export const Card: React.FC<Feature> = ({ title, description, image, link, color , id}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  

  return (
    <div className='w-full h-screen sticky top-[2%]  '>
        <div
      ref={cardRef}
      className={`w-[97%] h-[85vh] flex flex-col justify-between relative  mx-auto rounded-xl overflow-hidden shadow-lg mb-12`}
      style={{ backgroundColor: color,top:`calc( ${id*25}px)` }}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
        <p className="mb-6 text-white">{description}</p>
        <a
          href={link}
          className="inline-block px-6 py-2 bg-white text-black rounded-lg"
        >
          Explore
        </a>
      </div>
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwj_1zRTwMQtWXfB9_LIja4AC7uOSfCXJUQ&s'
        alt={title}
        className="w-1/2 h-52 object-cover rounded-b-lg"
      />
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
