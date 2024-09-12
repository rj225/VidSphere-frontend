import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import { HiUpload } from 'react-icons/hi';
import bg from "./assets/videoUpload.png"
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Navbar from '../Navbar';
import UnauthorizedPage from '../UnauthorizedPage';
import Loader from '../utils/Loader';

function VideoUpload(){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [auth , setAuth] = useState(false)
  const [loader , setLoader] = useState(true);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    // console.log(title);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    // console.log(description);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 50 * 1024 * 1024) {  // 50 MB
      toast.error('Please upload a video less than 50 MB');
      return; // Do not set the video file if it exceeds the size limit
    }
    setVideo(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/user/current-user");
        console.log("Response:", response.data);

        setAuth(response.data.data.username);
      } catch (error) {
        console.error("Error:", error.response.data);
      }
      finally{
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video || !thumbnail || !title.trim() || !description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('videoFile', video);
      formData.append('thumbnail', thumbnail);
      formData.append('title', title);
      formData.append('description', description);
      
     const response = await toast.promise(
        axios.post('/api/v1/video/publish-video', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }),
        {
          pending: 'Uploading video...',
          success: 'Upload successful!',
          error: 'Error uploading video'
        }
      );

      setVideo(null)
      setDescription("")
      setThumbnail(null)
      setTitle(null)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      // console.log(response);
      // fetchVideos(); // Refresh the video list after successful upload - you need to define this function
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  if(loader){
    return(<Loader/>)
  }

  return (
    <>
      <Navbar uploadbutton={false} nospacebar={false} bg={'bg-gradient-to-l from-cyan-900 to-45% to-cur'}/>
    
    { auth ? 
      <div className='bg-gradient-to-l from-cyan-900 absolute right-0 to-45% to-[#0D141A] h-auto'>
    <div className="font-serif mb-6">
    <h1 className="text-white sm:text-6xl text-2xl text-center font-bold p-4 mt-4 z-10">Ready to Shine?</h1>
    <h1 className="text-neutral-400 sm:text-3xl text-lg text-center font-bold p-4 pt-1">Upload Your Video <span><strong className="text-cyan-500">Here!</strong></span></h1>
    </div>
    <div className="flex items-center w-screen justify-evenly px-12">
      <div className="lg:w-1/2 mr-5 lg:flex justify-center hidden ">
        <img
          src={bg}
          alt="Background"
          className="xl:w-5/6 lg:11/12  rounded-2xl shadow-4xl"
        />
      </div>

      <div className="lg:w-1/2 w-full bg-gradient-to-tr font-serif from-green-300 via-teal-300 p-4 to-cyan-500 rounded-2xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block sm:text-lg text-sm font-medium text-black"
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
              className="block sm:text-lg text-sm font-medium text-black"
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
              className="block sm:text-lg text-sm font-medium text-black"
            >
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="mt-1 p-2 w-full border border-cyan-500 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="video"
              className="block sm:text-lg text-sm font-medium text-black"
            >
              Video<span className="text-red-800 text-xs font-extrabold italic ml-2">(Max Size: 50 mb)</span>
            </label>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoChange}
              className="mt-1 p-2 w-full border border-cyan-500 rounded-md"
            />
          </div>
          <div className="flex justify-center mt-8 mb-4">
            <button
              className="bg-red-600 shadow-md shadow-red-800 hover:ring-0 sm:text-md text-xs flex items-center font-bold text-slate-50 px-4 py-2 rounded-md hover:scale-105 transition-all duration-200"
              type="submit"
            >
             < HiUpload />
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
    
  : <UnauthorizedPage/>}
    
    </>
  );
}

export default VideoUpload;
