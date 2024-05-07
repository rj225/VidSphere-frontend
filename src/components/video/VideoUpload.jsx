import React, {useState} from 'react';
import axios from 'axios';
import { HiUpload } from 'react-icons/hi';
import bg from "./assets/videoUpload.png"

function VideoUpload(){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('videoFile', video);
      formData.append('thumbnail', thumbnail);
      formData.append('title', title);
      formData.append('description', description);
      
      const response = await axios.post('/api/v1/video/publish-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload successful:', response.data);
      // fetchVideos(); // Refresh the video list after successful upload - you need to define this function
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <>
    <div className='bg-gradient-to-r from-cyan-900 to-[#0D141A] absolute min-h-screen'>
    <div className="font-serif mb-6">
    <h1 className="text-white text-6xl text-center font-bold p-4 mt-4 z-10">Ready to Shine?</h1>
    <h1 className="text-neutral-300 text-3xl text-center font-bold p-4">Upload Your Video <span><strong className="text-cyan-300">Here!</strong></span></h1>
    </div>
    <div className="flex items-center justify-evenly px-12">
      <div className="w-1/2 mr-5 sm:flex justify-center hidden ">
        <img
          src={bg}
          alt="Background"
          className=" w-5/6 rounded-2xl shadow-4xl"
        />
      </div>

      <div className="w-1/2 bg-gradient-to-r font-serif from-cyan-500 p-4 to-cyan-600 rounded-2xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-black"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              onChange={handleTitleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-black"
            >
              Description
            </label>
            <textarea
              id="description"
              onChange={handleDescriptionChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-lg font-medium text-black"
            >
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="mt-1 p-2 w-full border border-cyan-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="video"
              className="block text-lg font-medium text-black"
            >
              Video
            </label>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoChange}
              className="mt-1 p-2 w-full border border-cyan-300 rounded-md"
            />
          </div>
          <div className="text-center mt-8 mb-4">
            <button
              className="bg-red-400 shadow-5xl text-md font-bold text-white px-4 py-2 rounded-md hover:bg-cyan-200 hover:text-black"
              type="submit"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
    </div></>
  );
}

export default VideoUpload;
