"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { FaComments, FaClipboardList } from "react-icons/fa";
import {
  TbLayoutSidebarRightExpandFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import { FiPieChart } from "react-icons/fi";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [position, setPosition] = useState({
    top: 0,
    height: 0,
    opacity: 0,
  });

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const parentRect = target.parentElement!.getBoundingClientRect();
    setPosition({
      height: rect.height,
      top: rect.top - parentRect.top - 16,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setPosition((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  return (
    <motion.div
      className={`h-[95vh] rounded-2xl flex flex-col ${
        open ? "items-start" : "items-center"
      } m-4 sticky top-0 bg-[#1F1E30] text-[#FDFFF4] shadow-lg flex flex-col p-3`}
      style={{ width: open ? "11rem" : "3rem" }} // Width transition
      initial={{ width: "11rem" }}
      animate={{ width: open ? "11rem" : "3rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
    >
      <div className={`flex ${open ? "pl-4" : ""} justify-between items-center w-full`}>
        {/* Sidebar Header */}
        <div className={`text-lg font-medium mb-6 ${open ? "block" : "hidden"}`}>
          Mock.io
        </div>

        {/* Toggle Icon */}
        <motion.div
          className="cursor-pointer mb-4"
          onClick={handleToggle}
          animate={{
            rotate: open ? 0 : 180, // Rotate the icon based on the sidebar state
            scale: open ? 1 : 1.1, // Slight scale adjustment for visual feedback
          }}
          transition={{ duration: 0.3 }}
        >
          {open ? (
            <TbLayoutSidebarRightCollapseFilled className="text-xl" />
          ) : (
            <TbLayoutSidebarRightExpandFilled className="text-xl" />
          )}
        </motion.div>
      </div>

      {/* Navigation Items */}
      <div className={`relative space-y-4 ${open ? "pl-2" : ""}`}>
        <motion.div
          className="relative flex font-semibold items-center rounded-full z-50 space-x-2 p-2 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{ color: "#1F1E30" }}
          transition={{ duration: 0.3 }}
        >
          <FiPieChart />
          <span className={`${open ? "block" : "hidden"}  `}>
            Dashboard
          </span>
        </motion.div>
        <motion.div
          className="relative flex font-semibold items-center rounded-full z-50 space-x-2 p-2 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{ color: "#1F1E30" }}
          transition={{ duration: 0.3 }}
        >
          <FaClipboardList />
          <span className={`${open ? "block" : "hidden"}`}>
            Interviews
          </span>
        </motion.div>
        <motion.div
          className="relative flex font-semibold items-center rounded-full z-50 space-x-2 p-2 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{ color: "#1F1E30" }}
          transition={{ duration: 0.3 }}
        >
          <FaComments />
          <span className={`${open ? "block" : "hidden"} `}>
            Feedbacks
          </span>
        </motion.div>

        {/* Animated Indicator */}
        <motion.div
          className="absolute w-full rounded-full pointer-events-none bg-[#D8F275] z-30"
          initial={{
            top: 0,
            height: 0,
            opacity: 0,
          }}
          animate={{
            top: position.top,
            height: position.height,
            opacity: position.opacity,
          }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
