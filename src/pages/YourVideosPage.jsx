import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import MyVideos from "../components/profile/MyVideos";
import Loader from "../components/utils/Loader";


export default function YourVideosPage() {
  const [auth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loader,setLoader] = useState(true)

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/v1/user/current-user");
      console.log("Response:", response.data);
      setAuth(true);
      setCurrentUser(response.data.data._id);
     
    } catch (error) {
      console.error("Error:", error.response.data);
      console.warn("error at home.jsx");
    }
    finally{
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loader) {
    return(<Loader/>)
  }

  return (
    <div className="">
      <Navbar uploadbutton={auth} nosearchbar={true} />
      <div className="w-screen flex items-start">
        <div
        className={`md:w-2/12 sm:w-1/12 w-2/12 px-1 md:px-0 text-white md:block flex items-center md:justify-normal justify-center lg:pl-5 mt-3 lg:ml-2 md:ml-1 overflow-hidden`}>
          <Sidebar auth={auth}/>
        </div>

        <div className="md:full border-l-[1px] border-gray-800 sm:w-11/12 w-10/12 mt-1">
         <MyVideos auth={auth} id={currentUser}/>
        </div>
      </div>
    </div>
  )
}
