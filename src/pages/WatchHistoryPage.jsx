import React from "react";
import  { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import WatchHistory from "../components/profile/WatchHistory";

function WatchHistoryPage() {
  const [auth, setAuth] = useState(false);
  const [currentUserid , setCurrentUserid] = useState(""); 

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/v1/user/current-user");
      console.log("Response:", response.data.data._id);
      console.log(auth);
      setAuth(true);
      setCurrentUserid(response.data.data._id)
    } catch (error) {
      console.error("Error:", error.response.data);
      console.warn("error Fetching Current User");
    } 
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar uploadbutton={auth} nosearchbar={true} />
      <div className="w-screen flex">
        <div
          style={{ height: "83vh" }}
          className={`md:w-2/12 sm:w-1/12 w-2/12 px-1 md:px-0 text-white md:block flex items-center md:justify-normal justify-center lg:pl-5 mt-3 lg:ml-2 md:ml-1 overflow-hidden`}
        >
          <Sidebar auth={auth}/>
        </div>

        <div className="md:full sm:w-11/12 w-10/12 mt-1">
          <div className="flex h-full flex-col w-full">
            <div className="flex h-full justify-center items-center bg-gradient-to-tl from-cyan-400 to-red-50 rounded-lg shadow-xl sm:p-8">
              <WatchHistory id={currentUserid} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchHistoryPage;
