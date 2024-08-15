import React from "react";
import { companies } from "../utils/topCompanies";
import IconComponent from "../utils/IconComponent";
import { motion } from "framer-motion";

const TopCompanies = () => {
  const doubledCompanies = [...companies];

  return (
    <>
      <div className="mb-10 flex flex-col justify-center items-center gap-y-4">
        <h1 className="xl:text-4xl xl:font-black max-xl:text-3xl max-xl:font-extrabold max-md:text-xl max-md:font-extrabold ">With Great Outcomes.</h1>
        <h3 className="xl:text-lg xl:font-bold  max-xl:text-lg max-xl:font-bold max-md:text-base max-md:font-bold max-md:px-8">Our customers have gotten offers from awesome companies.</h3>
      </div>
      <div className="overflow-hidden relative h-full flex pb-10 px-2 bg-[#F1F0EE]">
        <motion.div
          className="flex pl-5 absolute ease-linear gap-5"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
        >
          <ul className="flex gap-5">
            {doubledCompanies.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span>
                  <IconComponent logo={item.logo} className="text-3xl" />
                </span>
                <span className="text-lg font-semibold">{item.company}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="flex pl-5 absolute ease-linear gap-5"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
        >
          <ul className="flex gap-5">
            {doubledCompanies.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span>
                  <IconComponent logo={item.logo} className="text-3xl" />
                </span>
                <span className="text-lg font-semibold">{item.company}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#F1F0EE] via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#F1F0EE] via-transparent to-transparent pointer-events-none"></div>
      </div>

      <div className="overflow-hidden relative h-full flex mt-3 pb-10 px-2 bg-[#F1F0EE]">
        <motion.div
          className="flex pl-5 absolute ease-linear gap-5"
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
        >
          <ul className="flex gap-5">
            {doubledCompanies.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span>
                  <IconComponent logo={item.logo} className="text-3xl" />
                </span>
                <span className="text-lg font-semibold">{item.company}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="flex pl-5 absolute ease-linear gap-5"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
        >
          <ul className="flex gap-5">
            {doubledCompanies.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span>
                  <IconComponent logo={item.logo} className="text-3xl" />
                </span>
                <span className="text-lg font-semibold">{item.company}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#F1F0EE] via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#F1F0EE] via-transparent to-transparent pointer-events-none"></div>
      </div>
    </>
  );
};

export default TopCompanies;
