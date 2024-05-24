import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  RiSearchLine,
  RiNotification2Line,
  RiVideoUploadFill,
  RiDashboardLine,
  RiBugLine,
  RiLogoutBoxRLine,
  RiMenu3Line,
  RiCloseLine,
} from "react-icons/ri";
import TestingInfoBar from "./testing";

function Navbar({
  uploadbutton = true,
  bg = "bg-cur",
  nospacebar = true,
  showuser = true,
  onlyshowlogout = false
}) {
  const [name, setName] = useState("");
  const [username, setUserame] = useState("");
  const [profile, setProfile] = useState("");
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleHamburgerMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
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

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/v1/user/logout");
      if (response.data.success) {
        window.location.reload();
        // Handle success, navigate, or show a success toast message
      } else {
        // Handle error, show an error toast message, or redirect
      }
    } catch (error) {
      toast.error("Error logging out");
      console.error("Error logging out:", error);
      // Handle error, show an error toast message, or redirect
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/user/current-user");
        console.log("Response:", response.data);

        setUserame(response.data.data.username);
        setName(response.data.data.fullname.toUpperCase());
        setProfile(response.data.data.avatar);
      } catch (error) {
        console.error("Error:", error.response.data);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (isHamburgerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isHamburgerOpen]);

  // useEffect(() => {
  //   const loadingTimer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 120000); // 2 minutes in milliseconds

  //   return () => clearTimeout(loadingTimer);
  // }, []);

  return (
    <>
     <TestingInfoBar message="This isn't the complete version. It is still in testing mode." />
      <nav
        className={` ${
          bg ? bg : "bg-cur"
        } font-serif border-b-[0.1px] border-cyan-200 border-opacity-5 w-screen z-10`}
      >
        <div className={`flex items-center relative sm:w-full w-full md:h-20 sm:h-16 h-12 justify-between `}>
          {/* <!-- Logo --> */}

          <div className="flex justify-center items-center h-full w-2/12">
            <Link to="/" className="cursor-pointer">
              <img
                src={logo}
                alt="logo"
                className="lg:h-16 md:h-12 sm:h-10 h-10 "
              />
            </Link>
          </div>

          {/* <!-- Search Bar --> */}
          <div className="lg:w-6/12 md:5/12 w-5/12 h-3/6 flex justify-center">
            {nospacebar && (
              <input
                type="text"
                placeholder="Search"
                className="w-3/4 py-2 h-full text-xs px-4 rounded-tl-full rounded-bl-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
              />
            )}
            {nospacebar && (
              <RiSearchLine className="text-gray-400 flex bg-gray-800 h-full w-10 rounded-tr-full border-l-[0.1px] border-gray-700 cursor-pointer sm:p-2 p-1 rounded-br-full " />
            )}{" "}
          </div>

          {uploadbutton && (
            <div className="w-1/12 sm:h-auto h-4/6 flex">
              <Link to="/videoupload">
                <button className=" w-full h-full bg-gradient-to-br hover:from-cyan-300 hover:to-cyan-500 from-cyan-500 via-cyan-400 to-cyan-300 duration-500 hover:scale-105 text-white px-3 py-2 flex items-center sm:rounded-lg rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50">
                  <span className="sm:flex hidden lg:text-lg md:text-base sm:text-sm text-[8px] ">
                    Upload&nbsp;
                  </span>
                  <RiVideoUploadFill className="lg:text-xl sm:text-lg text-[10px] sm:ml-1" />
                </button>
              </Link>
            </div>
          )}

          {/* user */}
          <div className="flex justify-end w-3/12 p-1 pr-7">
            {/* Notification Icon */}
            {showuser && (
              <div className="sm:relative hidden mr-2 cursor-pointer">
                <RiNotification2Line className="text-cyan-500 xl:h-10 xl:w-10 lg:h-8 lg:w-8 h-6 w-6 " />
                {/* Notification Badge */}
                <div className="absolute top-0 right-0 lg:h-3 lg:w-3 h-2 w-2 bg-cyan-400 text-xs font-bold rounded-full flex items-center justify-center">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-cyan-100 opacity-75"></span>
                </div>
              </div>
            )}
            {showuser && (
              <div
                className="md:flex hidden md:flex-col items-end md:mx-2 cursor-pointer text-white"
                onClick={toggleMenu}
              >
                <div className="sm:text-sm lg:text-md xl:text-lg 2xl:text-xl text-xs tracking-[1px] font-semibold ">
                  {name}
                </div>
                <div className="sm:text-sm lg:text-md xl:text-lg 2xl:text-xl text-xs text-cyan-500 tracking-[1px] font-regular">
                  {username}
                </div>
              </div>
            )}

            {showuser && (
              <>
              {/* pc menu */}
                <div
                  className="lg:h-12 lg:w-12 hidden sm:flex md:h-10 md:w-10 sm:h-8 sm:w-8 h-6 w-6  cursor-pointer "
                  onClick={toggleMenu}
                >
                  <img
                    src={profile}
                    alt={name}
                    className="w-full h-full object-cover rounded-full border-2 border-cyan-400"
                  />
                </div>

                {/* mobile hamburger Menu */}
                <div
                  className="lg:h-12 lg:w-12 md:h-10 sm:hidden md:w-10 sm:h-8 sm:w-8 h-8 w-8 cursor-pointer"
                  onClick={toggleHamburgerMenu}
                >
                  {isHamburgerOpen ? (
                    null
                  ) : (
                    <img
                      src={profile}
                      alt={name}
                      className="w-full h-full object-cover rounded-full border-2 border-cyan-400"
                    />
                  )}
                </div>
              </>
            )}
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <>
              {/* triangle */}
              {/* <div className="absolute right-10 top-16 z-0 w-0 h-0 border-l-[26px] border-l-transparent border-b-[40px] border-b-white border-r-[10px]  border-r-transparent"></div> */}

              <div
                ref={dropdownRef}
                className="absolute hidden sm:flex right-10 top-20 max-w-48 z-50 bg-white rounded-2xl shadow-md"
              >
                <div className="z-10 ">
                  {/* Menu Items */}
                 {!onlyshowlogout && <Link to={`/dashboard/${username}`}>
                    <div className="block px-4 py-2 text-sm text-cyan-600 active:bg-cyan-100 rounded-t-2xl hover:text-cyan-800 cursor-pointer">
                      Dashboard
                    </div>
                  </Link>}
                  {!onlyshowlogout && <Link to="/report">
                    <div className="block px-4 py-2 text-sm text-cyan-600 text active:bg-cyan-100 hover:text-cyan-800 cursor-pointer">
                      Report Bug
                    </div>
                  </Link>}
                 <div
                    className="block px-4 py-2 text-sm text-cyan-600 text active:bg-cyan-100 rounded-b-2xl hover:text-cyan-800 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <button disabled={isLoading}>
                      {isLoading ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {isHamburgerOpen && (
            <div className="fixed overflow-auto top-20 right-2 w-3/5 bg-gray-800 text-white z-50 sm:hidden">
              <div className="flex flex-col items-center p-4 px-2 relative">
              <RiCloseLine onClick={toggleHamburgerMenu} className=" absolute top-2 right-2 h-6 w-6 hover:animate-spin-once text-red-800 rounded-full" />
                  <div className="flex flex-col justify-around w-full items-center">
                    {/* <div className="relative mb-4">
                      <RiNotification2Line className="text-cyan-500 h-6 w-6" />
                      <div className="absolute top-0 right-0 h-3 w-3 bg-cyan-400 text-xs font-bold rounded-full flex items-center justify-center">
                        <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-cyan-100 opacity-75"></span>
                      </div>
                    </div> */}
                    <div
                      className="h-12 w-12 mb-4 cursor-pointer">
                      <img
                        src={profile}
                        alt={name}
                        className="h-full w-full object-cover rounded-full border-2 border-cyan-400"
                      />
                    </div>
                    <div className="text-center mb-2">
                      <div className="text-xs tracking-[1px] font-semibold">
                        {name}
                      </div>
                      <div className="text-xs text-cyan-500 tracking-[1px] font-regular">
                        {username}
                      </div>
                    </div>
                  </div>
                <div className="w-full border-t hover:bg-slate-500 hover:opacity-10 border-cyan-400 mt-2"></div>
                {!onlyshowlogout && <Link
                  to={`/dashboard/${username}`}
                  className="w-full text-center py-2 text-cyan-200 hover:text-cyan-800 cursor-pointer flex items-center justify-center"
                >
                  <RiDashboardLine className="mr-2 text-cyan-600" /> Dashboard
                </Link>}
                {!onlyshowlogout && <Link
                  to="/report"
                  className="w-full text-center hover:bg-slate-500 hover:opacity-10 py-2 text-cyan-200 hover:text-cyan-800 cursor-pointer flex items-center justify-center"
                >
                  <RiBugLine className="mr-2 text-cyan-600" /> Report Bug
                </Link>}
                <div
                  className="w-full text-center hover:bg-slate-500 hover:opacity-10 pt-2 text-cyan-200 hover:text-cyan-800 cursor-pointer flex items-center justify-center"
                  onClick={handleLogout}
                >
                  <button
                    disabled={isLoading}
                    className="flex items-center justify-center"
                  >
                    <RiLogoutBoxRLine className="mr-2 text-cyan-600" />
                    {isLoading ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
