import React, { useState } from "react";
import { HiHome } from "react-icons/hi";
import {
  FaHistory,
  FaShoppingCart,
  FaMusic,
  FaFilm,
  FaNewspaper,
  FaPodcast,
} from "react-icons/fa";
import {
  MdSubscriptions,
  MdSportsSoccer,
  MdTrendingUp,
} from "react-icons/md";
import { BiSolidVideos, BiCategory } from "react-icons/bi";
import { RiPlayList2Fill, RiGamepadFill } from "react-icons/ri";
import { AiOutlineCompass } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = [
    { name: "Home", icon: <HiHome /> },
    { name: "Watch History", icon: <FaHistory /> },
    { name: "Subscriptions", icon: <MdSubscriptions /> },
    { name: "Your Videos", icon: <BiSolidVideos /> },
    { name: "Playlist", icon: <RiPlayList2Fill /> },
    { name: "Explore", icon: <AiOutlineCompass /> },
    { name: "Trending", icon: <MdTrendingUp /> },
    { name: "Shopping", icon: <FaShoppingCart /> },
    { name: "Music", icon: <FaMusic /> },
    { name: "Films", icon: <FaFilm /> },
    { name: "Gaming", icon: <RiGamepadFill /> },
    { name: "News", icon: <FaNewspaper /> },
    { name: "Sport", icon: <MdSportsSoccer /> },
    { name: "Courses", icon: <BiCategory /> },
    { name: "Fashion & Beauty", icon: <GiClothes /> },
    { name: "Podcasts", icon: <FaPodcast /> },
  ];

  return (
    <div
      className={`grid grid-cols-1 mt-2 gap-2 text-lg xl:w-48 md:w-32 2xl:w-11/12 w-full`}
    >
      {tabs.map((tab, index) => (
        <div
          key={index}
          title={tab.name}
          className={`flex items-center justify-center md:justify-normal lg:space-x-4 md:space-x-2 p-2 transition-all duration-300 xl:text-lg 2xl:text-2xl md:text-sm text-xl cursor-pointer ${
            activeTab === tab.name
              ? "bg-cyan-200 text-black rounded-lg"
              : "hover:bg-gray-700 hover:scale-105 rounded-lg"
          }`}
          onClick={() => setActiveTab(tab.name)}
        >
          <span>{tab.icon}</span>
          <span className="md:block hidden">{tab.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
