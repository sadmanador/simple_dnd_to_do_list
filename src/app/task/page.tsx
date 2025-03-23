"use client";

import Completed from "@/components/Completed/Completed";
import Current from "@/components/Current/Current";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; 
import { useRouter } from "next/navigation";


export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const { data: session, status } = useSession(); 
  const router = useRouter(); 

  useEffect(() => {

    if (status === "loading") return; 
    if (!session) {
      router.push("/"); 
    }
  }, [session, status, router]); 

  if (status === "loading") {
    return <div>Loading...</div>; 
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-8 gap-4">
      <h1 className="font-semibold text-3xl">My Tasks</h1>
      <div className="w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-lg">
        <ul className="flex items-center justify-center gap-4 text-lg font-medium">
          <li>
            <a
              onClick={() => setActiveTab(0)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-3 text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-md ${
                activeTab === 0 ? "bg-white shadow-md text-gray-900" : ""
              }`}
            >
              Current Tasks
            </a>
          </li>
          <li>
            <a
              onClick={() => setActiveTab(1)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-3 text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-md ${
                activeTab === 1 ? "bg-white shadow-md text-gray-900" : ""
              }`}
            >
              Completed Tasks
            </a>
          </li>
        </ul>
        <div className="py-5 min-h-[300px]">
          {activeTab === 0 && (
            <div className="transition-opacity duration-600 opacity-100">
              <Current />
            </div>
          )}
          {activeTab === 1 && (
            <div className="transition-opacity duration-600 opacity-100">
              <Completed />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
