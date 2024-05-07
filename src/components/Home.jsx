import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Navtest from "./Navtest";
import axios from "axios";
import DisplayAll from "./video/DisplayAll";

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/v1/user/current-user");
      console.log("Response:", response.data);
      setAuth(true);
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

  const handleUpload = () => {
    // Add code to handle video upload
    // You can use libraries like react-dropzone or implement your own upload functionality
    console.log("Upload button clicked");
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

  return(
  <div>
  {auth ? <Navbar /> : <Navtest />}
  <Link to="/videoupload" >
  <div className="fixed bottom-8 right-8">
        <button
          className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50"
          onClick={handleUpload}
        >
          Upload Video
        </button>
    </div>
    </Link>

    <DisplayAll />
  </div>
  )
  
}
