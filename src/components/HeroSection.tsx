
import { useCursor } from '@/context/CursorContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link'
import React from 'react'
import { FaArrowTurnUp } from 'react-icons/fa6'


const HeroSection = () => {
  const { cursorRef } = useCursor();
  const { contextSafe } = useGSAP();

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (cursorRef && cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: "4",
        backgroundColor: "white",
        duration: "0.3",
        ease: "power3.out",
        mixBlendMode: "difference",
        opacity: "1",
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (cursorRef && cursorRef.current) {
      cursorRef.current.innerHTML = "";
      gsap.to(cursorRef.current, {
        scale: "1",
        backgroundColor: "#000000",
        duration: "0.3",
        ease: "power3.out",
        mixBlendMode: "normal",
      });
    }
  };

  return (
    <>
      <section className="w-full h-[89%] relative flex flex-col justify-center items-center">
        <div className="w-full h-[97%] flex flex-col justify-center mb-10 items-center ">
          <h1 className="text-[1.59rem] xsm:font-extrabold lsm:text-4xl md:text-5xl md:font-extrabold lg:text-5xl xl:text-[3.6rem] xl:font-extrabold font-bold text-wrap text-center leading-tight select-none">
            Transform Your{" "}
            <div className="relative inline-block">
              <div
                className="xl:w-[26rem] xl:h-[15rem] xl:-left-[5.6rem] xl:-top-[5.8rem]
                lg:w-[23rem] lg:h-[15rem] lg:-left-20 lg:-top-[5.8rem]
                md:w-[21.8rem] md:h-[15rem] md:-left-[4.5rem] md:-top-[5.8rem]
                sm:w-[17rem] sm:h-[11rem] sm:-left-14 sm:-top-[4.3rem]
                lsm:w-[16rem] lsm:h-[9rem] lsm:-left-14 lsm:-top-[3rem]
                xsm:w-[11rem] xsm:h-[10rem] xsm:-left-[2rem] xsm:-top-[4rem]
                w-[11rem] h-[10rem] -left-[2rem] -top-[4rem] absolute pointer-events-none"
              >
                <img
                  className="absolute inset-0 w-full h-full object-center pointer-events-none"
                  src="https://assets.website-files.com/62fdbdeb5472695f67359ce1/62fdbdeb5472692028359cfa_your-own-scribble.svg"
                  alt="svg"
                />
              </div>{" "}
              <span
                onMouseEnter={contextSafe(handleMouseEnter)}
                onMouseLeave={contextSafe(handleMouseLeave)}
                className="ml-2 z-20"
              >
                Interview
              </span>{" "}
            </div>
            <br /> with AI
          </h1>
          <div className="flex flex-col justify-center items-center w-full px-2 sm:px-4 md:px-10 lg:px-10 xl:px-10 2xl:px-12">
            <p className="font-semibold text-sm xsm:text-xs xsm:leading-4 xsm:px-6 sm:text-xs leading-4 md:text-sm md:px-32 lg:px-32 lg:text-sm xl:text-sm xl:px-80 2xl:text-2xl mt-3 text-center">
              Maximize your interview potential with our advanced AI
              technology. Personalized insights and real-time feedback ensure
              you approach each interview confidently and effectively.
            </p>
          </div>
          <div className="mt-3">
            <Link
              href="/sign-in"
              className="flex justify-center gap-3 md:gap-4 items-center text-[0.83rem] xsm:text-xs xsm:px-3 xsm:py-2 md:text-xs bg-black text-white rounded-full py-[0.3rem] px-[0.7rem] md:px-2 md:py-2 lg:py-3 lg:px-4 lg:text-xs xl:text-xs xl:px-3 xl:py-3 xl:gap-4 font-normal tracking-wide"
            >
              Get Started{" "}
              <FaArrowTurnUp className="rotate-90 translate-y-[1px] text-[11px] font-black xl:text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection