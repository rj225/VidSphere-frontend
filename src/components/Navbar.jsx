import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  RiSearchLine, 
  RiVideoUploadFill, 
  RiDashboardLine, 
  RiBugLine, 
  RiLogoutBoxRLine, 
  RiCloseLine, 
  RiAccountCircleFill 
} from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  uploadbutton = true,
  bg = "",
  nosearchbar = true,
  onlyshowlogout = false,
  showSignInButton = true,
}) => {
  const [userData, setUserData] = useState({ name: "", username: "", profile: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleHamburgerMenu = useCallback(() => {
    setIsHamburgerOpen((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/v1/user/logout");
      if (response.data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/user/current-user");
        setAuth(true);
        setUserData({
          name: response.data.data.fullname.toUpperCase(),
          username: response.data.data.username,
          profile: response.data.data.avatar,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isHamburgerOpen ? "hidden" : "auto";
  }, [isHamburgerOpen]);

  const renderSearchBar = useMemo(() => (
    nosearchbar && (
      <>
        <input
          type="text"
          placeholder="Search"
          className="w-3/4 py-2 h-full md:text-base text-xs px-4 rounded-tl-full rounded-bl-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
        />
        <RiSearchLine className="text-gray-400 flex bg-gray-800 h-full w-10 rounded-tr-full border-l-[0.1px] border-gray-700 cursor-pointer sm:p-2 p-1 rounded-br-full " />
      </>
    )
  ), [nosearchbar]);

  const renderUserSection = useMemo(() => (
    auth ? (
      <div className="flex flex-col items-end md:mx-2 cursor-pointer text-white">
        <div className="sm:text-sm lg:text-md xl:text-lg 2xl:text-xl text-xs tracking-[1px] font-semibold">
          {userData.name}
        </div>
        <div className="sm:text-sm lg:text-md xl:text-lg 2xl:text-xl text-xs text-cyan-400 tracking-[1px] font-regular">
          {userData.username}
        </div>
      </div>
    ) : (
      showSignInButton ? (
        <Link to="/register">
          <div className="justify-center flex hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center bg-gray-100 shadow-2xl shadow-red-800 bg-opacity-90 px-2 py-1 rounded-2xl text-cyan-700 ring-[1px] ring-cyan-700 transition duration-300 hover:ring-1 hover:ring-cyan-300 hover:shadow-3xl">
              <h3 className="md:text-3xl text-xl">
                <RiAccountCircleFill />
              </h3>
              <span className="md:block md:text-base hidden mx-2">
                Sign Up
              </span>
            </div>
          </div>
        </Link>
      ) : (
        <div className="justify-center flex cursor-pointer">
          <div className="flex items-center md:scale-100 sm:scale-90 scale-75 bg-gray-100 bg-opacity-90 justify-center px-2 py-1 rounded-2xl ring-[1px] ring-cyan-700 text-cyan-700 transition duration-300 hover:ring-1 hover:ring-cyan-300 hover:shadow-3xl">
            <h3 className="md:text-3xl sm:text-2xl text-lg ">
              <BiSupport />
            </h3>
            <span className="sm:text-base font-semibold text-xs mx-2 cursor-pointer">
              Need Help?
            </span>
          </div>
        </div>
      )
    )
  ), [auth, showSignInButton, userData.name, userData.username]);

  return (
    <nav className={`${bg} font-serif border-b-[0.1px] border-cyan-200 border-opacity-5 w-screen z-10`}>
      <div className="flex items-center relative sm:w-full w-full md:h-20 sm:h-16 h-12 justify-between">
        <div className="flex justify-center items-center h-full w-2/12">
          <Link to="/" className="cursor-pointer">
            <img src={logo} alt="logo" className="lg:h-20 md:h-12 h-10" />
          </Link>
        </div>

        <div className="lg:w-6/12 md:5/12 w-5/12 h-3/6 flex justify-center">
          {renderSearchBar}
        </div>

        {uploadbutton && (
          <div className="w-1/12 sm:h-auto h-4/6 flex">
            <Link to="/videoupload">
              <button className="w-full h-full bg-gradient-to-br scale-75 xl:scale-90 2xl:scale-100 hover:from-cyan-300 hover:to-cyan-500 from-cyan-500 via-cyan-400 to-cyan-300 duration-500 hover:scale-105 text-white px-3 py-2 flex items-center sm:rounded-lg rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50">
                <span className="sm:flex hidden lg:text-lg md:text-base sm:text-sm text-[8px]">
                  Upload&nbsp;
                </span>
                <RiVideoUploadFill className="lg:text-xl sm:text-lg text-base sm:ml-1" />
              </button>
            </Link>
          </div>
        )}

        <div className="flex justify-end w-3/12 p-1 pr-7">
          {renderUserSection}

          {auth && (
            <>
              <div
                className="lg:h-12 lg:w-12 hidden sm:flex md:h-10 md:w-10 sm:h-8 sm:w-8 h-6 w-6 cursor-pointer"
                onClick={toggleMenu}
              >
                <img
                  src={userData.profile}
                  alt={userData.name}
                  className="w-full h-full object-cover rounded-full border-2 border-cyan-400"
                />
              </div>

              <div
                className="lg:h-12 lg:w-12 md:h-10 sm:hidden md:w-10 sm:h-8 sm:w-8 h-8 w-8 cursor-pointer"
                onClick={toggleHamburgerMenu}
              >
                {isHamburgerOpen ? null : (
                  <img
                    src={userData.profile}
                    alt={userData.name}
                    className="w-full h-full object-cover rounded-full border-2 border-cyan-400"
                  />
                )}
              </div>
            </>
          )}
        </div>

        {isOpen && (
          <div ref={dropdownRef} className="absolute hidden sm:flex right-10 top-20 max-w-48 z-50 bg-white rounded-2xl shadow-md">
            <div className="flex flex-col w-full p-5 gap-5 justify-between">
              <div className="cursor-pointer font-semibold hover:bg-gray-200 p-1.5 rounded flex items-center gap-2">
                <RiDashboardLine className="lg:text-xl sm:text-md text-base" />
                <Link to="/dashboard" className="text-md">Dashboard</Link>
              </div>
              <div className="cursor-pointer font-semibold hover:bg-gray-200 p-1.5 rounded flex items-center gap-2">
                <RiBugLine className="lg:text-xl sm:text-md text-base" />
                <Link to="/bug-report" className="text-md">Report a Bug</Link>
              </div>
              <div className="cursor-pointer font-semibold hover:bg-gray-200 p-1.5 rounded flex items-center gap-2" onClick={handleLogout}>
                {isLoading ? (
                  <div>Logging Out...</div>
                ) : (
                  <>
                    <RiLogoutBoxRLine className="lg:text-xl sm:text-md text-base" />
                    <span>Logout</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {isHamburgerOpen && (
        <div className="absolute right-0 h-full w-full sm:w-80 bg-white bg-opacity-95 backdrop-blur-sm">
          <div className="flex items-center px-10 py-7 justify-end">
            <RiCloseLine
              className="h-8 w-8 cursor-pointer text-black hover:text-gray-800 transition duration-500"
              onClick={toggleHamburgerMenu}
            />
          </div>
          <div className="flex items-center flex-col gap-10">
            <div className="cursor-pointer font-semibold hover:bg-gray-200 p-1.5 rounded flex items-center gap-2">
              <RiDashboardLine className="lg:text-xl sm:text-md text-base" />
              <Link to="/dashboard" className="text-md">Dashboard</Link>
            </div>
            <div className="cursor-pointer font-semibold hover:bg-gray-200 p-1.5 rounded flex items-center gap-2">
              <RiBugLine className="lg:text-xl sm:text-md text-base" />
              <Link to="/bug-report" className="text-md">Report a Bug</Link>
            </div>
            <div className="cursor-pointer font-semibold hover:bg-gray-200 p-1.5 rounded flex items-center gap-2" onClick={handleLogout}>
              {isLoading ? (
                <div>Logging Out...</div>
              ) : (
                <>
                  <RiLogoutBoxRLine className="lg:text-xl sm:text-md text-base" />
                  <span>Logout</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
