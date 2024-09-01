// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Dayago from "../utils/Dayago";
// import Formattime from "../utils/Formattime";
// import FirstCapital from "../utils/FirstCapital";
// import { MdOutlinePlaylistAdd , MdOutlinePlaylistAddCheck} from "react-icons/md";

// function DisplayAll({ direction, width, height, content, thumb_width, channelOwnerShow ,id}) {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [owners, setOwners] = useState({});

//   function shuffleVideos(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }

//   useEffect(() => {
//     fetchVideos();
//   }, [id]);

//   const handleRefresh = () =>{
//     console.log("new video clicked");
//   }

//   async function fetchVideos() {
//     try {
//       const response = await axios.get("/api/v1/video/get-all-videos");
//       let filteredVideos = response.data.data.docs;
//       if(id){
//         filteredVideos = response.data.data.docs.filter(
//         (video) => video._id !== id
//       );
//     }
//       const shuffledVideos = shuffleVideos(filteredVideos);
//       setVideos(shuffledVideos);
//       const ownerIds = shuffledVideos.map((video) => video.owner);
//       const ownersData = await Promise.all(
//         ownerIds.map((ownerId) => fetchOwner(ownerId))
//       );
//       const ownersMap = {};
//       ownersData.forEach((owner) => {
//         ownersMap[owner._id] = owner;
//       });
//       setOwners(ownersMap);
//     } catch (error) {
//       setError(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const fetchOwner = async (ownerId) => {
//     try {
//       const response = await axios.get(`/api/v1/user/${ownerId}`);
//       return response.data.data;
//     } catch (error) {
//       console.error(`Error fetching owner with ID ${ownerId}:`, error);
//       return null;
//     }
//   };

//   if (loading) {
//     return (
//       <div className=" h-screen w-screen flex justify-center items-center">
//         <div className="w-64 h-64 border-t-8 border-b-8 border-t-cyan-500 border-r-[0.1px] border-r-red-400 border-l-[0.1px] border-l-red-400 border-b-cyan-500 rounded-full animate-spin"></div>
//         &nbsp;&nbsp;&nbsp;{" "}
//         <h3 className="text-2xl animate-pulse text-cyan-500">Loading...</h3>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-center mt-4">Error: {error}</div>;
//   }

//   return (
//     <div className="bg-cur px-6 py-0">
//       <div className={direction}>
//         {Array.isArray(videos) &&
//           videos.map((video, index) => (
//             <div key={`${video._id}_${index}`} className={`${width}`}>
//               <Link to={`/videoplayer/${video._id}`} onClick={handleRefresh}>
//                 <div
//                   className={`p-4 cursor-pointer hover:scale-105 ${content} transition-all duration-500`}
//                 >
//                   <div className={`relative ${thumb_width}`}>
//                     <img
//                       src={video.thumbnail}
//                       alt={FirstCapital(video.title)}
//                       className={`w-full object-cover z-0 rounded-md relative mb-2 ${height}`}
//                       loading="lazy"
//                     />
//                     <p className="text-gray-50 font-sans bg-black px-[4px] font-semibold py-[1.5px] text-sm bg-opacity-55 rounded-lg absolute bottom-3 z-20 right-2">
//                       {Formattime(video.duration)}
//                     </p>
//                   </div>
//                   <div className="flex">
//                     {!channelOwnerShow && <div className="mr-2">
//                         <img
//                           src={owners[video.owner]?.avatar}
//                           className="w-12 h-12 object-cover rounded-full"
//                           alt=""
//                         />
//                       </div>
//                     }
//                     <div className={`flex flex-col ml-2`}>
//                       <h2 className="text-lg text-white font-semibold mb-2">
//                         {FirstCapital(video.title)}
//                       </h2>
//                       <p className="text-slate-300 text-md mb-1">
//                         {FirstCapital(owners[video.owner]?.username)}
//                       </p>
//                       <div className="flex space-x-3 font-sans text-slate-300 text-sm">
//                         <p>{video.views} Views</p>
//                         <p>{Dayago(video.createdAt)}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default DisplayAll;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dayago from "../utils/Dayago";
import Formattime from "../utils/Formattime";
import FirstCapital from "../utils/FirstCapital";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import {
  MdOutlinePlaylistAdd,
  MdOutlinePlaylistAddCheck,
} from "react-icons/md";
import { IoMdRemoveCircle } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import Loader from "../utils/Loader";

function DisplayAll({
  direction,
  width,
  height,
  content,
  thumb_width,
  channelOwnerShow,
  id,
  auth,
  currentUser,
}) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [owners, setOwners] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  function shuffleVideos(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    fetchVideos();
  }, [id]);

  useEffect(() => {
    fetchUserPlaylists();
  }, [auth, id]);

  const handleRefresh = () => {
    console.log("new video clicked");
  };

  async function fetchVideos() {
    try {
      const response = await axios.get("/api/v1/video/get-all-videos");
      let filteredVideos = response.data.data.docs;
      if (id) {
        filteredVideos = response.data.data.docs.filter(
          (video) => video._id !== id
        );
      }
      const shuffledVideos = shuffleVideos(filteredVideos);
      setVideos(shuffledVideos);
      const ownerIds = shuffledVideos.map((video) => video.owner);
      const ownersData = await Promise.all(
        ownerIds.map((ownerId) => fetchOwner(ownerId))
      );
      const ownersMap = {};
      ownersData.forEach((owner) => {
        ownersMap[owner._id] = owner;
      });
      setOwners(ownersMap);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserPlaylists() {
    if (auth) {
      try {
        const response = await axios.get(
          `/api/v1/playlist/user/${currentUser._id}`
        );
        setPlaylists(response.data.data);
        console.log("Playlists data:", response.data.data);
        // playlists.forEach((playlist , index) =>
        //   console.log("Playlist Videos:", index , playlist.videos)
        // );
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    }
  }

  const fetchOwner = async (ownerId) => {
    try {
      const response = await axios.get(`/api/v1/user/${ownerId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching owner with ID ${ownerId}:`, error);
      return null;
    }
  };

  const openPlaylistModal = (video) => {
    if (auth) {
      setSelectedVideo(video);
      setShowPlaylistModal(true);
      fetchUserPlaylists();
    } else {
      toast.error("Login to add video to playlist");
    }
  };

  const closePlaylistModal = () => {
    setShowPlaylistModal(false);
    setSelectedVideo(null);
  };

  const handleAddToPlaylist = async (playlistId, videoId) => {
    try {
      await toast.promise(
        axios.patch(`/api/v1/playlist/add/${videoId}/${playlistId}`),
        {
          pending: "Adding video to playlist...",
          success: "Video added to playlist successfully!",
          error: "Failed to add video to playlist (Contact Admin).",
        }
      );
      await fetchUserPlaylists();
    } catch (error) {
      console.error("Error adding video to playlist:", error);
      // toast.error is already handled by toast.promise
    }
  };

  const handleRemoveFromPlaylist = async (playlistId, videoId) => {
    try {
      await toast.promise(
        axios.patch(`/api/v1/playlist/remove/${videoId}/${playlistId}`),
        {
          pending: "Removing video from playlist...",
          success: "Video removed from playlist successfully!",
          error: "Failed to remove video from playlist (Contact Admin).",
        }
      );
      await fetchUserPlaylists();
    } catch (error) {
      console.error("Error removing video from playlist:", error);
      // toast.error is already handled by toast.promise
    }
  };

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <div className=" w-full px-6 pt-0 pb-4">
      <div className={direction}>
        {Array.isArray(videos) &&
          videos.map((video, index) => (
            <div key={`${video._id}_${index}`} className={`${width}`}>
              <div className="relative my-5 sm:my-0">
                <Link to={`/videoplayer/${video._id}`} onClick={handleRefresh}>
                  <div
                    className={`sm:p-4 cursor-pointer hover:bg-cyan-100 hover:bg-opacity-10 hover:ring-1 hover:ring-cyan-950 ${content} rounded-xl transition-all duration-500`}
                  >
                    <div className={`relative ${thumb_width}`}>
                      <img
                        src={video.thumbnail}
                        alt={FirstCapital(video.title)}
                        className={`w-full object-cover z-10 rounded-md relative mb-2 ${height}`}
                        loading="lazy"
                      />
                      <p className="text-gray-50 font-sans bg-black px-[4px] font-semibold py-[1.5px] sm:text-sm text-xs bg-opacity-55 rounded-lg absolute bottom-3 z-20 right-2">
                        {Formattime(video.duration)}
                      </p>
                    </div>
                    <div className="flex">
                      {!channelOwnerShow && (
                        <div className="mr-2">
                          <img
                            src={owners[video.owner]?.avatar}
                            className="w-12 h-12 object-cover rounded-full"
                            alt=""
                          />
                        </div>
                      )}
                      <div className={`flex flex-col ml-2`}>
                        <h2 className="sm:text-lg text-base text-white text-wrap font-semibold sm:mb-2 mb-0">
                          {FirstCapital(video.title)}
                        </h2>
                        <p className="text-slate-300 text-sm text-wrap mb-1">
                          {FirstCapital(owners[video.owner]?.fullname)}
                        </p>
                        <div className="flex space-x-3 font-sans text-slate-300 text-xs">
                          <p>{video.views} Views</p>
                          <p>{Dayago(video.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div
                  title="Add or Remove video from plalist"
                  className="absolute sm:top-4 top-2 sm:right-4 right-2 bg-gradient-to-br from-red-200 to-orange-200 via-yellow-500 border-2 border-cyan-700 hover:scale-125 duration-500 z-30 mt-2 mr-2 rounded-lg"
                >
                  {Array.isArray(playlists) &&
                  playlists.some((playlist) =>
                    playlist.videos.some(
                      (playlistVideo) => playlistVideo._id === video._id
                    )
                  ) ? (
                    <MdOutlinePlaylistAddCheck
                      className="text-cyan-600 sm:text-2xl text-lg cursor-pointer"
                      onClick={() => openPlaylistModal(video)}
                    />
                  ) : (
                    <MdOutlinePlaylistAdd
                      className="text-cyan-600 sm:text-2xl text-lg  cursor-pointer"
                      onClick={() => openPlaylistModal(video)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {showPlaylistModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-800 p-4 w-full max-w-md h-auto max-h-[80vh] overflow-auto rounded shadow-lg text-white relative">
            <button
              onClick={closePlaylistModal}
              className="absolute top-2 right-2 text-red-500 py-1 px-3 rounded"
            >
              <FaTimes className="text-xl hover:animate-spin-once" />
            </button>
            <h3 className="text-3xl text-cyan-200 text-center p-4 mb-4">
              Manage Playlists
            </h3>
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="flex md:flex-row flex-col items-start md:items-center w-full pl-2 mb-2"
              >
                <span className="w-2/4 md:text-xl text-lg">
                  {FirstCapital(playlist.name)}
                </span>
                {playlist.videos.some(
                  (videos) => videos._id == selectedVideo._id
                ) ? (
                  <div className="flex items-center cursor-default w-2/4 mb-2 md:mx-4 mt-2 sm:mt-0 rounded">
                    <span className="text-sm flex items-center text-slate-500 italic mr-3">
                      <IoCheckmarkCircleSharp className="md:text-xl text-lg shadow-inner shadow-green-700 rounded-full text-green-400 text-opacity-55 mr-1" />
                      Added!
                    </span>
                    <span
                      onClick={() =>
                        handleRemoveFromPlaylist(
                          playlist._id,
                          selectedVideo._id
                        )
                      }
                      className="md:text-base text-sm flex items-center text-slate-100"
                    >
                      <IoMdRemoveCircle className="hover:text-red-600 md:text-2xl text-sm text-red-500 mr-2 cursor-pointer" />{" "}
                      Remove
                    </span>
                  </div>
                ) : (
                  <button className="cursor-default flex items-center md:w-2/4 w-full mb-2 md:mx-4 mt-2 sm:mt-0 rounded">
                    <span
                      onClick={() =>
                        handleAddToPlaylist(playlist._id, selectedVideo._id)
                      }
                      className="text-base flex items-center text-slate-100"
                    >
                      <IoAddCircleSharp className="hover:text-cyan-600 text-2xl mr-2 text-cyan-500 cursor-pointer" />{" "}
                      Add to playlist
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* <ToastContainer theme="colored" pauseOnHover={false}/> */}
    </div>
  );
}

export default DisplayAll;
