"use client";
import React, { useState } from "react";
import DashHeader from "./_components/DashHeader";
import Modal from "./_components/Modal";
import { PerformanceChart } from "./_components/charts/PerformanceChar";
import { TechnicalChart } from "./_components/charts/TechnicalChart";
import { ProductivityChart } from "./_components/charts/ProductivityChart";
import { BehaviouralChart } from "./_components/charts/BehaviouralChart";


const Page = ({ }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const interviewStats = [
    {
      title: 'Total Interviews',
      value: '0',
      percentage: '0%',
      description: 'from last week',
    },
    {
      title: 'Total time spent',
      value: '0 min',
      percentage: '0%',
      description: 'from last week',
    },
    {
      title: 'Completed interviews',
      value: '0',
      percentage: '0%',
      description: 'of total interviews',
    },
  ];

  return (
    <div>
      <div>
        <DashHeader />
      </div>
      <div>
        <div>
          <div className="flex justify-between font-extrabold text-base mt-9 items-center mx-auto">
            <h3>Overview</h3>
            <button onClick={handleOpenModal} type="button" className="bg-[#D8F275] px-3 py-2 text-[#1f1e30ea] rounded-lg">
              Create interview
            </button>
          </div>

          <Modal openModal={openModal} handleCloseModal={handleCloseModal} />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-1">
            {interviewStats.map((stat, index) => (
              <div key={index} className="mt-3 border-t-2 pt-4 border-slate-300 space-y-2">
                <h1 className="font-bold text-base">{stat.title}</h1>
                <h1 className="font-bold text-3xl">{stat.value}</h1>
                <div className="flex gap-x-1 text-sm font-bold">
                  <h1 className="bg-[#D8F275] px-2 rounded-md ">{stat.percentage}</h1>
                  <h1 className="text-gray-600">{stat.description}</h1>
                </div>
              </div>
            ))}
            <div className="mt-3 border-t-2 pt-4 border-slate-300 space-y-2">
              <h1 className="font-bold text-base">Available interviews</h1>
              <h1 className="font-bold text-3xl">1</h1>
              <h1 className="bg-[#D8F275] text-slate-700 w-fit px-2 rounded-md text-sm font-bold">
                Free credit
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 ">
            <div className="">
              <TechnicalChart />
            </div>
            <div>
              <PerformanceChart  />
            </div>
            <div>
              <ProductivityChart />
            </div>
            <div>
              <BehaviouralChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
