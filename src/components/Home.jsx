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
  const [currentUser, setCurrentUser] = useState("");
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
      console.error("Error:", error.response.data);
      console.warn("error at home.jsx");
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
        className={`md:w-2/12 sm:w-1/12 w-2/12 px-1 md:px-0 text-white md:block flex items-center md:justify-normal justify-center lg:pl-5 mt-3 lg:ml-2 md:ml-1 overflow-hidden`}>
          <Sidebar auth={auth}/>
        </div>

        <div className="md:w-11/12 sm:w-11/12 w-10/12 mt-1">
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
