import React from 'react'
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Sidebar from '../components/Sidebar';
// import Playlist from '../components/profile/Playlist'
import Playlist from '../components/profile/Playlist';
import Loader from '../components/utils/Loader';
import Footer from '../components/Footer';
import BackToTopButton from '../components/utils/BackToTop';

export default function PlaylistPage() {

  const [auth, setAuth] = useState(false);
  const [currentUserid, setCurrentUserid] = useState("");
  const [loader,setLoader] = useState(true)

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/v1/user/current-user");
      setAuth(true);
      setCurrentUserid(response.data.data._id);
    } catch (error) {
      console.error("Error:", error.response.data);
      console.warn("error Fetching Current User");
    }
    finally{
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loader) {
    return (
      <Loader/>
    );
  }


  return (
    <div className="w-screen h-screen">
      <Navbar uploadbutton={auth} nosearchbar={true} />
      <div className="flex min-h-[90vh] items-start">
        <div
          className={`md:w-2/12 sm:w-1/12 w-2/12 px-1 sticky top-0 md:px-0 text-white md:block flex items-center md:justify-normal justify-center lg:pl-5 mt-3 lg:ml-2 md:ml-1 overflow-hidden`}
        >
          <Sidebar auth={auth} />
        </div>

        <div className="md:min-h-full border-l-[1px] border-gray-800 sm:w-11/12 w-10/12 mt-1">
        <Playlist userId={currentUserid}/>
        </div>
      </div>
      <Footer/>
      <BackToTopButton/>
    </div>
  );
}



