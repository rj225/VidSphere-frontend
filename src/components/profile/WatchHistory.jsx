// src/components/profile/WatchHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";
import Formattime from "../utils/Formattime";
import FirstCapital from "../utils/FirstCapital";
import { MdOutlineVideoLibrary } from "react-icons/md";

const WatchHistory = ({ id }) => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if(id){
        try {
        const response = await axios.get(`/api/v1/user/history/${id}`);
        console.log(response.data.data);
        const removenull = response.data.data.filter((history) => history.video !== null)
        setHistory(removenull);
      } catch (error) {
        setError("Failed to fetch watch history");
      }}
    };

    fetchHistory();
  }, [id]);

  if (error)
    return <div className="text-center py-6 text-red-500">{error}</div>;

  return (
    <div className="p-1 md:p-8">
      <h2 className="text-2xl font-bold text-cyan-900 text-center mb-8"><span className=" bg-gradient-to-br from-cyan-100 from-5% to-gray-100 p-4 rounded-3xl shadow-left-top">Your Watch History</span></h2>
      {history.length === 0 ? (
         <div className="flex flex-col items-center justify-center lg:mt-36 h-full p-6 text-center">
         <MdOutlineVideoLibrary className="w-24 h-24 text-gray-700 mb-4" />
         <h3 className="text-xl font-semibold mb-2">No Watch History Available</h3>
         <p className="text-gray-700 italic font-bold mb-4">
           It seems like you haven't watched any videos yet. Start exploring now and enjoy your favorite content!
         </p>
         <Link
           to="/"
           className="text-cyan-700 font-bold underline hover:text-cyan-500 transition-all"
         >
           Go to Home
         </Link>
       </div>
      ) : (
        <ul className="space-y-6 mt-10 sm:relative flex md:flex-row flex-wrap flex-col justify-center items-center">
          {Array.isArray(history) &&
            history.map((item) => (
              <li
                key={item?._id}
                className=" p-4 bg-white w-10/12 border-2 border-cyan-600 backdrop-blur-lg bg-opacity-50 shadow-right-top rounded-lg"
              >
                {item.video && <Link to={`/videoplayer/${item.video._id}`} className="flex sm:flex-row flex-col">
                  <div className="sm:w-1/3 w-full relative">
                    <img
                      src={item.video.thumbnail}
                      alt={item.video.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <p className="text-gray-50 font-sans bg-black px-[4px] font-semibold py-[1.5px] text-sm bg-opacity-55 rounded-lg absolute bottom-5 z-20 right-2">
                      {Formattime(item.video.duration)}
                    </p>
                  </div>
                  <div className="history-info sm:w-2/3 w-full ml-3">
                    <div className="sm:mb-4 mt-3">
                    <h3 className="sm:text-2xl text-lg font-semibold mb-2">
                      {item.video.title}
                    </h3>
                    <p className="my-2 sm:text-md text-sm text-cyan-800">
                    {FirstCapital(item.video.description.split("\n").slice(0, 4).join("\n"))}
                    </p>
                    <p className="flex sm:text-md sm:mb-0 mb-3 text-sm flex-col">
                    {FirstCapital(item.video.owner.fullname)}
                    <span className="text-cyan-500 sm:text-sm text-xs">@{item.video.owner.username}</span>
                    </p>
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <AiOutlineClockCircle className="mr-1" />
                      <span className=" font-sans">
                        Watched on:{" "}
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default WatchHistory;
