import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";

import { ToastContainer, toast } from 'react-toastify';

function Update() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [oldcoverImage, setOldCoverImage] = useState("");
  const [oldprofilePicture, setOldProfilePicture] = useState("");

  const [fullName, setFullName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [oldFullName, setOldFullName] = useState(fullName);
  const [email, setEmail] = useState("");


  const handleEdit = () => {
    setIsEditing(true);
  };


  const handlefullname = async () => {
  
    try {
      // Send the request to update the user's account
      const response = await axios.patch("/api/v1/user/update-account", {
        fullname: fullName,
        email: email
      });
      
      toast.success(`full Name updated to ${fullName} successfully`, {
        position: "top-right",
        autoClose: 3000,
      });
      setOldFullName(fullName);
      setIsEditing(false);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error updating account:', error);
      // You can also show a toast message or some other kind of error notification here
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset the full name to the previous value
    setFullName(oldFullName);
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/user/current-user");
        console.log("Response:", response.data);

        setOldFullName(response.data.data.fullname.toUpperCase());
        setFullName(response.data.data.fullname.toUpperCase());
        setOldProfilePicture(response.data.data.avatar);
        setEmail(response.data.data.email);
      } catch (error) {
        console.error("Error:", error.response.data);
        // Handle errors here
      }
    };

    fetchData();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update Full Name and Email
      await axios.patch("/api/v1/user/update-account", {
        fullName,
        email,
      });

      // Update Cover Image
      const coverFormData = new FormData();
      coverFormData.append("coverImage", coverImage);
      await axios.patch("/api/v1/user/cover-image", coverFormData);

      // Update Profile Picture
      const profileFormData = new FormData();
      profileFormData.append("avatar", profilePicture);
      await axios.patch("/api/v1/user/avatar", profileFormData);

      // Change Password
      await axios.post("/api/v1/user/change-password", {
        oldPassword,
        newPassword,
      });

      // Optionally, you can redirect the user to a different page after updating the profile
      // window.location.href = "/profile";
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle errors here
    }
  };

  return (
    <>
      <div className="min-h-screen bg-cur text-white py-8 px-4 sm:px-6 lg:px-8 font-serif gap-5 flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-4xl text-cyan-400 font-bold mb-8">
          Update
          <span class="before:block mx-3 before:absolute before:-inset-1 before:-skew-y-12 before:bg-cyan-500 relative inline-block">
            <span class="relative text-white">Your </span>
          </span>
          Profile
        </h1>
        <form className="w-full max-w-3xl" onSubmit={handleSubmit}>
          {/* email */}
          <div className="mb-4 flex justify-between items-center">
            <label
              htmlFor="fullName"
              className="block w-32 text-lg font-medium"
            >
              User Email
            </label>
            <input
              type="text"
              id="fullName"
              className="mt-1 p-2 w-2/3 text-center text-lg font-semibold bg-opacity-50 bg-cyan-100 text-cyan-900 rounded-md"
              value={email}
              disabled
            />

            <div className="w-10 h-10 "> </div>
          </div>

          {/* Full Name */}

          <div className="mb-4 flex text-white max-w-5xl justify-center items-center">
            <label
              htmlFor="fullName"
              className="block w-32 text-lg font-medium"
            >
              Full Name
            </label>
            {isEditing ? (
              <>
                <input
                  type="text"
                  id="fullName"
                  className="mt-1 p-2 w-2/3 text-center text-lg font-semibold bg-cyan-100 text-cyan-800 rounded-md"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <div
                  className="bg-cyan-100 text-black border-2 p-3 flex font-extrabold justify-center cursor-pointer items-center border-cyan-700 rounded-full"
                  onClick={handlefullname}
                >
                  <span className="text-md">Save</span>
                  <GrUpdate className="text-black w-4 h-4 ml-1" />
                </div>
                <div
                  className="bg-cyan-100 text-black border-2 p-3 flex font-extrabold justify-center cursor-pointer items-center border-cyan-700 rounded-full"
                  onClick={handleCancel}
                >
                  <span className="text-md">Cancel</span>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  id="fullName"
                  className="mt-1 p-2 w-2/3 text-center text-lg font-semibold bg-cyan-100 text-cyan-800 rounded-md"
                  value={oldFullName}
                  disabled
                />
                <div
                  className="bg-cyan-100 text-black border-2 p-3 flex font-extrabold justify-center cursor-pointer items-center border-cyan-700 rounded-full"
                  onClick={handleEdit}
                >
                  <span className="text-md">Edit</span>
                  <GrUpdate className="text-black w-4 h-4 ml-1" />
                </div>
              </>
            )}
            {/* <ToastContainer /> */}
          </div>

          {/* Old Password */}
          <div>
            <div className="mb-4 flex justify-between items-center">
              <label
                htmlFor="fullName"
                className="block w-32 text-lg font-medium"
              >
                Old Password
              </label>
              <input
                type="text"
                id="fullName"
                className="mt-1 p-2 w-2/3 text-center text-lg font-semibold bg-cyan-100 text-cyan-800 rounded-md"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <div className="bg-cyan-100 border-2 w-10 h-10 flex font-extrabold  justify-center cursor-pointer items-center border-cyan-700 rounded-full">
                <GrUpdate className="text-black w-5 h-5" />
              </div>
            </div>
            <div className="mb-4 flex justify-between items-center">
              <label
                htmlFor="fullName"
                className="block w-32 text-lg font-medium"
              >
                New Password
              </label>
              <input
                type="text"
                id="fullName"
                className="mt-1 p-2 w-2/3 text-center text-lg font-semibold bg-cyan-100 text-cyan-800 rounded-md"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <div className="w-10 h-10 "> </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="mb-4">
            <label htmlFor="coverImage" className="block text-sm font-medium">
              Cover Image
            </label>
            <div className="flex items-center">
              <input
                type="file"
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-cyan-200 file:text-cyan-800
                hover:file:bg-cyan-700 hover:file:text-cyan-300 hover:file:transition"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
            </div>
          </div>
          {/* Profile Picture */}
          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium"
            >
              Profile Picture
            </label>
            <div className="flex items-center">
              <input
                type="file"
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-cyan-200 file:text-cyan-800
                hover:file:bg-cyan-700 hover:file:text-cyan-300 hover:file:transition"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
}

export default Update;
