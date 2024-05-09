import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MdReport } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import ProfileModal from "./ProfileModal";
import UnauthorizedPage from "../UnauthorizedPage";
import { FaUserEdit, FaLock, FaImage, FaBug } from "react-icons/fa";
import Display from "../video/Display";

function Dashboard() {
  const [name, setName] = useState("");
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
  const { user } = useParams();

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
      const response = await axios.get(`/api/v1/user/current-user`);
      console.log("Response:", response.data);

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

  const fetchchannel = async () => {
    try {
      const response = await axios.get(`/api/v1/user/c/${user}`);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response.data);
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
              <div class="h-full bg-cur font-serif p-8 ">
                <div class="bg-slate-100 rounded-lg shadow-xl pb-8 ">
                  <div class="w-full h-72">
                    <img
                      src={cover}
                      class="w-full h-full rounded-tl-lg rounded-tr-lg"
                    />
                  </div>
                  <div class="flex flex-col items-center -mt-20">
                    <img
                      src={profile}
                      class="w-48 h-48 border-4 object-cover cursor-pointer border-cyan-200 shadow-3xl rounded-full"
                      onClick={openModal}
                    />
                    <div class="flex items-center space-x-2 mt-2">
                      <p class="text-2xl font-bold">{name}</p>
                    </div>
                    <p class="text-cyan-700 font-semibold">Fin Influencer</p>
                    <p class="text-sm text-gray-500">Bihar, India</p>
                  </div>
                  <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                    <div class="flex items-center space-x-4 mt-2 relative"
                    ref={dropdownRef}>
                      {/* <Link to="/update"> */}
                      <button
                        onClick={toggleMenu}
                        class="flex items-center bg-cyan-600 hover:bg-cyan-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-500 hover:ring-2 hover:ring-cyan-300 hover:scale-105"
                      >
                        <FaEdit />
                        <span>Edit your profile</span>
                      </button>
                      {/* </Link> */}

                      <button class="flex items-center bg-cyan-600 hover:bg-cyan-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-500 hover:ring-2 hover:ring-cyan-300 hover:scale-105">
                        <FaBug />
                        <span>Report a problem</span>
                      </button>
                      {/* Dropdown Menu */}
                      {isOpen && (
                        <>
                          <div className="absolute left-24 top-9 z-0 w-0 h-0 border-l-[18px] border-l-transparent border-b-[20px] border-b-cyan-200 border-r-[8px] border-r-transparent"></div>

                          <div className="absolute left-5 top-12 max-w-2xl bg-cyan-200 rounded-lg shadow-md z-10">
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

                <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                  <div class="w-full flex flex-col 2xl:w-1/3">


                    {/* My Videos */}

                    <div class="flex flex-col w-full 2xl:w-2/3 mt-4 mb-4">
                      <div class="flex-1 bg-gradient-to-tr from-cyan-400 to-cyan-100 rounded-lg shadow-xl p-8">
                        <h4 class="text-3xl text-gray-800 font-bold">
                          My Videos
                        </h4>
                        {email ? <Display auth={true} /> : null}
                      </div>
                    </div>

                    {/* Personal Info */}
                    <div class="flex-1 bg-gradient-to-tl from-cyan-400 to-red-50 rounded-lg shadow-xl mt-4 mb-4 p-8">
                      <h4 class="text-xl text-gray-900 font-bold">
                        Personal Info
                      </h4>
                      <ul class="mt-2 text-gray-700">
                        <li class="flex border-cyan-800 border-y py-2">
                          <span class="font-bold text-cyan-600 w-24">
                            Full name:
                          </span>
                          <span class="text-gray-700">{name}</span>
                        </li>
                        <li class="flex border-cyan-800 border-b py-2">
                          <span class="font-bold text-cyan-600 w-24">
                            Username:
                          </span>
                          <span class="text-gray-700">{username}</span>
                        </li>
                        <li class="flex border-cyan-800 border-b py-2">
                          <span class="font-bold text-cyan-600 w-24">
                            Joined:
                          </span>
                          <span class="text-gray-700">{createdAt}</span>
                        </li>
                        <li class="flex border-cyan-800 border-b py-2">
                          <span class="font-bold text-cyan-600 w-24">
                            Updated:
                          </span>
                          <span class="text-gray-700">{updatedAt}</span>
                        </li>
                        <li class="flex border-cyan-800 border-b py-2">
                          <span class="font-bold text-cyan-600 w-24">
                            Email:
                          </span>
                          <span class="text-gray-700">{email}</span>
                        </li>
                        <li class="flex border-cyan-800 border-b py-2">
                          <span class="font-bold text-cyan-600 w-24">
                            Location:
                          </span>
                          <span class="text-gray-700">Bihar, India</span>
                        </li>
                        <li class="flex border-cyan-800 border-b py-2">
                          <span class="font-bold text-cyan-600 w-24">
                            Languages:
                          </span>
                          <span class="text-gray-700">English, Hindi</span>
                        </li>
                      </ul>
                    </div>

                    {/* Activity log */}

                    <div class="flex-1 bg-gradient-to-tr from-cyan-400 to-red-50 rounded-lg shadow-xl mt-4 p-8">
                      <h4 class="text-xl text-gray-900 font-bold">
                        Activity log
                      </h4>
                      <div class="relative px-4">
                        <div class="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

                        {/* <!-- start::Timeline item --> */}
                        <div class="flex items-center w-full my-6 -ml-1.5">
                          <div class="w-1/12 z-10">
                            <div class="w-3.5 h-3.5 bg-cyan-600 rounded-full"></div>
                          </div>
                          <div class="w-11/12">
                            <p class="text-sm">Profile Created</p>
                            <p class="text-xs text-gray-500">{createdAt}</p>
                          </div>
                        </div>
                        {/* <!-- end::Timeline item --> */}

                        {/* <!-- start::Timeline item --> */}
                        <div class="flex items-center w-full my-6 -ml-1.5">
                          <div class="w-1/12 z-10">
                            <div class="w-3.5 h-3.5 bg-cyan-600 rounded-full"></div>
                          </div>
                          <div class="w-11/12">
                            <p class="text-sm">
                              Connected with{" "}
                              <a href="#" class="text-cyan-600 font-bold">
                                Colby Covington
                              </a>
                              .
                            </p>
                            <p class="text-xs text-gray-500">15 min ago</p>
                          </div>
                        </div>
                        {/* <!-- end::Timeline item --> */}

                        {/* <!-- start::Timeline item --> */}
                        <div class="flex items-center w-full my-6 -ml-1.5">
                          <div class="w-1/12 z-10">
                            <div class="w-3.5 h-3.5 bg-cyan-600 rounded-full"></div>
                          </div>
                          <div class="w-11/12">
                            <p class="text-sm">
                              Invoice{" "}
                              <a href="#" class="text-cyan-600 font-bold">
                                #4563
                              </a>{" "}
                              was created.
                            </p>
                            <p class="text-xs text-gray-500">57 min ago</p>
                          </div>
                        </div>
                        {/* <!-- end::Timeline item --> */}

                        {/* <!-- start::Timeline item --> */}
                        <div class="flex items-center w-full my-6 -ml-1.5">
                          <div class="w-1/12 z-10">
                            <div class="w-3.5 h-3.5 bg-cyan-600 rounded-full"></div>
                          </div>
                          <div class="w-11/12">
                            <p class="text-sm">
                              Message received from{" "}
                              <a href="#" class="text-cyan-600 font-bold">
                                Cecilia Hendric
                              </a>
                              .
                            </p>
                            <p class="text-xs text-gray-500">1 hour ago</p>
                          </div>
                        </div>
                        {/* <!-- end::Timeline item --> */}

                        {/* <!-- start::Timeline item --> */}
                        <div class="flex items-center w-full my-6 -ml-1.5">
                          <div class="w-1/12 z-10">
                            <div class="w-3.5 h-3.5 bg-cyan-600 rounded-full"></div>
                          </div>
                          <div class="w-11/12">
                            <p class="text-sm">
                              New order received{" "}
                              <a href="#" class="text-cyan-600 font-bold">
                                #OR9653
                              </a>
                              .
                            </p>
                            <p class="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                        {/* <!-- end::Timeline item --> */}

                        {/* <!-- start::Timeline item --> */}
                        <div class="flex items-center w-full my-6 -ml-1.5">
                          <div class="w-1/12 z-10">
                            <div class="w-3.5 h-3.5 bg-cyan-600 rounded-full"></div>
                          </div>
                          <div class="w-11/12">
                            <p class="text-sm">
                              Message received from{" "}
                              <a href="#" class="text-cyan-600 font-bold">
                                Jane Stillman
                              </a>
                              .
                            </p>
                            <p class="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                        {/* <!-- end::Timeline item --> */}
                      </div>
                    </div>
                  </div>

                  {/* About */}
                  <div class="flex flex-col w-full 2xl:w-2/3">
                    <div class="flex-1 bg-gradient-to-tl from-cyan-400 to-red-50 rounded-lg shadow-xl p-8">
                      <h4 class="text-xl text-gray-900 font-bold">About</h4>
                      <p class="mt-2 text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nesciunt voluptates obcaecati numquam error et ut fugiat
                        asperiores. Sunt nulla ad incidunt laboriosam,
                        laudantium est unde natus cum numquam, neque facere.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ut, magni odio magnam commodi sunt ipsum eum! Voluptas
                        eveniet aperiam at maxime, iste id dicta autem odio
                        laudantium eligendi commodi distinctio!
                      </p>
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
