import React from 'react';
import { Link } from 'react-router-dom';
import { BsFilm } from 'react-icons/bs';
import { AiOutlineVideoCamera } from 'react-icons/ai';

function NoVideos() {
  return (
    <div className="flex flex-col items-center h-[85vh] justify-center py-10 px-4 space-y-6 md:space-y-8 lg:space-y-10">
      {/* Message */}
      <div className="flex items-center text-base sm:text-xl space-x-2">
        <p className="text-zinc-100 underline font-extrabold">No videos uploaded yet!</p>
      </div>
      
      {/* Header */}
      <div className="my-2 mb-6 text-center">
        <h1 className="text-2xl hidden sm:block sm:text-4xl md:text-5xl font-bold text-slate-300">
          Ready to share your Masterpiece?
        </h1>
      </div>

      {/* Upload Prompt */}
      <div className="flex flex-col sm:flex-row text-zinc-400 font-semibold text-lg sm:text-xl items-center space-x-0 sm:space-x-2 my-4 mb-7 text-center sm:text-left">
        <BsFilm className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-0" />
        <p className="text-xl sm:text-2xl font-semibold">
          Upload your{" "}
          <span className="text-cyan-600 font-bold">video</span> and let the magic{" "}
          <span className="text-cyan-600 font-bold">begin</span>.
        </p>
      </div>

      {/* Upload Button */}
      <div className="text-center">
        <Link to="/videoupload">
          <button className="bg-cyan-700 text-white text-md flex items-center justify-center px-4 py-2 rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50">
            <AiOutlineVideoCamera className="h-6 w-6 sm:h-8 sm:w-8 text-gray-100 mr-2" />
            Upload Video
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NoVideos;
