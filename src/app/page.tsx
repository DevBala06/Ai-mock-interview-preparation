'use client'
// import { useCursor } from "../context/CursorContext";
// import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import gsap from "gsap";
import TopCompanies from "@/components/TopCompanies";
import Footer from "@/components/Footer";
import ScrollTrigger from "gsap/ScrollTrigger";
import Features from "@/components/Features";
import { useEffect, useRef, useState } from "react";
import Pricing from "@/components/Pricing";
import HeroSection from "@/components/HeroSection";
import DashboardImg from "@/components/DashboardImg";
import TestimonialSection from "@/components/TestimonialSection";

const Home = () => {
  // const { cursorRef } = useCursor();
  const elem = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  // const { contextSafe } = useGSAP();
  
  useEffect(() => {
    const calculateHeight = () => {
      if (elem.current) {
        const rect = elem.current.getBoundingClientRect(); // Get the section height
        return rect.height;
      }
      return 1000; // Fallback value
    };
    
    const updateHeight = () => {
      const height = calculateHeight();
      setSectionHeight(height);
    };

    updateHeight();
    
    gsap.registerPlugin(ScrollTrigger);
  
    // Create ScrollTrigger instance
    ScrollTrigger.create({
      id: "cardsScroll",
      trigger: elem.current,
      pin: true,
      start: "top top",
      end: () => `+=${sectionHeight}px`, 
      scrub: true,
      invalidateOnRefresh: true,
    });
  
    // Debounced resize event handler
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
      ScrollTrigger.refresh(true); // Force a full refresh after recalculating height
    });

    if (elem.current) {
      resizeObserver.observe(elem.current);
    }
    // Add resize event listener
  
    // Cleanup function
    return () => {
      ScrollTrigger.getById("cardsScroll")?.kill();
      if (elem.current) {
        resizeObserver.unobserve(elem.current);
      }
      resizeObserver.disconnect();
    };
  }, []);
  

  
  
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="w-full min-h-screen relative bg-[#F1F0EE]">
        <HeroSection/>

        <DashboardImg/>

        <section className=" bottom-0 left-0 right-0 w-[87%] mx-auto h-[50vh] bg-[#F1F0EE]">
          <div className="w-full">
            <TopCompanies />
          </div>
        </section>
        <section className="min-h-fit mb-56 "  >
          
          <div className="w-full min-h-fit  bg-[#F1F0EE] "  ref={elem} >
            <Features />
          </div>
        </section>
        <TestimonialSection/>
            <div className="w-[90%] mx-auto h-full lg:h-screen mt-11">
              <Pricing/>
            </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;