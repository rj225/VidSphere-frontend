import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import {
  FaThumbsUp,
  FaComment,
  FaRegComment,
  FaRegThumbsUp,
  FaPlus
} from "react-icons/fa";
import { BiSolidBellRing } from "react-icons/bi";
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from "react-icons/io";
import { MdSlowMotionVideo} from "react-icons/md";
import Dayago from "../utils/Dayago";
import FirstCapital from "../utils/FirstCapital";
import { FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Comments from "../Comments/Comments";
import { useLocation } from "react-router-dom";
import PreviousLocation from "../utils/PreviousLocation";
import DisplayAll from "./DisplayAll";
import Count from "../utils/Count";
import { FaRegBell } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiSolidPlaylist } from "react-icons/bi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoMdRemoveCircle } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";
import Sidebar from "../Sidebar";
import VideoLoader from "../utils/VideoLoader";
import Loader from "../utils/Loader";

const VideoPlayer = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [views, setViews] = useState("");
  const [created, setCreated] = useState("");
  const [auth, setAuth] = useState(false);
  const { id } = useParams();
  const [likes, setLikes] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const [owner, setOwner] = useState({});
  const [ownerId, setOwnerId] = useState("");
  const [currentuser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [videoloaded, setVideoLoaded] = useState(false);
  const textareaRef = useRef(null);
  const [commentContent, setCommentContent] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [refreshCommentsKey, setRefreshCommentsKey] = useState(0);
  const [view, setView] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [inPlaylist, setInPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const prevlocation = PreviousLocation.retrieve();
  if (prevlocation) {
    PreviousLocation.clear();
    PreviousLocation.store(location.pathname);
  } else {
    PreviousLocation.store(location.pathname);
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    let timer;
    const postView = async () => {
      if (!view) {
        try {
          const response = await axios.post(`/api/v1/view/${id}/view`);
          setViews((pview) => pview + 1);
          setView(true);
        } catch (error) {
          // console.log(error);
          
        }
      }
    };

    timer = setTimeout(() => {
      postView();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [view, id]);

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
        } else {
          // Handle errors if any
          console.error("Failed to toggle like");
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error("Error toggling like:", error);
      }
    } else {
      toast.error("Login to like");
    }
  };

  const handleClearTextarea = () => {
    textareaRef.current.value = ""; // Clear textarea value
    textareaRef.current.rows = 1; // Reset rows to 1
    setCommentContent("");
  };

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + "px"; // Set new height
    setCommentContent(textarea.value);
  };

  const HandeEnterButton = (e) => {
    if (e && e.keyCode === 13 && !e.shiftKey) {
      // Ensure that 'e' is not undefined
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
        { content: commentContent.split("\n").join(" ") }, // Send the comment content as an object
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Comment posted successfully");
      textareaRef.current.value = "";
      textareaRef.current.rows = 1;
      setRefreshCommentsKey((prevKey) => prevKey + 1);
      fetchVideo();
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Error posting comment");
    }
  };

  const handleComment = () => {
    if (auth) {
      setCommentClicked(!commentClicked);
    } else {
      toast.error("Login to see comments");
    }
  };

  const handleSubscribe = async () => {
    if (auth) {
      try {
        const promise = axios.post(`/api/v1/subscribe/c/${owner._id}`);

        if (promise) {
          promise.then(() => {
            setSubscribed(!subscribed);
          });
        }

        await toast.promise(promise, {
          pending: `${subscribed ? "Unsubscribing..." : "Subscribing..."}`,
          success: `${
            subscribed
              ? "Unubscribed successfully! 👌"
              : "Subscribed successfully! 🔥"
          }`,
          error: "Failed to subscribe! 🤯 Contact Admin",
        });
      } catch (error) {
        console.error("Error toggling subscription:", error);
      }
    } else {
      toast.error("Login to subscribe");
    }
  };

  const fetchSubscribers = async (ownerId) => {
    if (ownerId && currentuser._id) {
      try {
        const response = await axios.get(`/api/v1/subscribe/c/${ownerId}`);
        if (Array.isArray(response.data.data.subscribers)) {
          const isSubscribed = response.data.data.subscribers.some(
            (subscription) => subscription.subscriber._id === currentuser._id
          );
          setSubscribed(isSubscribed);
        }
      } catch (error) {
        console.error(`Error fetching owner with ID ${ownerId}:`, error);
        return null;
      }
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/v1/user/current-user");
      // console.log("Response:", response.data.data);
      setAuth(true);
      setCurrentUser(response.data.data);
    } catch (error) {
      // console.error("Error:", error.response.data);
      console.warn("No user At Videoplaer.jsx");
    }finally {
      setLoading(false);
    }
  };

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`/api/v1/video/${id}`);
      console.log("Response:", response.data);
      const videoFilePath = response.data.data.videoFile;
      setVideoFile(videoFilePath);
      const heading = response.data.data.title;
      setTitle(FirstCapital(heading));
      setDescription(response.data.data.description);
      setViews(response.data.data.views);
      setCreated(response.data.data.createdAt);
      setLikes(response.data.data.likes);
      setOwnerId(response.data.data.owner);
      await fetchOwner(response.data.data.owner);
      await fetchLikedVideos();
      await fetchSubscribers(response.data.data.owner);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchOwner = async (ownerId) => {
    if (ownerId) {
      try {
        const response = await axios.get(`/api/v1/user/${ownerId}`);
        setOwner(response.data.data);
        fetchSubscribers(response.data.data._id);
      } catch (error) {
        console.error(`Error fetching owner with ID ${ownerId}:`, error);
        return null;
      }finally {
        setVideoLoaded(true);
      }
    }
  };

  const fetchLikedVideos = async () => {
    try {
      const response = await axios.get("/api/v1/like/videos");
      const likedVideoIds = response.data.data.flatMap((video) =>
        video ? video._id : []
      );
      setLikeClicked(likedVideoIds.includes(id));
    } catch (error) {
      console.error("Error fetching liked videos:", error);
    }
  };

  async function fetchUserPlaylists() {
    if (!auth) {
      return;
    }
    try {
      const response = await axios.get(`/api/v1/playlist/user/${ownerId}`);
      setPlaylists(response.data.data);
      setInPlaylist(
        Array.isArray(response.data.data) &&
          response.data.data.some((playlist) => playlist.videos.includes(id))
      );
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  }

  const openPlaylistModal = () => {
    if (auth) {
      setShowPlaylistModal(!showPlaylistModal);
      fetchUserPlaylists();
    } else {
      toast.error("Login to add video to playlist");
    }
  };

  const closePlaylistModal = () => {
    setShowPlaylistModal(!showPlaylistModal);
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      const promise = axios.patch(`/api/v1/playlist/add/${id}/${playlistId}`);
      if (promise) {
        promise.then(() => {
          fetchUserPlaylists();
        });
      }
      await toast.promise(promise, {
        pending: "Adding video to playlist...",
        success: "Video added to the playlist!",
        error: "Failed to add! 🤯 (contact admin)",
      });
    } catch (error) {
      console.error("Error adding video to playlist:", error);
    }
  };

  const handleRemoveFromPlaylist = async (playlistId) => {
    try {
      const promise = axios.patch(
        `/api/v1/playlist/remove/${id}/${playlistId}`
      );
      if (promise) {
        promise.then(() => {
          fetchUserPlaylists();
        });
      }
      await toast.promise(promise, {
        pending: "Removing video from playlist...",
        success: "Video removed from the playlist!",
        error: "Failed to remove! 🤯 (contact admin)",
      });
    } catch (error) {
      console.error("Error removing video from playlist:", error);
    }
  };

  useEffect(() => {
    fetchUserPlaylists();
  }, [ownerId]);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchSubscribers(ownerId);
  }, [subscribed, id, ownerId]);

  useEffect(() => {
    fetchVideo();
    fetchLikedVideos();
  }, [likeClicked, id]);

  useEffect(() => {
    if (id) {
      navigate(`/videoplayer/${id}`);
      setCommentClicked(false);
    }
  }, [id]);

  // useEffect(() => {
  //   if (commentClicked) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [commentClicked]);

  if (loading) {
    return ( <Loader/> );
  }

  return (
    <div>
      <Navbar uploadbutton={auth} nospacebar={true} showuser={true} />
      <div className="flex items-start">
        <div
          className={`md:w-2/12 sticky top-0 sm:w-1/12 w-2/12 px-1 md:px-0 text-white md:block flex items-center md:justify-normal justify-center lg:pl-5 mt-3 lg:ml-2 md:ml-1 overflow-hidden`}
        >
          <Sidebar auth={auth} />
        </div>
        <div className="md:min-h-screen border-l-[1px] border-gray-800 sm:w-11/12 w-10/12 mt-1">
          <div className="flex flex-col w-full sm:flex-row">
          {videoloaded ? (<>
            {videoFile ? (
              <div className="sm:px-7 px-3 pt-5 sm:w-8/12 w-full">
                <div>
                  {videoFile && ( // Conditionally render if videoFile is not null
                    <video
                      ref={videoRef}
                      id="video-player"
                      key={videoFile}
                      controls
                      height="auto"
                      className="rounded-xl shadow-md h-[250px] lg:h-[480px] md:h-[340px] sm:h-[250px] bg-cyan-950 xl:h-[550px] w-full shadow-cyan-900 ring-1 ring-cyan-700"
                    >
                      <source src={videoFile} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>

                <div className=" text-slate-200 font-semibold text-2xl py-3 mt-2">
                  {title && <h1>{title}</h1>}
                </div>

                {/* owner and views */}
                <div className="flex mb-5">
                  <Link to={`/dashboard/${owner.username}`}>
                    <div className="mr-2">
                      <img
                        src={owner.avatar}
                        className="w-12 h-12 text-cyan-600 object-cover rounded-full"
                        alt="Avatar"
                      />
                    </div>
                  </Link>
                  <div className="flex-col">
                    <Link to={`/dashboard/${owner.username}`}>
                      <p className="text-slate-300 text-md mb-1">
                        {FirstCapital(owner.fullname)}
                      </p>
                    </Link>
                    {/* views */}
                    <div className="flex space-x-3 font-sans text-slate-300 text-sm mb-2">
                      <h4>{views} views</h4>
                      <h4 className="text-cyan-200">{Dayago(created)}</h4>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-start space-x-4 sm:w-full w-full">
                  {/* Like */}
                  <div
                    onClick={handleLikeToggle}
                    className="flex items-center sm:my-2 my-2 hover:bg-cyan-700 hover:scale-110 transition-all duration-500 cursor-pointer space-x-1 bg-cyan-800 bg-opacity-15 text-white text-lg py-1 pl-3 pr-1 rounded-xl ring-[0.5px] ring-cyan-800"
                  >
                    <button
                      className={`space-x-1 mr-2 bg-transparent focus:outline-none ${
                        likeClicked ? "text-cyan-500" : "text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        {likeClicked ? (
                          <FaThumbsUp className=" sm:text-2xl text-lg" />
                        ) : (
                          <FaRegThumbsUp className="sm:text-2xl text-lg" />
                        )}
                        <span className="font-sans text-lg sm:text-xl">
                          &nbsp;{Count(likes)}
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Comment */}
                  <div
                    className={` relative flex items-center sm:my-2 my-2 cursor-pointer space-x-1 hover:scale-105 active:scale-100 active:ring-1 active:ring-cyan-400 duration-300 ${
                      commentClicked
                        ? "bg-cyan-600 hover:bg-cyan-600"
                        : "bg-cyan-800 bg-opacity-15 hover:bg-teal-600 hover:bg-opacity-60"
                    } text-white text-lg py-2 px-4 rounded-xl ring-[0.5px] ring-cyan-800 z-40`}
                  >
                    <button
                      className={`flex items-center space-x-2 bg-transparent focus:outline-none`}
                      onClick={handleComment}
                    >
                      {commentClicked ? (
                        <FaComment className="text-lg sm:text-2xl" />
                      ) : (
                        <FaRegComment className="text-lg sm:text-2xl" />
                      )}
                      <span className="transition duration-500 text-lg sm:text-xl font-sans">
                        Comments
                      </span>
                    </button>

                    {commentClicked && (
                      <div className="absolute sm:hidden border-2 -top-10 -left-20 w-[98vw] flex items-center justify-center z-20">
                        <div className="bg-cyan-900 relative rounded-xl shadow-lg p-4 w-full max-w-md overflow-y-auto h-96 z-20">
                          <div className="flex justify-end z-30 relative">
                            <button
                              onClick={() => setCommentClicked(!commentClicked)}
                              className="text-gray-900 absolute border-2 rounded-full hover:animate-spin-once bg-slate-400 top-0 right-0 hover:text-gray-800 "
                            >
                              <FaTimes className="text-2xl" />
                            </button>
                          </div>
                          <div className="flex sm:hidden items-start my-4 mt-8">
                            {/* currentuser avatar*/}
                            <div className="w-2/12 mr-5">
                              <img
                                src={currentuser.avatar}
                                className="w-8 h-8 text-cyan-600 object-cover rounded-full"
                                alt="Avatar"
                              />
                            </div>

                            {/* currentuser comment */}
                            <div className="w-full relative flex flex-col">
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
                                  className="bg-cyan-400 hover:scale-105 transition duration-200 flex items-center sm:text-xl text-base text-bold text-slate-900 px-4 py-2 font-medium rounded-3xl"
                                  type="submit"
                                  disabled={!commentContent.trim()}
                                >
                                  <FaSave className="mr-2" />
                                  Comment
                                </button>
                              </div>
                            </div>
                          </div>

                          <Comments
                            videoId={id}
                            currentuser={currentuser}
                            auth={auth}
                            key={refreshCommentsKey}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Subscribe */}
                  <div
                    onClick={handleSubscribe}
                    className={`flex items-center active:scale-110 z-10 sm:my-2 my-2 cursor-pointer ${
                      subscribed
                        ? "hover:bg-red-500 hover:bg-opacity-80 bg-red-500 bg-opacity-75 text-white "
                        : "hover:bg-teal-600 hover:bg-opacity-60 bg-cyan-800 bg-opacity-15 text-white "
                    } hover:scale-105 duration-500 space-x-1 text-lg py-1 px-3 rounded-xl ring-[0.5px] ring-cyan-800`}
                  >
                    <button
                      className={`flex items-center space-x-1 bg-transparent relative z-10 focus:outline-none ${
                        subscribed ? " text-white" : "text-white"
                      }`}
                    >
                      {subscribed ? (
                        <BiSolidBellRing className="text-lg sm:text-2xl" />
                      ) : (
                        <FaRegBell className="text-lg sm:text-2xl" />
                      )}
                      <span className="transition duration-500 text-lg relative z-10 sm:text-xl transform">
                        &nbsp; {subscribed ? "Subscribed" : "Subscribe"}
                      </span>
                    </button>
                  </div>

                  {/* add to playlist */}

                  <div
                    onClick={openPlaylistModal}
                    className={`flex items-center z-auto sm:my-2 my-2 cursor-pointer ${
                      inPlaylist
                        ? "bg-cyan-700 bg-opacity-80 hover:bg-cyan-700 "
                        : "hover:bg-teal-600 hover:bg-opacity-60 bg-cyan-800 bg-opacity-15 "
                    } hover:scale-105 duration-500 space-x-1 text-lg py-1 px-3 rounded-xl ring-[0.5px] ring-cyan-800`}
                  >
                    <button
                      className={`flex items-center space-x-1 bg-transparent focus:outline-none ${
                        inPlaylist ? "text-cyan-200 " : "text-white"
                      }`}
                    >
                      {inPlaylist ? (
                        <BiSolidPlaylist className="text-xl sm:text-2xl" />
                      ) : (
                        <IoIosAddCircleOutline className="text-xl sm:text-2xl" />
                      )}
                      <span className="transition text-lg sm:text-xl duration-500 transform ">
                        &nbsp;{" "}
                        {inPlaylist ? "Added to playlist" : "Add to playlist"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* description */}
                <div className="text-slate-200 text-wrap bg-slate-50 bg-opacity-10 px-2 rounded-lg py-5 font-normal my-5 mb-8 text-lg">
                  {showFullDescription ||
                  description.split("\n").length <= 3 ? (
                    <div className="mb-0">
                      {" "}
                      <h4>Description - {description} </h4>
                      {showFullDescription && (
                        <button
                          onClick={toggleDescription}
                          className="text-cyan-400 flex items-center text-md ml-2 py-2 mt-4 mb-2 hover:underline"
                        >
                          Show less &nbsp;
                          <IoMdArrowDropupCircle className="text-cyan-500" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div onClick={toggleDescription} className="cursor-pointer">
                      <h4 className="flex flex-wrap flex-row">
                        <span className="flex flex-wrap">
                          Description -&nbsp;
                          {description.split("\n").slice(0, 3).join("\n")}
                        </span>
                        <span className="text-cyan-400 text-md hover:underline ml-3 flex items-center">
                          ...read more&nbsp;
                          <IoMdArrowDropdownCircle />
                        </span>
                      </h4>
                    </div>
                  )}
                </div>

                {commentClicked && (
                  <div className="sm:flex hidden items-start my-4 mt-8">
                    {/* currentuser avatar*/}
                    <div className="mr-5">
                      <img
                        src={currentuser.avatar}
                        className="w-12 h-12 text-cyan-600 object-cover rounded-full"
                        alt="Avatar"
                      />
                    </div>

                    {/* currentuser comment */}
                    <div className="w-full relative flex flex-col">
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
                  <div className="sm:block hidden">
                    <Comments
                      videoId={id}
                      currentuser={currentuser}
                      auth={auth}
                      key={refreshCommentsKey}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="md:mx-6 md:mt-5 w-8/12 md:h-[500px] rounded-xl ring-[0.5px] ring-cyan-200 shadow-3xl flex flex-col text-white justify-center items-center">
                <MdSlowMotionVideo className="text-6xl text-cyan-200" />
                <h1 className="text-3xl my-3">Apologies!</h1>
                <p className="text-lg text-slate-300">
                  Currently, the video you are looking for is not available.
                  Please try again later.
                </p>
              </div>
            )}</>) : <VideoLoader/>}
            <div className="sm:w-4/12 w-full mt-2">
              <DisplayAll
                direction={`flex flex-col`}
                width={`sm:w-full`}
                thumb_width={`sm:w-1/2 w-full`}
                height={`sm:h-32 h-44`}
                content={`flex sm:flex-row flex-col`}
                channelOwnerShow={true}
                id={id}
                auth={auth}
                currentUser={currentuser}
              />
            </div>
          </div>

          {showPlaylistModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-800 p-4 w-full max-w-2xl h-auto max-h-[80vh] overflow-auto rounded shadow-lg text-white relative">
            <button
              onClick={closePlaylistModal}
              className="absolute top-2 right-2 text-red-500 py-1 px-3 rounded"
            >
              <FaTimes className="text-xl hover:animate-spin-once" />
            </button>
            <h3 className="md:text-3xl text-xl text-cyan-200 p-4 md:mb-4">
              My Playlists
            </h3>

            {creating ? null : (
              <button
                onClick={() => setCreating(!creating)}
                className="p-2 rounded bg-cyan-500 ring-1 md:my-0 my-2 md:w-auto md:scale-100 text-sm ring-cyan-400 text-black shadow-xl hover:shadow-3xl duration-300 shadow-cyan-950 hover:underline flex items-center"
              >
                <FaPlus className="mr-2 text-xs" />
                Create New Playlist
              </button>
            )}

            {creating && (
              <div
                className={`animate__animated md:space-x-3 md:space-y-0 space-y-2 animate__fadeIn flex md:flex-row flex-col items-center justify-start mb-4`}
              >
                <input
                  type="text"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className=" p-2 rounded bg-gray-800 ring-1 ring-cyan-600 text-white"
                  placeholder="Playlist name"
                />
                <input
                  type="text"
                  value={newPlaylistDescription}
                  onChange={(e) => setNewPlaylistDescription(e.target.value)}
                  className=" p-2 rounded bg-gray-800 ring-1 ring-cyan-600 text-white"
                  placeholder="Playlist description"
                />
                <div className="flex items-center justify-evenly">
                  <button
                    onClick={createPlaylist}
                    className="p-2 rounded hover:scale-110 hover:bg-cyan-600"
                  >
                    <FaSave className="duration-500 text-3xl text-cyan-400" />
                  </button>
                  <button
                    onClick={() => setCreating(false)}
                    className="ml-2 p-2 hover:scale-110  text-red-400 hover:text-red-500"
                  >
                    <MdCancel className=" duration-500 text-3xl" />
                  </button>
                </div>
              </div>
            )}

            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="flex md:flex-row flex-col items-start md:items-center w-full pl-2 mb-2"
              >
                <span className="w-2/4 md:text-xl text-lg">
                  {FirstCapital(playlist.name)}
                </span>
                {playlist.videos.some(
                  (videos) => videos._id == id
                ) ? (
                  <div className="flex items-center cursor-default w-2/4 mb-2 md:mx-4 mt-2 sm:mt-0 rounded">
                    <span className="text-sm flex items-center text-slate-500 italic mr-3">
                      <IoCheckmarkCircleSharp className="md:text-xl text-lg shadow-inner shadow-green-700 rounded-full text-green-400 text-opacity-55 mr-1" />
                      Added!
                    </span>
                    <span
                      onClick={() =>
                        handleRemoveFromPlaylist(
                          playlist._id,
                          id
                        )
                      }
                      className="md:text-base text-sm flex items-center text-slate-100"
                    >
                      <IoMdRemoveCircle className="hover:text-red-600 md:text-2xl text-sm text-red-500 mr-2 cursor-pointer" />{" "}
                      Remove
                    </span>
                  </div>
                ) : (
                  <button className="cursor-default flex items-center md:w-2/4 w-full mb-2 md:mx-4 mt-2 sm:mt-0 rounded">
                    <span
                      onClick={() =>
                        handleAddToPlaylist(playlist._id, id)
                      }
                      className="text-base flex items-center text-slate-100"
                    >
                      <IoAddCircleSharp className="hover:text-cyan-600 text-2xl mr-2 text-cyan-500 cursor-pointer" />{" "}
                      Add to playlist
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
