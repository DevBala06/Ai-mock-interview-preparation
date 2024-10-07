"use client";
import React, { useEffect, useState } from "react";
import { TechnicalChart } from "../../DashboardComponents/charts/TechnicalChart";
import { ProductivityChart } from "../../DashboardComponents/charts/ProductivityChart";
import { BehaviouralChart } from "../../DashboardComponents/charts/BehaviouralChart";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { LineCharts } from "@/DashboardComponents/charts/LineCharts";

const DashHeader = dynamic(() => import("@/DashboardComponents/DashHeader"), {
  ssr: false,
});
const Modal = dynamic(() => import("@/DashboardComponents/Modal"), {
  ssr: false,
});

const Page = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [interviewLimit, setInterviewLimit] = useState<number>(0);
  const [interviewCount, setInterviewCount] = useState<number>(0);
  const { user } = useUser();
  const router = useRouter();


  useEffect(() => {
    fetchUserData();
  }, [user])

  const fetchUserData = async () => {
    try {
      const userId = user?.id;
      const UserData = await axios.get(`/api/new-user/${userId}`);
      console.log(UserData?.data?.user?.interviewLimit);
      // var interviewLimitCount = UserData?.data?.user?.interviewLimit;
      const updatedCount = UserData?.data?.user?.interviewLimit;
      setInterviewLimit(updatedCount);
      console.log(interviewLimit);

      // if (interviewLimit) {
      //   setInterviewLimit((prevLimit:any) => prevLimit - 1);
      // }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleOpenModal = () => {
    if (user) {
      fetchUserData().then(() => {
        if (interviewLimit > 0) {
          setOpenModal(true);
        } else {
          alert('You have reached your interview limit.');
        }
      });
    }
  };



  //   useEffect(() => {

  // if(user){
  //     fetchUserData();
  // }
  //   }, [user]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSuccessRedirect = () => {
    router.push("/dashboard/interviews");
  };

  const interviewStats = [
    {
      title: "Total Interviews",
      value: "0",
      percentage: "0%",
      description: "from last week",
    },
    {
      title: "Total time spent",
      value: "0 min",
      percentage: "0%",
      description: "from last week",
    },
    {
      title: "Completed interviews",
      value: "0",
      percentage: "0%",
      description: "of total interviews",
    },
  ];

  return (
    <div className="max-md:w-full max-md:pl-12 max-md:mx-auto ">
      <div>
        <DashHeader />
      </div>
      <div>
        <div>
          <div className=" max-md:w-full mx-auto">
            <div className="flex justify-between font-extrabold text-base mt-9 items-center    mx-auto">
              <h3>Overview</h3>
              <button
                onClick={handleOpenModal}
                type="button"
                className="bg-[#D8F275] px-3 py-2 max-md:px-2 max-md:py-1 max-md:text-sm text-[#1f1e30ea] rounded-lg"
              >
                Create interview
              </button>
            </div>
          </div>

          <Modal
            interviewLimit={interviewLimit}
            setInterviewLimit={setInterviewLimit}
            interviewCount={interviewCount}
            setInterviewCount={setInterviewCount}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            onSuccessRedirect={handleSuccessRedirect}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-1 max-md:w-full">
            {interviewStats.map((stat, index) => (
              <div
                key={index}
                className="mt-3 border-t-2 pt-4 max-md:w-[90%] max-md:mx-auto border-slate-300 space-y-2"
              >
                <h1 className="font-bold text-base">{stat.title}</h1>
                <h1 className="font-bold text-3xl">{stat.value}</h1>
                <div className="flex gap-x-1 text-sm font-bold">
                  <h1 className="bg-[#D8F275] px-2 rounded-md ">
                    {stat.percentage}
                  </h1>
                  <h1 className="text-gray-600">{stat.description}</h1>
                </div>
              </div>
            ))}
            <div className="mt-3 border-t-2 pt-4 border-slate-300 space-y-2">
              <h1 className="font-bold text-base">Available interviews</h1>
              <h1 className="font-bold text-3xl">{interviewLimit ? interviewLimit : '∞'}</h1>
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
              <BehaviouralChart />
            </div>
            <div>
              <ProductivityChart />
            </div>
            <div>
              <LineCharts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
