import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { RiSearchLine } from "react-icons/ri";
import { RiNotification2Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

function Navbar() {
  const [name, setName] = useState("");
  const [username, setUserame] = useState("");
  const [profile, setProfile] = useState("");
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/v1/user/logout");
      if (response.data.success) {
        toast.success("Logout successful");
        window.location.reload();
        // Handle success, navigate, or show a success toast message
      } else {
        toast.error("Logout failed");
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
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 120000); // 2 minutes in milliseconds

    return () => clearTimeout(loadingTimer);
  }, []);


  return (
    <>
      <nav
        ref={dropdownRef}
        className="bg-cur font-serif border-b-[0.1px] border-cyan-200 border-opacity-5 max-w-screen z-10"
      >
        <div className="flex items-center md:w-screen md:pr-3 md:h-24 justify-center">
          {/* <!-- Logo --> */}
          
          <div className="md:flex md:justify-center md:items-center h-full md:w-2/12">
          <Link to="/" className="cursor-pointer">
            <img src={logo} alt="logo" className="md:h-20" />
          </Link>
          </div>

          {/* <!-- Search Bar --> */}
          <div className="md:w-6/12 md:flex justify-center">
            <input
              type="text"
              placeholder="Search"
              className="w-3/4 py-2 px-4 rounded-tl-full hidden md:block rounded-bl-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            />
            <RiSearchLine className="text-gray-400  bg-gray-800 h-full w-11 md:rounded-tr-full border-l-[0.1px] border-gray-700 cursor-pointer p-2 md:rounded-br-full " />
          </div>

        <div className="md:w-1/12">
          <Link to="/videoupload" >
        <button
          className="bg-cyan-600 text-white px-2 py-3 rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50"
        
        >
          Upload Video
        </button>
        </Link>
    </div>         

          
          
            <div className="md:flex md:justify-end md:w-3/12 sm:p-1 sm:pr-7">

                {/* Notification Icon */}
                <div className="relative mr-2 cursor-pointer">
                  <RiNotification2Line className="text-cyan-500 h-8 w-8" />
                  {/* Notification Badge */}
                  <div className="absolute top-0 right-0 h-3 w-3 bg-cyan-400 text-xs font-bold rounded-full flex items-center justify-center">
                    <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-cyan-100 opacity-75"></span>
                  </div>
                </div>
                <div className="md:flex md:flex-col items-end md:mx-2 cursor-pointer text-white" onClick={toggleMenu}>
                  <div className="text-md tracking-[1px] font-semibold ">
                    {name}
                  </div>
                  <div className="text-md text-cyan-500 tracking-[1px] font-regular">
                    {username}
                  </div>
                </div>

                <div className="h-12 w-12 cursor-pointer " onClick={toggleMenu}>
                  <img
                    src={profile}
                    alt={name}
                    className="w-full h-full object-cover rounded-full border-2 border-cyan-400"
                  />
                </div>
              </div>

              {/* Dropdown Menu */}
              {isOpen && (
                <>
                {/* triangle */}
                  <div class="absolute right-12 top-16 z-0 w-0 h-0 border-l-[26px] border-l-transparent border-b-[20px] border-b-white border-r-[10px]  border-r-transparent"></div>

                  <div className="absolute right-10 top-20 max-w-48 bg-white rounded-2xl shadow-md z-10">
                    <div className="z-10 ">
                      {/* Menu Items */}
                      <Link to={`/dashboard/${username}`}>
                        <div className="block px-4 py-2 text-sm text-cyan-600 active:bg-cyan-100 rounded-t-2xl hover:text-cyan-800 cursor-pointer">
                          Dashboard
                        </div>
                      </Link>
                      <Link to="/report">
                        <div className="block px-4 py-2 text-sm text-cyan-600 text active:bg-cyan-100 hover:text-cyan-800 cursor-pointer">
                          Report Bug
                        </div>
                      </Link>
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
            

        </div>
        <ToastContainer />
      </nav>
    </>
  );
}

export default Navbar;
