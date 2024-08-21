"use client";
import Link from "next/link";
import { motion, Variants } from 'framer-motion';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useCursor } from "../context/CursorContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const Navbar = () => {

  const { cursorRef } = useCursor();
  const { contextSafe } = useGSAP();

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (cursorRef && cursorRef.current) {
      gsap.to(cursorRef.current, {
        duration: "0.3",
        ease: "power3.out",
        opacity: "0",
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
        opacity:'1',
      });
    }
  };

  type Buttons = {
    btn: string;
    hreff: string;
    color: string;
    text: string;
  };

  
  const menuVariants: Variants = {
    hidden: {
      x: "100%",
      opacity: 0,
      display:'none',
      transition: {
        type: "spring",
        stiffness: 45,
      },
    },
    visible: {
      x: "0%",
      opacity: 1,
      display:'flex',
      transition: {
        type: "spring",
        stiffness: 45,
      },
    },
  };

  const btn: Buttons[] = [
    { btn: "Login", hreff: "/login", color: "white", text: "black" },
    { btn: "Signup", hreff: "/sign-up", color: "#1a202c", text: "white" },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);

  const [position, setPosition] = useState({
    left:0,
    width:0,
    opacity:0
  })

  const ref1 = useRef<HTMLAnchorElement>(null);
  const ref2 = useRef<HTMLAnchorElement>(null);
  const ref3 = useRef<HTMLAnchorElement>(null);


  useEffect(() => {
    if (typeof window !== "undefined") {
      // Update window width
      setWidth(window.innerWidth);

      const handleResize = () => {
        setWidth(window.innerWidth);
      };
    
    window.addEventListener("resize", handleResize);

    if (width > 1023) {
      setIsOpen(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }
  }, [width]);
  

  return (
    <>
      <div className="relative mb-32 ">
      <div className="overflow-hidden max-w-screen-xl   mx-auto text-black  px-9 pt-3 flex items-center justify-between ">
        <div className="text-xl font-semibold">
          Mock<span>.io</span>
        </div>
        <div className="max-lg:hidden relative flex z-0  gap-x-2 border-2 border-[#000000] bg-white  uppercase justify-start items-center p-1 h-10 rounded-full"
        onMouseEnter={contextSafe(handleMouseEnter)}
        onMouseLeave={contextSafe(handleMouseLeave)}>
          <Link href={"#"} ref={ref1} onMouseEnter={()=>{
            if(!ref1.current) return;
            const {width} = ref1.current.getBoundingClientRect();
            setPosition({
              width,
              opacity:1,
              left:ref1.current.offsetLeft,
            })
          }} onMouseLeave={()=>{
            setPosition((prv)=>({
              ...prv,
              opacity:0,
            }))
          }} className="relative text-sm text-white   px-3   z-40 mix-blend-difference font-normal ">Home
            {/* <motion.div
              className="bg-blue-500 absolute inset-0"
              style={{ borderRadius: 9999 }}
            ></motion.div> */}
          </Link>
          <Link href={"#"} ref={ref2} onMouseEnter={()=>{
            if(!ref2.current) return;
            const {width} = ref2.current.getBoundingClientRect();
            setPosition({
              width,
              opacity:1,
              left:ref2.current.offsetLeft,
            })
          }} onMouseLeave={()=>{
            setPosition((prv)=>({
              ...prv,
              opacity:0,
            }))
          }} className="text-sm relative z-40 px-3 text-white  mix-blend-difference font-normal ">
            About
          </Link>
          <Link href={"#"} ref={ref3} onMouseEnter={()=>{
            if(!ref3.current) return;
            const {width} = ref3.current.getBoundingClientRect();
            setPosition({
              width,
              opacity:1,
              left:ref3.current.offsetLeft,
            })
          }} onMouseLeave={()=>{
            setPosition((prv)=>({
              ...prv,
              opacity:0,
            }))
          }} className="text-sm relative text-white px-3 z-40  mix-blend-difference font-normal">
            Contact Us
          </Link>
          <motion.div animate={position} className="absolute  h-8 z-30  rounded-full bg-black"></motion.div>
        </div>
        <div className="gap-x-3 flex" onMouseEnter={contextSafe(handleMouseEnter)} onMouseLeave={contextSafe(handleMouseLeave)}>
          {btn.map((button, i) => (
            <Link
              key={i}
              style={{
                backgroundColor: button.color,
                color: button.text,
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                if (button.btn === "Login") {
                  e.currentTarget.style.backgroundColor = button.text;
                  e.currentTarget.style.color = button.color;
                }
              }}
              onMouseLeave={(e) => {
                if (button.btn === "Login") {
                  e.currentTarget.style.backgroundColor = button.color;
                  e.currentTarget.style.color = button.text;
                }
              }}
              className="max-md:hidden py-2 px-5 rounded-full border border-[#0000005d] font-medium text-sm"
              href={button.hreff}
            >
              {button.btn}
            </Link>
          ))}
          <div className="hidden max-lg:flex justify-center items-center ml-3">
            {isOpen===false?
            <RxHamburgerMenu
                className="text-2xl absolute right-3 z-50"
                onClick={() => setIsOpen(true)}
              />:
              <IoClose
                className="text-2xl absolute right-3 z-50"
                onClick={() => setIsOpen(false)}
              />}
            
          </div>
        </div>
       
        
      </div>
      <motion.div
  variants={menuVariants}
  initial="hidden"
  animate={isOpen ? "visible" : "hidden"}
  className="absolute w-[62%] rounded-lg z-10 right-0 top-0 h-[15rem] sm:h-[25rem] lg:hidden bg-[#F1F0EE] backdrop-blur-lg bg-opacity-30 border border-white border-opacity-20 shadow-lg flex-col"
>
  <div className="flex flex-col items-center justify-center gap-y-1 h-full w-full">
    <Link href={"#"}>HOME</Link>
    <Link href={"#"}>ABOUT</Link>
    <Link href={"#"}>CONTACT US</Link>
  </div>
</motion.div>

      </div>
    </>
  );
};

export default Navbar;
