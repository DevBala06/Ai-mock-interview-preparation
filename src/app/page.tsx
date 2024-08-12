"use client";
import { useCursor } from "../context/CursorContext";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { FaArrowTurnUp } from "react-icons/fa6";
import gsap from "gsap";

const Home: React.FC = () => {
  const { cursorRef } = useCursor();
  const { contextSafe } = useGSAP();

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if(cursorRef){
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: "3",
          backgroundColor: "white",
          duration: "0.3",
          ease: "power3.out",
          mixBlendMode: "difference",
          opacity: "1",
        });
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if(cursorRef){
      if (cursorRef.current) {
        cursorRef.current.innerHTML = "";
        gsap.to(cursorRef.current, {
          scale: "1",
          backgroundColor: "#000000",
          duration: "0.3",
          ease: "power3.out",
          mixBlendMode: "normal",
        });
      }
    }
  };

  return (
    <div className="w-full h-[89%] flex justify-between items-center">
      <div className="w-full h-[97%] flex flex-col justify-center items-center">
        <h1 className="text-xl lg:text-2xl  font-black text-wrap text-center leading-tight select-none">
          Transform Your{" "}
          <span
            onMouseEnter={contextSafe(handleMouseEnter)}
            onMouseLeave={contextSafe(handleMouseLeave)}
            className="relative z-20"
          >
            Interview
          </span>{" "}
          <span>
            <img
              className="absolute pointer-events-none w-40 h-40 top-[8.2rem] right-[10px] xsm:right-9 xsm:top-[8.5rem] lsm:right-[3.8rem] md:right-[14.5rem] md:top-[8.7rem] lg:top-[11.3rem] lg:right-[20.7rem] lg:w-[12.3rem] lg:h-[12.3rem]"
              src="https://assets.website-files.com/62fdbdeb5472695f67359ce1/62fdbdeb5472692028359cfa_your-own-scribble.svg"
              alt="svg"
            />
          </span>{" "}
          <br /> with AI
        </h1>
        <div className="flex flex-col justify-center items-center w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
  <p className="font-semibold text-[11px] sm:text-base leading-3 md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl mt-3 text-center">
    Maximize your interview potential with our advanced AI technology. Personalized insights and real-time
  </p>
  <p className="font-semibold text-[11px] leading-none sm:text-base md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl mt-[2px] text-center">
    feedback ensure you approach each interview confidently and effectively.
  </p>
</div>


        <div className="mt-3">
          <Link
            href={"/login"}
            className="flex justify-center gap-3 md:gap-4 items-center text-[10px] md:text-xs bg-black text-white rounded-full py-[5px] px-2 md:px-2 md:py-2 lg:py-3 lg:px-5 font-normal tracking-wide"
          >
            Get Started{" "}
            <FaArrowTurnUp className="rotate-90 translate-y-[1px] text-[11px] font-black" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
