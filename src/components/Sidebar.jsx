import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { HiHome } from "react-icons/hi";
import { FaHistory } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";
import { RiPlayList2Fill } from "react-icons/ri";
import { AiOutlineCompass } from "react-icons/ai";
import { toast } from "react-toastify";

const Sidebar = ({ auth }) => {
  const navigate = useNavigate(); 
  const location = useLocation();

  const tabs = [
    { name: "Home", icon: <HiHome />, path: "/" },
    { name: "Watch History", icon: <FaHistory />, path: "/watchhistory" },
    { name: "Subscriptions", icon: <MdSubscriptions />, path: "/subscriptions" },
    { name: "Your Videos", icon: <BiSolidVideos />, path: "/yourvideos" },
    { name: "Playlist", icon: <RiPlayList2Fill />, path: "/playlist" },
    { name: "About us", icon: <AiOutlineCompass />, path: "/aboutus" },
  ];

  const handleNavigation = (tab) => {
    if (tab.path !== '/' && !auth) {
      toast.error("Authorization needed to access this section");
      return;
    }
    navigate(tab.path);
  };

  return (
    <div className={`grid grid-cols-1 mt-2 gap-2 text-lg xl:w-48 md:w-32 2xl:w-11/12 w-full`}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          title={tab.name}
          className={`flex items-center justify-center md:justify-normal lg:space-x-4 md:space-x-2 p-2 transition-all duration-300 xl:text-base 2xl:text-lg md:text-sm text-xl cursor-pointer ${
            location.pathname === tab.path
              ? "bg-cyan-200 text-black rounded-lg" 
              : "hover:bg-gray-700 hover:scale-105 rounded-lg" 
          }`}
          onClick={() => handleNavigation(tab)}
        >
          <span>{tab.icon}</span>
          <span className="md:block hidden">{tab.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
