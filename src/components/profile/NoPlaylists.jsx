import React from 'react';
import { FaRegFrownOpen } from 'react-icons/fa';
import 'animate.css';

const NoPlaylists = () => {
  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg text-center animate__animated animate__fadeIn w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      <FaRegFrownOpen className="text-5xl mb-4 mx-auto" />
      <h2 className="text-lg sm:text-xl md:text-2xl mb-2">No Playlists Available</h2>
      <p className="text-sm sm:text-base md:text-lg">It looks like you haven't created any playlists yet. Start by creating a new playlist!</p>
    </div>
  );
};

export default NoPlaylists;
