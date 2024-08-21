'use client'
import { useCursor } from "../context/CursorContext";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { FaArrowTurnUp } from "react-icons/fa6";
import Navbar from "@/components/Navbar";
import gsap from "gsap";
import TopCompanies from "@/components/TopCompanies";
import Footer from "@/components/Footer";
import ScrollTrigger from "gsap/ScrollTrigger";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import { useEffect, useRef } from "react";

const Home = () => {
  const { cursorRef } = useCursor();
  const elem = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      id:"cardsScroll",
      trigger: elem.current,
      pin: true,
      start: "top top",
      end: ()=> `+=2500vh`, 
      scrub: true,
      invalidateOnRefresh:true,
    });

    
  let timeoutId:any;
  const resizeObserver = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250); // Debounce delay
  };

  window.addEventListener("resize", resizeObserver);

    
    return ()=>{
      ScrollTrigger.getById("cardsScroll")?.kill();
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeObserver);
    }
  }, []);

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
      <div>
        <Navbar />
      </div>
      <div className="w-full min-h-screen relative bg-[#F1F0EE]">
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
                href="/login"
                className="flex justify-center gap-3 md:gap-4 items-center text-[0.83rem] xsm:text-xs xsm:px-3 xsm:py-2 md:text-xs bg-black text-white rounded-full py-[0.3rem] px-[0.7rem] md:px-2 md:py-2 lg:py-3 lg:px-4 lg:text-xs xl:text-xs xl:px-3 xl:py-3 xl:gap-4 font-normal tracking-wide"
              >
                Get Started{" "}
                <FaArrowTurnUp className="rotate-90 translate-y-[1px] text-[11px] font-black xl:text-xs" />
              </Link>
            </div>
          </div>
        </section>

        <section className="relative bg-[#F1F0EE] flex justify-center items-center w-full h-[50%] mb-20">
          <div className="relative w-[87%] h-4/5 bg-red-300 overflow-hidden rounded-2xl">
            <img
              src="https://assets.website-files.com/649fc0a4ab26229b177049b2/64af8ced63999ce6c1352aa2_Hero_Header-p-1600.jpg"
              alt="dashboard"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className=" bottom-0 left-0 right-0 h-[50vh] bg-[#F1F0EE]">
          <div className="w-full">
            <TopCompanies />
          </div>
        </section>
        <section >
          <div className="w-full h-screen  bg-[#F1F0EE] " ref={elem} >
            <Features />
          </div>
        </section>
        <section >
           <div className="w-full h-screen bg-[#F1F0EE]  overflow-hidden">
            <div className="h-1/4 pt-6">
              <div className="flex flex-col justify-center items-center w-[96%]  mx-auto">
                <h1 className="xl:text-4xl xl:font-black max-xl:text-3xl max-xl:font-extrabold max-md:text-xl max-md:font-extrabold ">
                  Reviews that speak volumes.
                </h1>
                <p className="xl:text-lg xl:font-bold mt-4 max-xl:text-lg max-xl:font-bold max-md:text-base max-md:font-bold max-md:px-5">
                  {
                    "Don't just take our word for it, hear what people have to say about us."
                  }
                </p>
              </div>
            </div>
            <div className="h-3/4">
              <Testimonials />
            </div>
          </div>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;