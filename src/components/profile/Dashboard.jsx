import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MdReport } from "react-icons/md";
import { BiSolidBellRing } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import PreviousLocation from "../utils/PreviousLocation";
import ProfileModal from "./ProfileModal";
import UnauthorizedPage from "../UnauthorizedPage";
import { FaUserEdit, FaLock, FaImage, FaBug } from "react-icons/fa";
import Display from "../video/Display";
import { FaRegBell } from "react-icons/fa6";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import WatchHistory from "./WatchHistory";
import Count from "../utils/Count";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Navbar from "../Navbar";
import { RiVideoUploadFill } from "react-icons/ri";
import Navtest from "../Navtest";

function Dashboard() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [currentUserid, setCurrentUserid] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [profile, setProfile] = useState("");
  const [cover, setCover] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modify, setModify] = useState(false);
  const { user } = useParams();
  const location = useLocation();
  const [subscribed, setSubscribed] = useState(false);
  const [subscriber, setSubscribers] = useState("");

  const prevlocation = PreviousLocation.retrieve();
  if (prevlocation) {
    PreviousLocation.clear();
    PreviousLocation.store(location.pathname);
  } else {
    PreviousLocation.store(location.pathname);
  }
  const handleSubscribe = async () => {
    if (currentUserid) {
      try {
        // Toggle subscription status
        const response = await axios.post(`/api/v1/subscribe/c/${id}`);
        // Update state and UI based on the subscription status
        setSubscribed(!subscribed);
        // setTimeout(() => {setSubscribeClicked(true)},4000);
      } catch (error) {
        console.error("Error toggling subscription:", error);
        // Handle error if necessary
      }
    } else {
      navigate("/login");
    }
  };

  const fetchSubscribers = async (ownerId) => {
    console.log("subscribers called");
    console.log("current user id ", currentUserid);
    if (ownerId && currentUserid) {
      console.log("fetch cuurent user in subscriber called", currentUserid);
      try {
        const response = await axios.get(`/api/v1/subscribe/c/${ownerId}`);
        setSubscribers(response.data.data.subscriberCount);
        console.log("subscribers", response.data.data);
        console.log("current user id ", currentUserid);
        if (Array.isArray(response.data.data.subscribers)) {
          const isSubscribed = response.data.data.subscribers.some(
            (subscription) => subscription.subscriber._id === currentUserid
          );
          setSubscribed(isSubscribed);
        }
        console.log("subscribed? ", subscribed);
      } catch (error) {
        console.error(`Error fetching owner with ID ${ownerId}:`, error);
        return null;
      }
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/v1/user/current-user");
        console.log("Response current user", response.data);
        setCurrentUserid(response.data.data._id);
        if (response.data.data._id === id) {
          setModify(true);
        }
      } catch (error) {
        console.error("Error:", error.response.data);
      }
    };

    fetchCurrentUser();
  }, [id]);

  useEffect(() => {
    fetchSubscribers(id);
  }, [id, subscribed]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function timeAgo(timestamp) {
    const now = new Date();
    const pastDate = new Date(timestamp);
    const timeDifference = now - pastDate;

    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 1) {
      return `${days} days ago`;
    } else if (days === 1) {
      return "one day ago";
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/v1/user/c/${user}`);
      console.log("Response channel:", response.data);
      setId(response.data.data._id);
      setUserame(response.data.data.username);
      setName(response.data.data.fullname.toUpperCase());
      setCover(response.data.data.coverImage);
      setProfile(response.data.data.avatar);
      setEmail(response.data.data.email);
      setIsLoading(false);

      // Usage
      const formattedCreatedAt = timeAgo(response.data.data.createdAt);
      const formattedUpdatedAt = timeAgo(response.data.data.updatedAt);

      setCreatedAt(formattedCreatedAt);
      setUpdatedAt(formattedUpdatedAt);
    } catch (error) {
      console.error("Error:", error.response.data);
      // Handle errors here
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className=" w-screen h-screen flex justify-center items-center">
            <div className="w-32 h-32 border-t-8 border-b-8 border-t-cyan-500 border-r-[0.5px] border-r-red-400 border-l-[0.5px] border-l-red-400 border-b-cyan-500 rounded-full animate-spin"></div>
            &nbsp;&nbsp;&nbsp;{" "}
            <h3 className="text-2xl animate-pulse text-cyan-100">Loading...</h3>
          </div>
        </>
      ) : (
        <>
          {email ? (
            <>
            {currentUserid ? <Navbar showuser={true} uploadbutton={false} onlyshowlogout={true} nospacebar={false} /> : <Navtest/>}
              <div className="h-full w-screen bg-cur font-serif p-8">
                <div className="bg-slate-100 w-full rounded-lg shadow-xl pb-8 ">
                  <div className="w-full sm:h-72 h-48">
                    <img
                      src={cover}
                      className="w-full h-full rounded-tl-lg rounded-tr-lg"
                    />
                  </div>
                  <div className="flex flex-col items-center -mt-20">
                    <img
                      src={profile}
                      className="w-32 h-32 border-4 object-cover cursor-pointer border-cyan-200 shadow-3xl rounded-full"
                      onClick={openModal}
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      <p className="sm:text-2xl text-lg font-bold">{name}</p>
                    </div>
                    <p className={`text-gray-500 ${subscriber ? "sm:text-lg text-sm" : "text-sm"} font-sans font-bold`}>
                      {currentUserid ? `${Count(subscriber)} Subscribers 🎉` : "Login to see Subscribers 🎉"} 
                    </p>
                    <p className="sm:text-sm text-xs text-cyan-700 flex items-center">
                      <RiVerifiedBadgeFill />
                      verified
                    </p>
                  </div>
                  <div className="flex items-center lg:items-end sm:justify-end justify-center px-8 mt-2">
                    <div
                      className="flex sm:flex-row sm:flex-wrap flex-col items-center space-x-4 mt-2 relative"
                      ref={dropdownRef}
                    >
                      <div
                        onClick={handleSubscribe}
                        className={`flex items-center cursor-pointer ${
                          subscribed
                            ? "hover:bg-cyan-400 bg-cyan-200 text-cyan-950 "
                            : "hover:bg-red-600 hover:bg-opacity-75 bg-red-400 text-white "
                        } hover:scale-105 duration-500 space-x-1 shadow-lg sm:text-lg text-xs sm:my-0 my-1 py-1 px-3 rounded-xl`}
                      >
                        <button
                          className={`flex items-center space-x-1 bg-transparent focus:outline-none ${
                            subscribed ? "text-cyan-900 " : "text-white"
                          }`}
                        >
                          {subscribed ? (
                            <BiSolidBellRing className="sm:text-2xl text-sm" />
                          ) : (
                            <FaRegBell className="sm:text-2xl text-sm" />
                          )}
                          <span className="transition duration-500 transform">
                            &nbsp; {subscribed ? "Subscribed" : "Subscribe"}
                          </span>
                        </button>
                      </div>

                      {/* <Link to="/update"> */}
                      {modify && (
                        <button
                          onClick={toggleMenu}
                          className="flex items-center shadow-lg bg-cyan-100 hover:bg-cyan-300 text-gray-800 sm:px-4 px-2 sm:py-2 py-1 my-1 sm:my-0 rounded-lg sm:text-sm text-xs space-x-2 duration-500 hover:scale-105"
                        >
                          <FaEdit />
                          <span>Edit your profile</span>
                          {isOpen ? <IoIosArrowDropupCircle/> :<IoIosArrowDropdownCircle />}
                        </button>
                      )}
                      {/* </Link> */}

                      <button className="flex items-center shadow-lg bg-cyan-100 hover:bg-cyan-300 text-gray-800 px-4 sm:py-2 py-1 my-1 sm:my-0 rounded-lg sm:text-sm text-xs space-x-2 transition duration-500 hover:scale-105">
                        <FaBug />
                        <span>Report a problem</span>
                      </button>
                      {/* Dropdown Menu */}
                      {isOpen && (
                        <>
                          <div className="absolute right-1/2 top-9 z-0 w-0 h-0 border-l-[18px] border-l-transparent border-b-[20px] border-b-cyan-200 border-r-[8px] border-r-transparent"></div>

                          <div className="absolute right-1/3 top-10 max-w-2xl bg-cyan-200 rounded-lg shadow-md z-10">
                            <div className="z-10 ">
                              {/* Menu Items */}
                              <Link to="/updateimage">
                                <div className="block px-4 py-2 text-sm text-cyan-900 hover:bg-cyan-100 cursor-pointer">
                                  <FaImage className="inline-block mr-2" />
                                  Change Profile / Cover pic
                                </div>
                              </Link>
                              <Link to="/updatename">
                                <div className="block px-4 py-2 text-sm text-cyan-900 rounded-t-sm hover:bg-cyan-100 cursor-pointer">
                                  <FaUserEdit className="inline-block mr-2" />
                                  Change Full Name
                                </div>
                              </Link>
                              <Link to="/updatepassword">
                                <div className="block px-4 py-2 text-sm text-cyan-900 hover:bg-cyan-100 cursor-pointer">
                                  <FaLock className="inline-block mr-2" />
                                  Change Password
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                  <div className="w-full flex flex-col 2xl:w-1/3">
                    {/* My Videos */}

                    <div className="flex flex-col w-full 2xl:w-2/3 mt-4 mb-4">
                      <div className="flex-1 bg-gradient-to-tr from-cyan-400 to-cyan-100 rounded-lg shadow-xl p-8">
                        <div className="flex items-center justify-between"><h4 className="sm:text-3xl text-sm text-gray-800 font-bold">
                          My Videos
                        </h4>
                        {modify && <Link to="/videoupload">
                          <button className="bg-cyan-600 sm:text-lg text-xs text-white px-1 py-1 flex items-center rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50">
                            Upload Video&nbsp;
                            <RiVideoUploadFill className="sm:text-xl text-lg ml-1" />
                          </button>
                        </Link>}</div>
                         {email ? (
                          <Display auth={modify} id={id} modify={modify} />
                        ) : null}
                      </div>
                    </div>

                    {/* Watch Histoy */}
                    {modify && (
                      <div className="flex flex-col w-full 2xl:w-2/3">
                        <div className="flex bg-gradient-to-tl from-cyan-400 to-red-50 rounded-lg shadow-xl sm:p-8">
                          <WatchHistory id={currentUserid} />
                        </div>
                      </div>
                    )}

                    {/* Personal Info */}
                    {modify && (
                      <div className="flex-1 bg-gradient-to-tl from-cyan-400 to-red-50 rounded-lg shadow-xl mt-4 mb-4 p-8">
                        <h4 className="text-xl text-gray-900 font-bold">
                          Personal Info
                        </h4>
                        <ul className="mt-2 text-gray-700">
                          <li className="flex border-cyan-800 border-y py-2">
                            <span className="font-bold text-cyan-600 w-24">
                              Full name:
                            </span>
                            <span className="text-gray-700">{name}</span>
                          </li>
                          <li className="flex border-cyan-800 border-b py-2">
                            <span className="font-bold text-cyan-600 w-24">
                              Username:
                            </span>
                            <span className="text-gray-700">{username}</span>
                          </li>
                          <li className="flex border-cyan-800 border-b py-2">
                            <span className="font-bold text-cyan-600 w-24">
                              Joined:
                            </span>
                            <span className="text-gray-700">{createdAt}</span>
                          </li>
                          <li className="flex border-cyan-800 border-b py-2">
                            <span className="font-bold text-cyan-600 w-24">
                              Updated:
                            </span>
                            <span className="text-gray-700">{updatedAt}</span>
                          </li>
                          <li className="flex border-cyan-800 border-b py-2">
                            <span className="font-bold text-cyan-600 w-24">
                              Email:
                            </span>
                            <span className="text-gray-700">{email}</span>
                          </li>
                          <li className="flex border-cyan-800 border-b py-2">
                            <span className="font-bold text-cyan-600 w-24">
                              Location:
                            </span>
                            <span className="text-gray-700">Bihar, India</span>
                          </li>
                          <li className="flex border-cyan-800 border-b py-2">
                            <span className="font-bold text-cyan-600 w-24">
                              Languages:
                            </span>
                            <span className="text-gray-700">
                              English, Hindi
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* Activity log */}

                    <div className="flex-1 bg-gradient-to-tl from-cyan-400 to-red-50 rounded-lg shadow-xl mt-4 p-8">
                      <h4 className="text-xl text-gray-900 font-bold">
                        Activity log(In testing)
                      </h4>
                      <div className="relative px-4">
                        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

                        {/* <!-- start::Timeline item --> */}
                        <div className="flex items-center w-full my-6 -ml-1.5">
                          <div className="w-1/12 z-10">
                            <div className="w-3.5 h-3.5 bg-cyan-600 rounded-full"></div>
                          </div>
                          <div className="w-11/12">
                            <p className="text-sm">Profile Created</p>
                            <p className="text-xs text-gray-500">{createdAt}</p>
                          </div>
                        </div>
                        {/* <!-- end::Timeline item --> */}

                        {/* <!-- start::Timeline item --> */}
                        <div className="flex items-center w-full my-6 -ml-1.5">
                          <div className="w-1/12 z-10">
                            <div className="w-3.5 h-3.5 bg-cyan-600 rounded-full"></div>
                          </div>
                          <div className="w-11/12">
                            <p className="text-sm">
                              Connected with{" "}
                              <a href="#" className="text-cyan-600 font-bold">
                                Colby Covington
                              </a>
                              .
                            </p>
                            <p className="text-xs text-gray-500">15 min ago</p>
                          </div>
                        </div>
                        {/* <!-- end::Timeline item --> */}

                        {/* <!-- start::Timeline item --> */}
                        <div className="flex items-center w-full my-6 -ml-1.5">
                          <div className="w-1/12 z-10">
                            <div className="w-3.5 h-3.5 bg-cyan-600 rounded-full"></div>
                          </div>
                          <div className="w-11/12">
                            <p className="text-sm">
                              Invoice{" "}
                              <a href="#" className="text-cyan-600 font-bold">
                                #4563
                              </a>{" "}
                              was created.
                            </p>
                            <p className="text-xs text-gray-500">57 min ago</p>
                          </div>
                        </div>
                        {/* <!-- end::Timeline item --> */}

                        {/* <!-- start::Timeline item --> */}
                        <div className="flex items-center w-full my-6 -ml-1.5">
                          <div className="w-1/12 z-10">
                            <div className="w-3.5 h-3.5 bg-cyan-600 rounded-full"></div>
                          </div>
                          <div className="w-11/12">
                            <p className="text-sm">
                              Message received from{" "}
                              <a href="#" className="text-cyan-600 font-bold">
                                Cecilia Hendric
                              </a>
                              .
                            </p>
                            <p className="text-xs text-gray-500">1 hour ago</p>
                          </div>
                        </div>
                        {/* <!-- end::Timeline item --> */}

                        {/* <!-- start::Timeline item --> */}
                        <div className="flex items-center w-full my-6 -ml-1.5">
                          <div className="w-1/12 z-10">
                            <div className="w-3.5 h-3.5 bg-cyan-600 rounded-full"></div>
                          </div>
                          <div className="w-11/12">
                            <p className="text-sm">
                              New order received{" "}
                              <a href="#" className="text-cyan-600 font-bold">
                                #OR9653
                              </a>
                              .
                            </p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                        {/* <!-- end::Timeline item --> */}

                        {/* <!-- start::Timeline item --> */}
                        <div className="flex items-center w-full my-6 -ml-1.5">
                          <div className="w-1/12 z-10">
                            <div className="w-3.5 h-3.5 bg-cyan-600 rounded-full"></div>
                          </div>
                          <div className="w-11/12">
                            <p className="text-sm">
                              Message received from{" "}
                              <a href="#" className="text-cyan-600 font-bold">
                                Jane Stillman
                              </a>
                              .
                            </p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                        {/* <!-- end::Timeline item --> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isModalOpen && (
                <ProfileModal profile={profile} onClose={closeModal} />
              )}
            </>
          ) : (
            <>
              <UnauthorizedPage />
            </>
          )}
        </>
      )}
    </>
  );
}

export default Dashboard;
