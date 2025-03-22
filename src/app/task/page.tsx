"use client";

import Current from "@/components/Current/Current";
import { useState } from "react";



export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-4  gap-2">
      <h1 className="font-semibold text-2xl">My Tasks</h1>
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1">
        <ul className="flex items-center gap-2 text-sm font-medium">
          <li>
            <a
              onClick={() => setActiveTab(0)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2  hover:bg-white hover:text-gray-700 hover:shadow ${
                activeTab === 0 ? "bg-white shadow text-gray-700" : ""
              }`}
            >
              Profile
            </a>
          </li>
          <li>
            <a
              onClick={() => setActiveTab(1)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2  hover:bg-white hover:text-gray-700 hover:shadow ${
                activeTab === 1 ? "bg-white shadow text-gray-700" : ""
              }`}
            >
              Preferences
            </a>
          </li>
        </ul>
        <div className="py-3">
          {activeTab === 0 && (
            <div className="transition-opacity duration-600 opacity-100">
              <Current />
            </div>
          )}
          {activeTab === 1 && (
            <div className="transition-opacity duration-600 opacity-100">
              Tab content 2
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
