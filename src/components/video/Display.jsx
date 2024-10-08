import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Formattime from "../utils/Formattime";
import FirstCapital from "../utils/FirstCapital";
import DeleteVideo from "./update/DeleteVideo";
import { IoMdEye } from "react-icons/io";

import { FaThumbsUp } from "react-icons/fa";
import NoVideos from "./NoVideo";
import Loader from "../utils/Loader";

function Display({ auth = true, id, modify = true }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleVideoId, setVisibleVideoId] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [videoId, setVideoId] = useState("");
  const menuRef = useRef(null);
  const [isVideo, setIsVideo] = useState(false);

  function toggleDelete(video) {
    setVideoId(video);
    setIsDelete(!isDelete);
  }

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
    setLoading(true)
    fetchVideos();
    if (isDelete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    setLoading(false)
  }, [auth, isDelete, isVideo]);

  async function fetchVideos() {
    try {
      const response = await axios.get(`/api/v1/video/${id}/videos`);
      if (response.data.data !== "No videos available.") {
        setVideos(response.data.data);
        setIsVideo(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <>
      {isVideo ? (
        <div className="my-4 h-full w-full">
          <div className="flex w-full h-full md:items-start md:justify-normal 2xl:mb-6 xl:mb-4 lg:mb-3 items-center justify-center">
            <h2 className="md:text-2xl text-xl font-bold text-cyan-900 text-center scale-75 sm:scale-90 md:scale-100 mb-2">
              <span className="hidden md:inline-block text-cyan-500 text-3xl">
                Your Videos
              </span>
              <div className=" bg-gradient-to-br md:hidden from-cyan-100 from-5%  to-gray-100 p-4 rounded-3xl shadow-left-top">
                Your Videos
              </div>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 items-center">
            {Array.isArray(videos) &&
              videos.map((video) => (
                <div
                  key={video._id}
                  className="relative hover:scale-105 duration-300 w-full"
                  onMouseEnter={toggleDots(video._id)}
                  onMouseLeave={toggleDots(null)}
                >
                  <Link to={`/videoplayer/${video._id}`}>
                    <div className="p-4 bg-cyan-200 rounded-2xl z-0 filter mr-1 mt-2 shadow-left-top relative">
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={FirstCapital(video.title)}
                          className="w-full h-40 object-cover z-0 rounded-md relative mb-2"
                        />
                        <p className="text-gray-50 font-sans bg-black px-[4px] font-semibold py-[1.5px] text-sm bg-opacity-55 rounded-lg absolute bottom-2 z-20 right-2">
                          {Formattime(video.duration)}
                        </p>
                      </div>
                      <h2 className="sm:text-xl text-md font-semibold text-slate-800 mb-1">
                        {FirstCapital(video.title)}
                      </h2>
                      <div className="text-gray-700 flex font-mono">
                        <div className="flex items-center mr-3 text-md">
                          <IoMdEye className="mr-1" /> {video.views}
                        </div>
                        <div className="flex items-center mr-2 text-md">
                          <FaThumbsUp className="text-md text-cyan-800 mr-1" />
                          {video.likes}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="z-10 cursor-pointer">
                    
                      <div
                        onClick={toggleMenu(video._id)}
                        className="absolute top-1 right-2 cursor-pointer z-10 justify-center items-center flex flex-col h-12 w-3"
                      >
                        <div className="w-1 h-1 mb-1 bg-gray-900 rounded-full"></div>
                        <div className="w-1 h-1 mb-1 bg-gray-900 rounded-full"></div>
                        <div className="w-1 h-1 mb-1 bg-gray-900 rounded-full"></div>
                      </div>

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

                          <div
                            onClick={(e) => toggleDelete(video._id, e)}
                            className="block px-4 py-2 text-sm text-cyan-300 text active:bg-slate-200 hover:bg-slate-700 hover:underline hover:text-cyan-400 cursor-pointer"
                          >
                            Delete Video
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
          {isDelete && (
            <DeleteVideo
              videoId={videoId}
              onClose={toggleDelete}
              showToast={showToast}
            />
          )}
        </div>
      ) : (
        <NoVideos />
      )}
      {/* <ToastContainer /> */}
    </>
  );
}

export default Display;
