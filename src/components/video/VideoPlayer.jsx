import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import Navtest from "../Navtest";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import { BiSolidBellRing } from "react-icons/bi";
import { MdSlowMotionVideo } from "react-icons/md";
import Dayago from "../utils/Dayago";

const VideoPlayer = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [views , setViews] = useState("");
  const [created , setCreated] = useState("");
  const [auth, setAuth] = useState(false);
  const { id } = useParams(); // Get the videoFilePath from URL parameter
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const [subscribeClicked, setSubscribeClicked] = useState(false);
  const navigate = useNavigate();

  const handleLike = () => {
    if (auth) {
      setLikes(likes + 1);
      setLikeClicked(true);
    } else {
      navigate("/login");
    }
  };

  const handleDislike = () => {
    if (auth) {
      setDislikeClicked(true);
    } else {
      navigate("/login");
    }
  };

  const handleComment = () => {
    if (auth) {
      setComments(comments + 1);
      setCommentClicked(true);
    } else {
      navigate("/login");
    }
  };

  const handleSubscribe = () => {
    if (auth) {
      setSubscribed(!subscribed);
      setSubscribeClicked(true);
    } else {
      navigate("/login");
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/v1/user/current-user");
      console.log("Response:", response.data);
      setAuth(true);
    } catch (error) {
      console.error("Error:", error.response.data);
      console.warn("No user At Videoplaer.jsx");
    }
  };

  const fetchVideo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/video/${id}`
      );
      console.log("Response:", response.data);
      const videoFilePath = response.data.data.videoFile; // Assuming response.data.data.videoFile contains the video file path
      setVideoFile(videoFilePath); // Set the video file path
      const heading =
        response.data.data.title.charAt(0).toUpperCase() +
        response.data.data.title.slice(1);
      setTitle(heading);
      setDescription(response.data.data.description);
      setViews(response.data.data.views);
      setCreated(response.data.data.createdAt);


    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchVideo();
  }, []);

  return (
    <div>
      {auth ? <Navbar /> : <Navtest />}

      {videoFile ? (
        <div className="md:px-7 md:pt-5 w-8/12">
          <div>
            {videoFile && ( // Conditionally render if videoFile is not null
              <video controls height="auto" className="rounded-xl shadow-3xl">
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div className=" text-slate-200 font-semibold text-2xl py-5">
            {title && <h1>{title}</h1>}
          </div>

          <div className="flex justify-start space-x-4 md:w-2/3">
            {/* Like and Dislike */}
            <div className="flex items-center cursor-pointer space-x-1 bg-cyan-800 bg-opacity-15 text-white text-lg py-1 px-3 rounded-xl ring-[0.5px] ring-cyan-800">
              <button
                onClick={handleLike}
                className={`space-x-1 mr-2 border-r-2 px-2 pr-3 hover:text-cyan-400 border-cyan-800 bg-transparent focus:outline-none ${
                  likeClicked ? "text-cyan-600" : "text-white"
                }`}
              >
                <div className="flex items-center hover:scale-125 duration-300">
                  <FaThumbsUp className=" text-2xl" />
                  <span> &nbsp;{likes}</span>
                </div>
              </button>
              <button
                onClick={handleDislike}
                className={`flex items-center hover:scale-125 duration-300 space-x-1 px-2 bg-transparent hover:text-red-400 focus:outline-none ${
                  dislikeClicked ? "text-red-600" : "text-white"
                }`}
              >
                <FaThumbsDown className="text-2xl" />
              </button>
            </div>

            {/* Comment */}
            <div className="flex items-center cursor-pointer hover:bg-teal-600 hover:bg-opacity-60 space-x-1 hover:scale-105 duration-300 bg-cyan-800 bg-opacity-15 text-white text-lg py-2 px-4 rounded-xl ring-[0.5px] ring-cyan-800">
              <button
                onClick={handleComment}
                className={`flex items-center space-x-1 bg-transparent focus:outline-none ${
                  commentClicked ? "text-cyan-600" : "text-white"
                }`}
              >
                <FaComment className=" text-2xl" />
                <span className="transition duration-500">
                  Comments &nbsp;{comments}{" "}
                </span>
              </button>
            </div>

            {/* Subscribe */}
            <div className="flex items-center cursor-pointer hover:bg-red-600 hover:bg-opacity-60 hover:scale-110 duration-300 space-x-1 bg-cyan-800 bg-opacity-15 text-white text-lg py-1 px-3 rounded-xl ring-[0.5px] ring-cyan-800">
              <button
                onClick={handleSubscribe}
                className={`flex items-center space-x-1 bg-transparent focus:outline-none ${
                  subscribeClicked ? "text-cyan-600" : "text-white"
                }`}
              >
                <BiSolidBellRing className="text-2xl" />
                <span className="transition duration-500 transform">
                  &nbsp; {subscribed ? "Subscribed" : "Subscribe"}
                </span>
              </button>
            </div>
          </div>

          <div className="flex space-x-3 font-sans text-slate-300 text-sm mb-2">
            <h4>{views} views</h4>
            <h4>{Dayago(created)}</h4>
          </div>

          <div className="text-slate-200 font-normal text-lg">
            <h4>Description - {description}</h4>
          </div>
        </div>
      ) : (
        <div className="md:mx-6 md:mt-5 w-8/12 md:h-[500px] rounded-xl ring-[0.5px] ring-cyan-200 shadow-3xl flex flex-col text-white justify-center items-center">
          
          <MdSlowMotionVideo className="text-6xl text-cyan-200"/>
          <h1 className="text-3xl my-3">Apologies!</h1>
          <p className="text-lg text-slate-300">
            Currently, the video you are looking for is not available. Please
            try again later.
          </p>
          
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
