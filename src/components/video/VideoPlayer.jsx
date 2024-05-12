import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import Navtest from "../Navtest";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import { BiSolidBellRing } from "react-icons/bi";
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from "react-icons/io";
import { MdSlowMotionVideo, MdReadMore } from "react-icons/md";
import Dayago from "../utils/Dayago";
import FirstCapital from "../utils/FirstCapital";
import { FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comments from "../Comments/Comments";

const VideoPlayer = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [views, setViews] = useState("");
  const [created, setCreated] = useState("");
  const [auth, setAuth] = useState(false);
  const { id } = useParams(); // Get the videoFilePath from URL parameter
  const [likes, setLikes] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const [subscribeClicked, setSubscribeClicked] = useState(false);
  const [owner, setOwner] = useState("owner");
  const [currentuser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef(null);
  const [commentContent, setCommentContent] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleLikeToggle = async () => {
    if (auth) {
      try {
        // Make a request to the API endpoint
        const response = await fetch(`/api/v1/like/toggle/v/${id}`, {
          method: "POST",
          // Add any necessary headers, such as authorization tokens
          headers: {
            "Content-Type": "application/json",
            // Add any authorization headers if required
          },
        });

        // Check if the request was successful
        if (response.ok) {
          setLikeClicked(!likeClicked);
          if (dislikeClicked) {
            localStorage.setItem("dislikeStatus", false);
            setDislikeClicked(false);
          }
        } else {
          // Handle errors if any
          console.error("Failed to toggle like");
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error("Error toggling like:", error);
      }
    } else {
      navigate("/login");
    }
  };

  const handleClearTextarea = () => {
    textareaRef.current.value = ""; // Clear textarea value
    textareaRef.current.rows = 1; // Reset rows to 1
    setCommentContent("");
  };

  const handleDislike = () => {
    if (auth) {
      // Toggle dislike status in local storage
      const currentDislikeStatus =
        localStorage.getItem("dislikeStatus") === "true";
      localStorage.setItem("dislikeStatus", !currentDislikeStatus);
      setDislikeClicked(!dislikeClicked);
      if (likeClicked) {
        handleLikeToggle();
        setLikeClicked(false);
      }
    } else {
      navigate("/login");
    }
  };

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + "px"; // Set new height
    setCommentContent(textarea.value);
  };

  const HandeEnterButton = (e) => {
    if (e && e.keyCode === 13 && !e.shiftKey) { // Ensure that 'e' is not undefined
      e.preventDefault(); // Prevent default behavior (adding a new line)
      handleCommentPost(e); // Submit the form
    }
  };

  const handleCommentPost = async (e) => {
    e.preventDefault();
    // Trim to remove leading and trailing whitespace
    if (!commentContent.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      const response = await axios.post(
        `/api/v1/comment/v/${id}`,
        { content: commentContent.split('\n').join(' ') }, // Send the comment content as an object
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Comment posted successfully");
      textareaRef.current.value = "";
      textareaRef.current.rows = 1;
      fetchVideo();
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Error posting comment");
    }
  };

  const handleComment = () => {
    if (auth) {
      setCommentClicked(!commentClicked);
      if (commentClicked) {
        document.getElementById("textarea").scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
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
      const user = response.data.data;
      setAuth(true);
      setCurrentUser(user);
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
      const videoFilePath = response.data.data.videoFile;
      setVideoFile(videoFilePath);
      const heading = response.data.data.title;
      setTitle(FirstCapital(heading));
      setDescription(response.data.data.description);
      setViews(response.data.data.views);
      setCreated(response.data.data.createdAt);
      setLikes(response.data.data.likes);
      await fetchOwner(response.data.data.owner);
      await fetchLikedVideos();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOwner = async (ownerId) => {
    try {
      const response = await axios.get(`/api/v1/user/${ownerId}`);
      setOwner(response.data.data);
    } catch (error) {
      console.error(`Error fetching owner with ID ${ownerId}:`, error);
      return null;
    }
  };

  const fetchLikedVideos = async () => {
    try {
      const response = await axios.get("/api/v1/like/videos");
      const likedVideoIds = response.data.data.map((video) => video._id);
      setLikeClicked(likedVideoIds.includes(id));
    } catch (error) {
      console.error("Error fetching liked videos:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchVideo();
    fetchLikedVideos();
  }, [likeClicked, dislikeClicked, likes]);

  if (loading) {
    return (
      <div className=" h-screen w-screen flex justify-center items-center">
        <div className="w-64 h-64 border-t-8 border-b-8 border-t-cyan-500 border-r-[0.1px] border-r-red-400 border-l-[0.1px] border-l-red-400 border-b-cyan-500 rounded-full animate-spin"></div>
        &nbsp;&nbsp;&nbsp;{" "}
        <h3 className="text-2xl animate-pulse text-cyan-500">Loading...</h3>
      </div>
    );
  }

  return (
    <div>
      {auth ? <Navbar /> : <Navtest />}

      {videoFile ? (
        <div className="md:px-7 md:pt-5 w-8/12">
          <div>
            {videoFile && ( // Conditionally render if videoFile is not null
              <video
                controls
                height="auto"
                className="rounded-xl shadow-md shadow-cyan-900 ring-1 ring-cyan-700"
              >
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div className=" text-slate-200 font-semibold text-2xl py-3 mt-2">
            {title && <h1>{title}</h1>}
          </div>

          {/* owner */}
          <div className="flex items-center mb-5">
            <div className="mr-2">
              <img
                src={owner.avatar}
                className="w-12 h-12 text-cyan-600 object-cover rounded-full"
                alt="Avatar"
              />
            </div>
            <p className="text-slate-300 text-md mb-2">
              {FirstCapital(owner.username)}
            </p>

            {/* views */}
            <div className="flex space-x-3 font-sans mx-4 text-slate-300 text-sm mb-2">
              <h4>{views} views</h4>
              <h4 className="text-cyan-200">{Dayago(created)}</h4>
            </div>
          </div>

          <div className="flex justify-start space-x-4 md:w-2/3">
            {/* Like and Dislike */}
            <div className="flex items-center cursor-pointer space-x-1 bg-cyan-800 bg-opacity-15 text-white text-lg py-1 px-3 rounded-xl ring-[0.5px] ring-cyan-800">
              <button
                onClick={handleLikeToggle}
                className={`space-x-1 mr-2 border-r-2 px-2 pr-3 hover:text-cyan-400 border-cyan-800 bg-transparent focus:outline-none ${
                  likeClicked ? "text-cyan-500" : "text-white"
                }`}
              >
                <div className="flex items-center hover:scale-125 duration-300">
                  <FaThumbsUp className=" text-2xl" />
                  <span className="font-sans"> &nbsp;{likes}</span>
                </div>
              </button>
              <button
                onClick={handleDislike}
                className={`flex items-center hover:scale-125 duration-300 space-x-1 px-2 bg-transparent hover:text-red-400 focus:outline-none ${
                  dislikeClicked ||
                  localStorage.getItem("dislikeStatus") === "true"
                    ? "text-red-600"
                    : "text-white"
                }`}
              >
                <FaThumbsDown className="text-2xl" />
              </button>
            </div>

            {/* Comment */}
            <div
              className={`flex items-center cursor-pointer hover:bg-teal-600 hover:bg-opacity-60 space-x-1 hover:scale-105 duration-300 ${
                commentClicked ? "bg-cyan-600" : "bg-cyan-800 bg-opacity-15"
              } text-white text-lg py-2 px-4 rounded-xl ring-[0.5px] ring-cyan-800`}
            >
              <button
                onClick={handleComment}
                className={`flex items-center space-x-1 bg-transparent focus:outline-none`}
              >
                <FaComment className=" text-2xl" />
                <span className="transition duration-500 font-sans">
                Comments 
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

          {/* description */}
          <div className="text-slate-200 bg-slate-50 bg-opacity-10 px-2 rounded-lg pt-3 font-normal mt-5 pb-3 text-lg">
            {showFullDescription || description.split("\n").length <= 3 ? (
              <div className="mb-0">
                {" "}
                <h4>Description - {description} </h4>
                <button
                  onClick={toggleDescription}
                  className="text-cyan-400 flex items-center text-md ml-2 py-2 mt-4 mb-2 hover:underline"
                >
                  Show less &nbsp;{" "}
                  <IoMdArrowDropupCircle className="text-cyan-500" />
                </button>
              </div>
            ) : (
              <div onClick={toggleDescription} className="cursor-pointer">
                <h4 className=" flex">
                  <span>Description - </span>
                  {description.split("\n").slice(0, 3).join("\n")}
                  {"  "}{" "}
                  <span className="text-cyan-400 text-md hover:underline ml-3 flex items-center">
                    ...read more&nbsp;
                    <IoMdArrowDropdownCircle />
                  </span>
                </h4>
              </div>
            )}
          </div>

          {commentClicked && (
            <div className="flex items-start my-4">
              {/* currentuser avatar*/}
              <div className="mr-5">
                <img
                  src={currentuser.avatar}
                  className="w-12 h-12 text-cyan-600 object-cover rounded-full"
                  alt="Avatar"
                />
              </div>

              {/* currentuser comment */}
              <div className="w-full flex flex-col">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  id="textarea"
                  placeholder="Add your comment..."
                  className="w-full text-md font-medium overflow-y-hidden p-2 resize-none text-cyan-500 bg-transparent border-b-2 focus:outline-none"
                  onInput={handleTextareaInput}
                  onKeyDown={HandeEnterButton}
                />
                <div className="flex justify-end mt-2 space-x-4">
                  <button
                    onClick={handleClearTextarea}
                    className="hover:ring-cyan-700 hover:ring-1 hover:scale-105 transition duration-200 rounded-full p-3 text-slate-300 hover:animate-spin-once"
                  >
                    <FaTimes className="sm:text-2xl hover:animate-spin-once" />
                  </button>
                  <button
                    onClick={handleCommentPost}
                    className="bg-cyan-400 hover:scale-105 transition duration-200 flex items-center text-xl text-bold text-slate-900 px-4 py-2 font-medium rounded-3xl"
                    type="submit"
                    disabled={!commentContent.trim()}
                  >
                    <FaSave className="mr-2" />
                    Comment
                  </button>
                </div>
              </div>
            </div>
          )}

          {commentClicked && (
            <Comments videoId={id}/>
          )}
        </div>
      ) : (
        <div className="md:mx-6 md:mt-5 w-8/12 md:h-[500px] rounded-xl ring-[0.5px] ring-cyan-200 shadow-3xl flex flex-col text-white justify-center items-center">
          <MdSlowMotionVideo className="text-6xl text-cyan-200" />
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
