import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Formattime from "../utils/Formattime";
import FirstCapital from "../utils/FirstCapital";
import DeleteVideo from "./update/DeleteVideo";
import { IoMdEye } from "react-icons/io";
import { AiOutlineUpload, AiOutlineVideoCamera } from "react-icons/ai";
import { BsFilm } from "react-icons/bs";
import {FaThumbsUp} from "react-icons/fa";

function Display({ auth  , id , modify}) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // useEffect(() => {
  //   if (isDelete) {
  //     // Prevent scrolling when DeleteVideo component is open
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     // Re-enable scrolling when DeleteVideo component is closed
  //     document.body.style.overflow = "visible";
  //   }
  // }, [isDelete]);

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
    fetchVideos();
    if (isDelete) {
      // Prevent scrolling when DeleteVideo component is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when DeleteVideo component is closed
      document.body.style.overflow = "visible";
    }
  }, [auth, isDelete , isVideo]);

  async function fetchVideos() {
    try {
      const response = await axios.get(`/api/v1/video/${id}/videos`);
      setVideos(response.data.data); // Update here to access response.data.videos.docs
      setIsVideo(true);
    } catch (error) {
      setError(error.response.data.message);
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
    <>
      {isVideo ? (
        <div className="my-4">
          <div className="flex sm:flex-wrap sm:flex-row flex-col w-full items-center gap-4">
            {Array.isArray(videos) &&
              videos.map((video) => (
                <div
                  key={video._id}
                  className="relative hover:scale-105 duration-300 sm:w-1/4 w-full"
                  onMouseEnter={toggleDots(video._id)}
                  onMouseLeave={toggleDots(null)}
                >
                  <Link to={`/videoplayer/${video._id}`}>
                    <div className="p-4 bg-cyan-50 rounded-2xl z-0 bg-opacity-25 filter shadow-lg relative">
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
                        <div className="flex items-center mr-3 text-md"><IoMdEye className="mr-1"/> {video.views}</div>
                        <div className="flex items-center mr-2 text-md"><FaThumbsUp className="text-md text-cyan-800 mr-1"/>{video.likes}</div>
                      </div>
                      {/* Add more video details here as needed */}
                    </div>
                  </Link>

                  <div className="z-10 cursor-pointer">
                    {modify && visibleVideoId === video._id && (
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
        <div className="flex flex-col items-center justify-center py-10 space-x-4">
          <div className="flex items-center text-xl space-x-2">
            <p className=" text-zinc-700 underline font-extrabold">
              No videos uploaded yet!
            </p>
          </div>
          <div className="my-2 mb-6">
            <h1 className="text-5xl font-bold text-slate-900">
              Ready to share your Masterpiece?
            </h1>
          </div>
          <div className="flex text-zinc-800 font-semibold text-xl items-center space-x-2 my-4 mb-7">
            <BsFilm className="h-8 w-8" />
            <p className="text-2xl font-semibold">
              Upload your{" "}
              <span className="text-emerald-600 font-bold">video</span> and let
              the magic{" "}
              <span className="text-emerald-600 font-bold">begin</span>.
            </p>
          </div>
          <div className="">
            <Link to="/videoupload">
              <button className="bg-cyan-700 text-white text-md items-center px-2 flex py-2 rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50">
                <AiOutlineVideoCamera className="h-8 w-8 text-gray-100" />{" "}
                &nbsp; Upload Video
              </button>
            </Link>
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}
    </>
  );
}

export default Display;
