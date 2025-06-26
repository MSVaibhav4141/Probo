"use client";
import { useState } from "react";

const categories = [
  "All events",
  "Cricket",
  "Crypto",
  "News",
  "Football",
  "Youtube",
  "Motorsports",
  "Gaming",
  "Basketball",
  "Chess",
  "Tennis",
  "Probo",
  "Hockey",
];

export default function Tabs({ onTabChange }: { onTabChange?: (tab: string) => void }) {
  const [activeTab, setActiveTab] = useState("All events");

  const handleClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="overflow-x-auto whitespace-nowrap border-b border-gray-200 bg-white">
      <div className="flex space-x-6 px-4 py-2 min-w-max justify-center items-center">
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => handleClick(tab)}
            className={`text-sm pb-2 border-b-2 ${
              activeTab === tab
                ? "font-semibold text-black border-black"
                : "text-gray-500 border-transparent hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
