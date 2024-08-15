'use client'
import React from "react";
import {motion} from 'framer-motion';
import { testimonials } from "../utils/testimonialData";

const Testimonials = () => {
  const doubleTestimonials = [...testimonials];
  const column1 = doubleTestimonials.filter((_, i) => i % 3 === 0);
  const column2 = doubleTestimonials.filter((_, i) => i % 3 === 1);
  const column3 = doubleTestimonials.filter((_, i) => i % 3 === 2);

  return (
    // <div className='columns-1 sm:columns-2 lg:columns-3 bg-zinc-50  space-y-4 lg:gap-4 p-4 lg:p-0'>
    //   {doubleTestimonials && doubleTestimonials.length > 0 && doubleTestimonials.map((item: any) => (
    //     <div key={item.id} className='bg-gray-900 break-inside-avoid rounded-md p-8 border border-gray-500/30'>
    //       <div className="py-2 flex items-center justify-start gap-2">
    //         <div
    //           className='w-10 h-10 rounded-full bg-gray-700/35 flex items-center justify-center font-bold'
    //           aria-label={`Initials of ${item.username}`}
    //         >
    //           {item.username.slice(0, 1).toUpperCase()}

    //         </div>
    //         <div>
    //           <p className='font-semibold text-xl text-gray-100'>{item.username}</p>
    //         </div>
    //       </div>
    //       <div>
    //         <p className='text-gray-400 text-[1.2rem]'> {item.content}</p>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <>
     <div className="overflow-hidden bg-[#F1F0EE] w-full p-4 lg:p-0  items-center relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
     <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#f1f0eec5] via-transparent to-transparent pointer-events-none z-10"></div>
     {/* <div className="absolute top-[21.4rem]  left-0 w-full h-28 bg-gradient-to-t from-[#f1f0ee8e] via-transparent to-transparent pointer-events-none z-10"></div> */}
      {/* Column 1 - Moves upwards */}
      <div className="flex flex-col  gap-y-4">
      <motion.div
        className="space-y-4"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      >
        {column1.map((item: any) => (
          <div
            key={item.id}
            className="bg-gray-900 break-inside-avoid rounded-md p-8 border border-gray-500/30"
          >
            <div className="py-2 flex items-center justify-start gap-2">
              <div
                className="w-10 h-10 rounded-full bg-gray-700/35 flex items-center justify-center font-bold"
                aria-label={`Initials of ${item.username}`}
              >
                {item.username.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-xl text-gray-100">
                  {item.username}
                </p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-[1.2rem]">{item.content}</p>
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div
        className="space-y-4"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      >
        {column1.map((item: any) => (
          <div
            key={item.id}
            className="bg-gray-900 break-inside-avoid rounded-md p-8 border border-gray-500/30"
          >
            <div className="py-2 flex items-center justify-start gap-2">
              <div
                className="w-10 h-10 rounded-full bg-gray-700/35 flex items-center justify-center font-bold"
                aria-label={`Initials of ${item.username}`}
              >
                {item.username.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-xl text-gray-100">
                  {item.username}
                </p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-[1.2rem]">{item.content}</p>
            </div>
          </div>
        ))}
      </motion.div>
      
      </div>

      {/* Column 2 - Moves downwards */}
      <div className="flex flex-col gap-y-4">
      <motion.div
        className="space-y-4"
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
      >
        {column2.map((item: any) => (
          <div
            key={item.id}
            className="bg-gray-900 break-inside-avoid rounded-md p-8 border border-gray-500/30"
          >
            <div className="py-2 flex items-center justify-start gap-2">
              <div
                className="w-10 h-10 rounded-full bg-gray-700/35 flex items-center justify-center font-bold"
                aria-label={`Initials of ${item.username}`}
              >
                {item.username.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-xl text-gray-100">
                  {item.username}
                </p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-[1.2rem]">{item.content}</p>
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div
        className="space-y-4 "
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
      >
        {column2.map((item: any) => (
          <div
            key={item.id}
            className="bg-gray-900 break-inside-avoid rounded-md p-8 border border-gray-500/30"
          >
            <div className="py-2 flex items-center justify-start gap-2">
              <div
                className="w-10 h-10 rounded-full bg-gray-700/35 flex items-center justify-center font-bold"
                aria-label={`Initials of ${item.username}`}
              >
                {item.username.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-xl text-gray-100">
                  {item.username}
                </p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-[1.2rem]">{item.content}</p>
            </div>
          </div>
        ))}
      </motion.div>
      </div>

      {/* Column 3 - Moves upwards at a slower speed */}
      <div className="flex flex-col gap-y-4">
      <motion.div
        className="space-y-4"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
      >
        {column3.map((item: any) => (
          <div
            key={item.id}
            className="bg-gray-900 break-inside-avoid rounded-md p-8 border border-gray-500/30"
          >
            <div className="py-2 flex items-center justify-start gap-2">
              <div
                className="w-10 h-10 rounded-full bg-gray-700/35 flex items-center justify-center font-bold"
                aria-label={`Initials of ${item.username}`}
              >
                {item.username.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-xl text-gray-100">
                  {item.username}
                </p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-[1.2rem]">{item.content}</p>
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div
        className="space-y-4"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
      >
        {column3.map((item: any) => (
          <div
            key={item.id}
            className="bg-gray-900 break-inside-avoid rounded-md p-8 border border-gray-500/30"
          >
            <div className="py-2 flex items-center justify-start gap-2">
              <div
                className="w-10 h-10 rounded-full bg-gray-700/35 flex items-center justify-center font-bold"
                aria-label={`Initials of ${item.username}`}
              >
                {item.username.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-xl text-gray-100">
                  {item.username}
                </p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-[1.2rem]">{item.content}</p>
            </div>
          </div>
        ))}
      </motion.div>
      </div>
      
    </div>
    </>
  );
};

export default Testimonials;
