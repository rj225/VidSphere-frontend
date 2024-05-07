import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const ProfileModal = ({ profile, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-90">
      <div className=" rounded-lg overflow-hidden w-11/12  sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <img src={profile} alt="Profile" className="w-full scale-50" />
        <button className="absolute top-2 right-2 m-4 text-cyan-200 hover:text-red-200 hover:transition hover:duration-150 ">
          <RiCloseCircleLine size="3vw" className="sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl hover:animate-spin-once" onClick={onClose} />
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
