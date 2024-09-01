import React from 'react';
import { FaRegSadCry } from 'react-icons/fa';
import 'animate.css';

const NoVideosPlaylist = () => {
  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg text-center animate__animated animate__fadeIn w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      <FaRegSadCry className="text-5xl mb-4 mx-auto" />
      <h2 className="text-lg sm:text-xl md:text-2xl mb-2">No Videos Found</h2>
      <p className="text-sm sm:text-base md:text-lg">Your playlist is empty. Add some videos to see them here.</p>
    </div>
  );
};

export default NoVideosPlaylist;
