"use client";
import { useCursor } from "../context/CursorContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useState, useRef } from "react";

const Cursor: React.FC = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const { setCursorRef } = useCursor();

  useEffect(() => {
    setCursorRef(cursorRef);
    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setCursor({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [setCursorRef]);

  useGSAP(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: cursor.x - 5,
        y: cursor.y - 5,
        ease: "none",
        duration: 0.2,
      });
    }
  }, [cursor]);

  return (
    <div
      ref={cursorRef}
      className="w-[10px] bg-[#000000] h-[10px] max-lg:hidden z-[9999]  flex justify-center items-center text-[2.2px] pt-[1px] font-[400] fixed left-0 top-0 pointer-events-none rounded-full border-zinc-300"
    ></div>
  );
};

export default Cursor;
