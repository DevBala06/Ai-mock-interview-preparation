"use client";
import Link from "next/link";
import { motion, Variants } from 'framer-motion';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

const Navbar = () => {
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
      <div className="relative ">
      <div className="overflow-hidden max-w-screen-xl   mx-auto text-black  px-9 pt-3 flex items-center justify-between ">
        <div className="text-xl font-medium">
          Mock<span>.io</span>
        </div>
        <div className="max-lg:hidden flex border border-[#0000003a] px-5 uppercase justify-start items-center py-2 rounded-full">
          <Link href={"#"} className="relative text-sm font-medium mr-7">
            {/* <motion.div
              className="bg-blue-500 absolute inset-0"
              style={{ borderRadius: 9999 }}
            ></motion.div> */}
            <span className="z-10 relative px-3 py-2">Home</span>
          </Link>
          <Link href={"#"} className="text-sm relative font-medium mr-7">
            About
          </Link>
          <Link href={"#"} className="text-sm relative font-medium">
            Contact Us
          </Link>
        </div>
        <div className="gap-x-3 flex">
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
          className=" absolute w-[62%] rounded-lg  right-0 top-0 h-[15rem]  sm:h-[25rem] lg:hidden  bg-[#6b728070] flex-col"
          
        >
          <div className="flex flex-col  items-center justify-center gap-y-1 h-full w-full">
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
