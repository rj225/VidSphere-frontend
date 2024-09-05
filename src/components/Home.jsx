import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PreviousLocation from "./utils/PreviousLocation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DisplayAll from "./video/DisplayAll";



export default function Home() {
  const [auth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loader , setLoader] = useState(false);
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
      setCurrentUser(response.data.data);
     
    } catch (error) {
      // console.error("Error:", error.response.data);
      console.warn("error at home.jsx");
    }
    finally{
      setLoader(false);
    }
  };
  useEffect(() => {
   fetchData();
  }, []);


  return (
    <div className="bg-gradient-to-l from-cyan-900 to-45% to-cur">
      <Navbar uploadbutton={auth} nosearchbar={true} />
      <div className="w-screen flex items-start">
        <div
        className={`md:w-2/12 sticky top-0 sm:w-1/12 w-2/12 px-1 md:px-0 text-white md:block flex items-center md:justify-normal justify-center lg:pl-5 mt-3 lg:ml-2 md:ml-1 overflow-hidden`}>
          <Sidebar auth={auth}/>
        </div>

        <div className="md:h-full border-l-[1px] border-gray-800 sm:w-11/12 w-10/12 mt-1">
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
