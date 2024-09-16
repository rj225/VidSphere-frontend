import React from "react";

const VideoLoader = () => {
  return (
    <div className="animate-pulse flex flex-col w-full">
      {/* Video skeleton */}
      <div className="sm:px-7 px-3 pt-5 sm:w-8/12 w-full">
        <div className="rounded-xl shadow-md bg-gray-700 h-[250px] lg:h-[480px] md:h-[340px] sm:h-[250px] xl:h-[550px] w-full mb-4"></div>

        {/* Title skeleton */}
        <div className="h-6 bg-gray-700 rounded-md w-3/4 my-3"></div>

        {/* Owner and views skeleton */}
        <div className="flex items-center space-x-3 my-4">
          <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-700 rounded-md w-32"></div>
            <div className="h-4 bg-gray-700 rounded-md w-20"></div>
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="flex space-x-4 mb-4">
          <div className="h-10 w-24 bg-gray-700 rounded-xl"></div>
          <div className="h-10 w-28 bg-gray-700 rounded-xl"></div>
          <div className="h-10 w-32 bg-gray-700 rounded-xl"></div>
          <div className="h-10 w-28 bg-gray-700 rounded-xl"></div>
        </div>

        {/* Description skeleton */}
        <div className="h-20 bg-gray-700 rounded-md w-full my-4"></div>
      </div>

      
    </div>
  );
};

export default VideoLoader;
