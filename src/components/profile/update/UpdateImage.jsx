import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import updatename from "./assets/cover.png";

export default function UpdateImage() {
  const [cover, setCover] = useState(null);
  const [avatar, setAvatar] = useState(null)
  const [coverImage, setCoverImage] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const [avatarclicked, setAvatarClicked] = useState(false);
  const [coverclicked, setCoverClicked] = useState(false);


  const fetchData = async () => {
    try {
      const response = await axios.get("/api/v1/user/current-user");
      console.log("Response:", response.data);
      setCover(response.data.data.coverImage);
      setAvatar(response.data.data.avatar);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };


  const toggleAvatar = () => {
    setAvatarClicked(!avatarclicked);
  };
  const toggleCover = () => {
    setCoverClicked(!coverclicked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("coverImage", coverImage);

      // Make a PATCH request to the backend endpoint
      const response = await axios.patch("/api/v1/user/cover-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Add any additional headers if needed, such as authorization token
        },
      });

      console.log("Response:", response.data);
      toast.success(`successfully`, {
        position: "top-right",
        autoClose: 3000,
      });
      setCoverClicked(false);
      setCoverImage(null)
      fetchData();
      // Handle success, display a success message, etc.
    } catch (error) {
      console.error("Error updating cover image:", error.response.data);
      toast.error(`error`, {
        position: "top-right",
        autoClose: 3000,
      });
      // Handle error, display an error message, etc.
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("avatar", avatarImage);

      // Make a PATCH request to the backend endpoint
      const response = await axios.patch("/api/v1/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Add any additional headers if needed, such as authorization token
        },
      });

      console.log("Response:", response.data);
      toast.success(`successfully`, {
        position: "top-right",
        autoClose: 3000,
      });
      setAvatarClicked(false)
      setAvatarImage(null);
      fetchData();
      // Handle success, display a success message, etc.
    } catch (error) {
      console.error("Error updating avatar image:", error.response.data);
      toast.error(`error`, {
        position: "top-right",
        autoClose: 3000,
      });
      // Handle error, display an error message, etc.
    }
  };

  const authProfile = () => {
    if (!avatarclicked) {
      toast.error(`Please click on edit first `, {
        position: "top-right",
        autoClose: 3000,
      });
      
      document.getElementById("avatarInput").disabled = true;
    } 
  }

  const pupload = () => {
    document.getElementById("avatarInput").disabled = false;
  }

  const authCover = () => {
    if (!coverclicked) {
      toast.error(`Please click on edit first `, {
        position: "top-right",
        autoClose: 3000,
      });
      
      document.getElementById("coverInput").disabled = true;
    } 
  }

  const cupload = () => {
    document.getElementById("coverInput").disabled = false;
  }

  useEffect(() => {
    fetchData(); // Fetch initial user data
  }, []);


  return (
    <>
      <div className="flex sm:flex-row bg-gradient-to-r from-cyan-900 to-[#0D141A]">
        <div className="w-full hidden sm:w-1/2 sm:min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-serif sm:flex items-center justify-center">
          <img
            src={updatename}
            alt="updateInfo"
            className="rounded-3xl shadow-4xl"
          />
        </div>
        <div className="w-full sm:w-1/2 min-h-screen text-white py-8 px-4 sm:px-6 lg:px-8 font-serif gap-5 flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-cyan-400 font-bold mb-8">
            Update
            <span className="before:block mx-3 before:absolute before:-inset-1 before:-skew-y-12 before:bg-cyan-500 relative inline-block">
              <span className="relative text-white">Your </span>
            </span>
            photo
          </h1>
          <form
            className="w-full sm:w-3/4 bg-transparent h-auto max-w-3xl p-4 rounded-xl py-6 pb-4 shadow-5xl flex flex-col"
            onSubmit={handleSave}
          >

            {/* Profile Picture */}
            <div className="my-4 flex ">
            <div className="flex flex-col">
              <label
                htmlFor="profilePicture"
                className="block text-xl text-cyan-300 font-medium"
              >
                Chosse a new Profile Picture
              </label>
                <input
                id="avatarInput"
                  type="file"
                  className="block w-full text-sm text-slate-500 my-4
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-cyan-200 file:text-cyan-800
                hover:file:bg-cyan-700 hover:file:text-cyan-300 hover:file:transition"
                  onChange={(e) => setAvatarImage(e.target.files[0])}
                 onClick={authProfile}
                />
              </div>
              <div className="w-32 h-32 ">
                <img src={avatar} alt="cover image" className="h-full w-full rounded-full shadow-3xl object-cover"/>
              </div>
            </div>

            {avatarclicked? (
              <>
                <div className="flex justify-center items-center mt-4">
                  <div
                    className="bg-cyan-100 w-1/3 mx-1 text-black border-2 p-3 flex font-extrabold justify-center cursor-pointer items-center hover:bg-cyan-700 hover:text-cyan-200 border-cyan-700 rounded-full"
                    onClick={handleSave}
                  >
                    <span className="text-md">Save</span>
                    <IoIosSave className=" w-4 h-4 ml-1" />
                  </div>
                  <div
                    className="bg-cyan-100 hover:bg-cyan-700 hover:text-cyan-200 w-1/3 text-black mx-1 border-2 p-3 flex font-extrabold justify-center cursor-pointer items-center border-cyan-700 rounded-full"
                    onClick={toggleAvatar}
                  >
                    <span className="text-md">Cancel</span>
                    <MdCancel className=" w-4 h-4 ml-1" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center" onClick={pupload}>
                  <div
                    className="bg-cyan-100 hover:bg-cyan-700 hover:text-cyan-200 mt-3 w-2/3 text-black border-2 p-3 flex justify-center font-extrabold cursor-pointer items-center border-cyan-700 rounded-full"
                    onClick={toggleAvatar}
                  >
                    <span className="text-md" onClick={pupload}>Edit</span>
                    <GrUpdate className=" w-4 h-4 ml-1" />
                  </div>
                </div>
              </>
            )}

            
          </form>

          <form
            className="w-full sm:w-3/4 bg-transparent mb-4 h-auto max-w-3xl p-4 rounded-xl py-6 pb-4 shadow-5xl flex flex-col"
            onSubmit={handleSubmit}
          >
            {/* Cover Image */}
            <div className="mb-4 flex items-center justify-center">
            <div className=" flex flex-col">
              <label
                htmlFor="coverImage"
                className="block text-xl mt-1 mb-2 text-cyan-300  font-medium"
              >
                Choose a new cover image
              </label>
                <input
                id="coverInput"
                  type="file"
                  className="block w-full text-sm my-2 text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-cyan-200 file:text-cyan-800
                hover:file:bg-cyan-700 hover:file:text-cyan-300 hover:file:transition"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  onClick={authCover}
                />
              </div>
              <div className=" w-1/2 h-5/6 border-t-2 border-t-cyan-200 border-b-cyan-200 border-b-2">
                <img src={cover} alt="cover image" className="h-full w-full object-cover"/>
              </div>
            </div>

            {coverclicked ? (
              <>
                <div className="flex justify-center items-center mt-4">
                  <div
                    className="bg-cyan-100 w-1/3 mx-1 hover:bg-cyan-700 hover:text-cyan-200 text-black border-2 p-3 flex font-extrabold justify-center cursor-pointer items-center border-cyan-700 rounded-full"  
                  >
                    <button type="submit" className="text-md">
                      Save
                    </button>
                    <IoIosSave className=" w-4 h-4 ml-1" />
                  </div>
                  <div
                    className="bg-cyan-100 hover:bg-cyan-700 hover:text-cyan-200 w-1/3 text-black mx-1 border-2 p-3 flex font-extrabold justify-center cursor-pointer items-center border-cyan-700 rounded-full"
                    onClick={toggleCover}
                  >
                    <span className="text-md">Cancel</span>
                    <MdCancel className=" w-4 h-4 ml-1" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center" onClick={cupload}>
                  <div
                    className="bg-cyan-100 mt-3 w-2/3 hover:bg-cyan-700 hover:text-cyan-200 text-black border-2 p-3 flex justify-center font-extrabold cursor-pointer items-center border-cyan-700 rounded-full"
                    onClick={toggleCover}
                  >
                    <span className="text-md" onClick={cupload}>Edit</span>
                    <GrUpdate className=" w-4 h-4 ml-1" />
                  </div>
                </div>
              </>
            )}
            
          </form>
        </div>
        
        {/* <ToastContainer /> */}
      </div>
    </>
  );
}
