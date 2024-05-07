import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Formattime from "../utils/Formattime";
import FirstCapital from "../utils/FirstCapital";

function Display({ auth }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleVideoId, setVisibleVideoId] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const menuRef = useRef(null);


  const toggleDots = (videoId) => {
    return () => {
      setVisibleVideoId(videoId);
    };
  };

  const toggleMenu = (videoId) => {
    return () => {
      setIsOpen((prevId) => (prevId === videoId ? null : videoId));
    };
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (auth) {
      fetchVideos();
    }
  }, [auth]);

  async function fetchVideos() {
    try {
      const response = await axios.get("/api/v1/video/get-user-videos");
      setVideos(response.data.videos.docs); // Update here to access response.data.videos.docs
      console.log("videos fetched");
      console.log(response.data.videos.docs);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-16 h-16 border-t-8 border-b-8 border-t-cyan-500 border-r-[0.5px] border-r-red-400 border-l-[0.5px] border-l-red-400 border-b-cyan-500 rounded-full animate-spin"></div>
        &nbsp;&nbsp;&nbsp;{" "}
        <h3 className="text-2xl animate-pulse text-cyan-800">Loading...</h3>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="my-4">
      <div className="grid grid-cols-3 gap-4">
        {Array.isArray(videos) &&
          videos.map((video) => (
            <div
              key={video._id}
              className="relative"
              onMouseEnter={toggleDots(video._id)}
              onMouseLeave={toggleDots(null)}
            >
              <Link to={`/videoplayer/${video._id}`}>
                <div className="p-4 bg-cyan-50 rounded-2xl z-0 bg-opacity-35 filter shadow-lg relative">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={FirstCapital(video.title)}
                      className="w-full h-60 object-cover z-0 rounded-md relative mb-2"
                    />
                    <p className="text-gray-50 font-sans bg-black px-[4px] font-semibold py-[1.5px] text-sm bg-opacity-55 rounded-lg absolute bottom-2 z-20 right-2">
                      {Formattime(video.duration)}
                    </p>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{FirstCapital(video.title)}</h2>
                  <p className="text-gray-700 mb-2">{FirstCapital(video.description)}</p>
                  {/* Add more video details here as needed */}
                </div>
              </Link>

              <div className="z-10 cursor-pointer">
                {visibleVideoId === video._id && (
                  <div
                    onClick={toggleMenu(video._id)}
                    className="absolute top-1 right-1 cursor-pointer z-10 justify-center items-center flex flex-col h-12 w-3"
                  >
                    <div className="w-1 h-1 mb-1 bg-gray-900 rounded-full"></div>
                    <div className="w-1 h-1 mb-1 bg-gray-900 rounded-full"></div>
                    <div className="w-1 h-1 mb-1 bg-gray-900 rounded-full"></div>
                  </div>
                )}

                {isOpen === video._id && (
                  <div
                    ref={menuRef}
                    className="absolute right-4 top-4 max-w-48 bg-slate-700 bg-opacity-75 rounded-xl shadow-md z-10 overflow-hidden"
                  >
                    <div className="z-20 font-semibold">
                      {/* Menu Items */}
                      <Link to={`/editvideo/${video._id}`}>
                      <div className="block px-4 py-2 text-sm text-cyan-300 active:bg-cyan-100 rounded-t-2xl hover:bg-slate-700 hover:underline hover:text-cyan-400 cursor-pointer">
                        Edit video details
                      </div>
                      </Link>

                      <Link to={`/editvideo/${video._id}`}>
                      <div className="block px-4 py-2 text-sm text-cyan-300 text active:bg-cyan-100 hover:bg-slate-700 hover:underline hover:text-cyan-400 cursor-pointer">
                        Delete Video
                      </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Display;
