import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import updatename from "./assets/password.png";
import Navbar from "../../Navbar";

function UpdatePassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    // const [user , setUser] = useState("");
    const[clicked , setClicked] = useState(true)

    const toggleClick = () => {
        setClicked(!clicked)
        
    }

  
  const handleSave = async (e) =>{
    
    e.preventDefault();

    if (oldPassword === "" || newPassword === "") {
        toast.error(`All fields are required `, {
            position: "top-right",
            autoClose: 3000,
          });
    }
   else{
    try {
  
      const response = await axios.post("/api/v1/user/change-password/", {
        oldPassword: oldPassword,
        newPassword: newPassword
      });
      // console.log(response.data);
      toast.success(`successfully`, {
        position: "top-right",
        autoClose: 3000,
      });
     setClicked(false)
    //  setNewPassword('')
    //  console.log(newPassword);
    //  setOldPassword("")
    // console.log(oldPassword);
    } catch (error) {
      // Handle any errors that occur during the request
      // console.error('Error updating account:', error);
      // You can also show a toast message or some other kind of error notification here
      toast.error(`Oops!! Wrong old password `, {
        position: "top-right",
        autoClose: 3000,
      });
    }
}  
    };
  

  return (
    <>
    <Navbar />
      <div className="flex sm:flex-row">
        <div className="w-full hidden sm:w-1/2 sm:min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-serif sm:flex items-center justify-center">
          <img src={updatename} alt="updateInfo" className="rounded-3xl shadow-4xl" />
        </div>
        <div className="w-full sm:w-1/2 min-h-screen text-white py-8 px-4 sm:px-6 lg:px-8 font-serif gap-5 flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-cyan-400 font-bold mb-8">
            Update
            <span className="before:block mx-3 before:absolute before:-inset-1 before:-skew-y-12 before:bg-cyan-500 relative inline-block">
              <span className="relative text-white">Your </span>
            </span>
            Password
          </h1>
          <form
            className="w-full sm:w-3/4 bg-transparent h-auto max-w-3xl p-4 rounded-xl py-6 pb-4 shadow-5xl flex flex-col"
            onSubmit={handleSave}
            noValidate
          >
            <div className="mb-3">
              <div className="flex my-4">
                <label htmlFor="fullName" className="text-xl font-medium">
                  Old Password
                </label>
              </div>
              <input
                type="password"
                required
                className="mt-1 p-2 w-full text-center text-lg font-semibold focus:outline-8 focus:outline-cyan-500 focus:shadow-3xl cursor-pointer bg-cyan-100 text-cyan-900 rounded-md"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="mt-6 text-white max-w-5xl justify-center items-center relative">
              <label className="block text-xl mb-4 font-medium">
                New Password
              </label>
              <input
                    type="password"
                    required
                    className="mb-5 p-2 w-full text-center text-lg font-semibold focus:outline-8 focus:outline-cyan-500 focus:shadow-3xl  bg-cyan-100 text-cyan-800 rounded-md"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  </div>
              {clicked ? (
                <>
                  
                  <div className="flex justify-center items-center mt-4">
                    <div className="bg-cyan-100 w-1/3 mx-1 text-black border-2 p-3 flex font-extrabold justify-center cursor-pointer items-center border-cyan-700 rounded-full" onClick={handleSave}>
                      <span className="text-md">Save</span>
                      <IoIosSave className="text-black w-4 h-4 ml-1" />
                    </div>
                    <div className="bg-cyan-100 w-1/3 text-black mx-1 border-2 p-3 flex font-extrabold justify-center cursor-pointer items-center border-cyan-700 rounded-full" onClick={toggleClick}>
                      <span className="text-md">Cancel</span>
                      <MdCancel className="text-black w-4 h-4 ml-1" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  
                  <div className="flex justify-center">
                    <div className="bg-cyan-100 mt-3 w-2/3 text-black border-2 p-3 flex justify-center font-extrabold cursor-pointer items-center border-cyan-700 rounded-full" onClick={toggleClick}>
                      <span className="text-md">Edit</span>
                      <GrUpdate className="text-black w-4 h-4 ml-1" />
                    </div>
                  </div>
                </>
              )}
              {/* <ToastContainer /> */}
            
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdatePassword;
