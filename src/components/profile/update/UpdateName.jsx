import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import updatename from "./assets/full.png";

function UpdateName() {
  const [fullName, setFullName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [oldFullName, setOldFullName] = useState(fullName);
  const [email, setEmail] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch("/api/v1/user/update-account", {
        fullname: fullName,
        email: email,
      });

      toast.success(`Full Name updated to ${fullName} successfully`, {
        position: "top-right",
        autoClose: 3000,
      });
      setOldFullName(fullName);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating account:", error);
      // Handle errors here
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFullName(oldFullName);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/user/current-user");
        setOldFullName(response.data.data.fullname.toUpperCase());
        setFullName(response.data.data.fullname.toUpperCase());
        setEmail(response.data.data.email);
      } catch (error) {
        console.error("Error:", error.response.data);
        // Handle errors here
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex sm:flex-row bg-cur sm:bg-gradient-to-r sm:from-cyan-900 sm:to-[#0D141A]">
        <div className="w-full hidden sm:w-1/2 sm:min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-serif sm:flex items-center justify-center">
          <img src={updatename} alt="updateInfo" className="rounded-3xl shadow-4xl" />
        </div>
        <div className="w-full sm:w-1/2 min-h-screen text-white py-8 px-4 sm:px-6 lg:px-8 font-serif gap-5 flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-cyan-400 font-bold mb-8">
            Update
            <span className="before:block mx-3 before:absolute before:-inset-1 before:-skew-y-12 before:bg-cyan-500 relative inline-block">
              <span className="relative text-white">Your </span>
            </span>
            Profile
          </h1>
          <form
            className="w-full sm:w-3/4 bg-transparent h-auto max-w-3xl px-4 pb-6 rounded-xl pt-3 shadow-5xl flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <div className="flex my-4">
                <label htmlFor="fullName" className="text-xl font-medium">
                  User Email
                </label>
                <RiVerifiedBadgeFill className="mx-2 text-cyan-300" />
              </div>
              <input
                type="text"
                id="fullName"
                className="mt-1 p-2 w-full text-center text-lg font-semibold bg-opacity-60 cursor-not-allowed bg-cyan-100 text-cyan-900 rounded-md"
                value={email}
                disabled
              />
            </div>
            <div className="mt-6 text-white max-w-5xl justify-center items-center relative">
              <label htmlFor="fullName" className="block text-xl mb-4 font-medium">
                Full Name
              </label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    id="fullName"
                    className="mb-5 p-2 w-full text-center text-lg font-semibold bg-cyan-100 text-cyan-800 rounded-md"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <div className="flex justify-center items-center mt-4">
                    <div className="bg-cyan-100 w-1/3 mx-1 text-black border-2 p-3 flex font-extrabold justify-center cursor-pointer items-center border-cyan-700 rounded-full" onClick={handleSubmit}>
                      <span className="text-md">Save</span>
                      <IoIosSave className="text-black w-4 h-4 ml-1" />
                    </div>
                    <div className="bg-cyan-100 w-1/3 text-black mx-1 border-2 p-3 flex font-extrabold justify-center cursor-pointer items-center border-cyan-700 rounded-full" onClick={handleCancel}>
                      <span className="text-md">Cancel</span>
                      <MdCancel className="text-black w-4 h-4 ml-1" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <RiVerifiedBadgeFill className="absolute top-0 left-24 mx-2 text-cyan-300" />
                  <input
                    type="text"
                    id="fullName"
                    className="mb-5 p-2 w-full text-center text-lg cursor-not-allowed font-semibold bg-cyan-100 text-cyan-800 rounded-md"
                    value={oldFullName}
                    disabled
                  />
                  <div className="flex justify-center">
                    <div className="bg-cyan-100 mt-3 w-2/3 text-black border-2 p-3 flex justify-center font-extrabold cursor-pointer items-center border-cyan-700 rounded-full" onClick={handleEdit}>
                      <span className="text-md">Edit</span>
                      <GrUpdate className="text-black w-4 h-4 ml-1" />
                    </div>
                  </div>
                </>
              )}
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateName;
