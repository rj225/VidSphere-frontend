import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Navtest from "./Navtest";
import axios from "axios";
import DisplayAll from "./video/DisplayAll";
import PreviousLocation from "./utils/PreviousLocation";
import Sidebar from "./Sidebar";


export default function Home() {
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  const location = useLocation();
  const [scrollbarVisible, setScrollbarVisible] = useState(false);

  const prevlocation = PreviousLocation.retrieve();
  if (prevlocation) {
    PreviousLocation.clear();
    PreviousLocation.store(location.pathname);
  } else {
    PreviousLocation.store(location.pathname);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/v1/user/current-user");
      console.log("Response:", response.data);
      setAuth(true);
      setCurrentUser(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error.response.data);
      console.warn("error at home.jsx");
    } finally {
      setIsLoading(false); // Set isLoading to false in the finally block
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const toggleVisiblity = () => {
    setScrollbarVisible(!scrollbarVisible); 
  };



  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-cur min-h-screen">
        <div className="w-64 h-64 border-t-8 border-b-8 border-t-red-500 border-r-[0.5px] border-r-yellow-400 border-l-[0.5px] border-l-green-400 border-b-blue-500 rounded-full animate-spin"></div>
        &nbsp;&nbsp;&nbsp;
        <h3 className="text-2xl animate-pulse text-cyan-800">Loading...</h3>
      </div>
    );
  }

  return (
    <div>
      <Navbar uploadbutton={auth} nosearchbar={true} />
      <div className="w-screen flex">
        <div 
          onMouseEnter={toggleVisiblity}
          onMouseLeave={toggleVisiblity}
          style={{ height: "83vh" }}
        className={`md:w-2/12 sm:w-1/12 w-2/12 px-1 md:px-0 text-white md:block flex items-center md:justify-normal justify-center lg:pl-5 mt-3 lg:ml-2 md:ml-1 ${
          scrollbarVisible ? `overflow-auto` : `overflow-hidden`
        }`}>
          {/* <div class="grid grid-cols-1 text-lg py-3">
            <div className=" mb-4 space-y-4 ">
              <div className="flex items-center space-x-4">
                <span>
                  <HiHome />
                </span>
                <span>Home</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <FaHistory />
                </span>
                <span>Watch History</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <MdSubscriptions />
                </span>
                <span>Subscriptions</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <BiSolidVideos />
                </span>
                <span>Your Videos</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <RiPlayList2Fill />
                </span>
                <span>Playlist</span>
              </div>
            </div>

            <hr className="border-t border-gray-400 border-1"/>

            <div className=" mt-4 mb-2 space-y-6">
              <div className="flex items-center space-x-4">
                <span>
                  <AiOutlineCompass />
                </span>
                <span>Explore</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <MdTrendingUp />
                </span>
                <span>Trending</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <FaShoppingCart />
                </span>
                <span>Shopping</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <FaMusic />
                </span>
                <span>Music</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <FaFilm />
                </span>
                <span>Films</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <RiGamepadFill />
                </span>
                <span>Gaming</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <FaNewspaper />
                </span>
                <span>News</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <MdSportsSoccer />
                </span>
                <span>Sport</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <BiCategory />
                </span>
                <span>Courses</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <GiClothes />
                </span>
                <span>Fashion & Beauty</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>
                  <FaPodcast />
                </span>
                <span>Podcasts</span>
              </div>
            </div>
          </div> */}

          <Sidebar/>
        </div>

        <div className="md:w-10/12 sm:w-11/12 w-10/12 mt-1">
          <DisplayAll
            width={`sm:w-4/12 w-full `}
            direction={`flex flex-col sm:flex-row sm:flex-wrap`}
            height={`sm:h-56 h-48`}
            content={`flex flex-col`}
            channelOwnerShow={false}
            auth={auth}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}
