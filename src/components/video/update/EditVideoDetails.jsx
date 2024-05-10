import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HiUpload } from 'react-icons/hi';
import { FiEdit } from "react-icons/fi";
import { FaSave, FaTimes } from "react-icons/fa";
import image from "./assets/videoEdit.png";
import FirstCapital from "../../utils/FirstCapital";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditVideoDetails() {
  const { video } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalDescription, setOriginalDescription] = useState("");
  const [originalThumbnail, setOriginalThumbnail] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingThumbnail, setIsEditingThumbnail] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const fetchVideo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/video/${video}`
      );
      setTitle(response.data.data.title);
      setOriginalTitle(response.data.data.title);
      setDescription(response.data.data.description);
      setOriginalDescription(response.data.data.description);
      setThumbnail(response.data.data.thumbnail);
      setOriginalThumbnail(response.data.data.thumbnail);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);

      const response = await axios.patch(
        `/api/v1/video/update-video/${video}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Video details updated:", response.data);
      toast.success("Video details updated successfully!");
    } catch (error) {
      console.error("Error updating video details:", error);
      toast.error("Error updating video details. Please try again.");
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []); // Empty dependency array to run only once

  const handleCancelTitle = () => {
    setTitle(originalTitle);
    setIsEditingTitle(false);
  };

  const handleCancelDescription = () => {
    setDescription(originalDescription);
    setIsEditingDescription(false);
  };

  const handleCancelThumbnail = () => {
    setThumbnail(originalThumbnail);
    setIsEditingThumbnail(false);
  };

  return (
    <div className="sm:w-screen flex items-center justify-center sm:h-screen sm:bg-gradient-to-r sm:from-cyan-900 sm:to-[#0D141A] px-4 text-gray-300">
      <div className="flex flex-col md:flex-row h-5/6 w-11/12">

        <div className="md:w-1/2 flex justify-center items-center">
          <img src={image} alt="Custom Image" className="w-10/12 h-5/6 rounded-2xl shadow-4xl" />
        </div>


        <div className="md:w-1/2 mb-8 md:mb-0 flex items-center">
          <div className="max-w-md mx-auto text-gray-700">
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-center text-cyan-400 mb-8 font-bold">
              Update
              <span className="before:block mx-3 before:absolute before:-inset-1 before:-skew-y-12 before:bg-cyan-500 relative inline-block">
                <span className="relative text-white">Video</span>
              </span>
              Details
            </h1>
            <div className="rounded-lg">
              <div className="mb-4 p-3 rounded-2xl bg-cyan-200 shadow-3xl bg-opacity-95 ring-2 ring-cyan-700">
                <label className="block text-slate-800 font-semibold text-xl mb-2">Video Title</label>
                {isEditingTitle ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={FirstCapital(title)}
                      onChange={handleTitleChange}
                      className="border border-gray-300 rounded px-2 py-1 mr-2 flex-1 bg-white text-gray-800"
                    />
                    <button
                      onClick={handleCancelTitle}
                      className="text-gray-300 hover:text-gray-400 flex-shrink-0"
                    >
                      <FaTimes />
                    </button>
                    <button
                      onClick={() => setIsEditingTitle(false)}
                      className="bg-green-500 text-white px-4 py-1 rounded flex-shrink-0 ml-2"
                    >
                      <FaSave className="mr-1" />
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>{title}</span>
                    <button
                      onClick={() => setIsEditingTitle(true)}
                      className="text-cyan-700 text-lg hover:text-gray-800 flex-shrink-0 ml-2"
                    >
                      <FiEdit />
                    </button>
                  </div>
                )}
              </div>
              <div className="mb-4 p-3 rounded-2xl bg-cyan-200 shadow-3xl bg-opacity-95 ring-2 ring-cyan-700">
                <label className="block text-slate-800 font-semibold text-xl mb-2">Description</label>
                {isEditingDescription ? (
                  <div className="flex items-center">
                    <textarea
                      value={description}
                      onChange={handleDescriptionChange}
                      className="border border-gray-300 rounded px-2 py-1 mr-2 flex-1 bg-white text-gray-800"
                    ></textarea>
                    <button
                      onClick={handleCancelDescription}
                      className="text-gray-300 hover:text-gray-400 flex-shrink-0"
                    >
                      <FaTimes />
                    </button>
                    <button
                      onClick={() => setIsEditingDescription(false)}
                      className="bg-green-500 text-white px-4 py-1 rounded flex-shrink-0 ml-2"
                    >
                      <FaSave className="mr-1" />
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p>{description}</p>
                    <button
                      onClick={() => setIsEditingDescription(true)}
                      className="text-cyan-700 text-lg hover:text-gray-800 flex-shrink-0 ml-2"
                    >
                      <FiEdit />
                    </button>
                  </div>
                )}
              </div>
              <div className="mb-4 p-3 rounded-2xl bg-cyan-200 shadow-3xl bg-opacity-95 ring-2 ring-cyan-700">
                <label className="block text-slate-800 font-semibold text-xl mb-2">Thumbnail</label>
                {isEditingThumbnail ? (
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="border border-gray-300 rounded px-2 py-1 mr-2 flex-1 bg-white text-gray-800"
                    />
                    <button
                      onClick={handleCancelThumbnail}
                      className="text-gray-300 hover:text-gray-400 flex-shrink-0"
                    >
                      <FaTimes />
                    </button>
                    <button
                      onClick={() => setIsEditingThumbnail(false)}
                      className="bg-green-500 text-white px-4 py-1 rounded flex-shrink-0 ml-2"
                    >
                      <FaSave className="mr-1" />
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <img
                      src={thumbnail}
                      alt="Thumbnail"
                      className="w-32 h-32 object-cover mr-2"
                    />
                    <button
                      onClick={() => setIsEditingThumbnail(true)}
                      className="text-cyan-700 text-lg hover:text-gray-800 flex-shrink-0"
                    >
                      <FiEdit />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleUpdate}
                  className="bg-cyan-600 hover:bg-cyan-400 hover:scale-105 transition duration-200 flex items-center text-xl text-bold active:ring-1 active:ring-cyan-400 hover:text-slate-700 text-slate-200 px-4 py-2 rounded"
                >
                  < HiUpload />
                  Update Video Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditVideoDetails;
