import React from 'react'

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full p-4">
        <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 border-t-8 border-b-8 border-t-cyan-500 border-r-[0.1px] border-r-red-400 border-l-[0.1px] border-l-red-400 border-b-cyan-500 rounded-full animate-spin"></div>
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 animate-pulse text-cyan-500">
          Loading...
        </h3>
      </div>
  )
}
