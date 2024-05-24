import React, { useState, useEffect } from "react";
import { Link ,useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Navtest from "./Navtest";
import axios from "axios";
import DisplayAll from "./video/DisplayAll";
import PreviousLocation from "./utils/PreviousLocation";

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser , setCurrentUser] = useState("");
  const location = useLocation();

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
      setCurrentUser(response.data.data)
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error.response.data);
      console.warn("error at home.jsx");
    }finally {
      setIsLoading(false); // Set isLoading to false in the finally block
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-cur min-h-screen">
        <div className="w-64 h-64 border-t-8 border-b-8 border-t-red-500 border-r-[0.5px] border-r-yellow-400 border-l-[0.5px] border-l-green-400 border-b-blue-500 rounded-full animate-spin"></div>
        &nbsp;&nbsp;&nbsp;
        <h3 className="text-2xl animate-pulse text-cyan-800">Loading...</h3>
      </div>
    );
  }

  return(
  <div>
  {auth ? <Navbar uploadbutton={true} nospacebar={true} showuser={true}/> : <Navtest />}

    <div className="w-screen mt-1">
      <DisplayAll 
        width={`sm:w-4/12 w-full `} 
        direction={`flex flex-col sm:flex-row sm:flex-wrap`} 
        height={`sm:h-60 h-40`} 
        content={`flex flex-col`} 
        channelOwnerShow={false}
        auth={auth}
        currentUser={currentUser} />
    </div>
    
  </div>
  )
  
}
