import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dayago from "../utils/Dayago";
import Formattime from "../utils/Formattime";
import FirstCapital from "../utils/FirstCapital";

function DisplayAll({ direction, width, height, content, thumb_width, channelOwnerShow ,id}) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [owners, setOwners] = useState({});

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

  const handleRefresh = () =>{
    console.log("new video clicked");
  }

  async function fetchVideos() {
    try {
      const response = await axios.get("/api/v1/video/get-all-videos");
      let filteredVideos = response.data.data.docs;
      if(id){
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

  const fetchOwner = async (ownerId) => {
    try {
      const response = await axios.get(`/api/v1/user/${ownerId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching owner with ID ${ownerId}:`, error);
      return null;
    }
  };

  if (loading) {
    return (
      <div className=" h-screen w-screen flex justify-center items-center">
        <div className="w-64 h-64 border-t-8 border-b-8 border-t-cyan-500 border-r-[0.1px] border-r-red-400 border-l-[0.1px] border-l-red-400 border-b-cyan-500 rounded-full animate-spin"></div>
        &nbsp;&nbsp;&nbsp;{" "}
        <h3 className="text-2xl animate-pulse text-cyan-500">Loading...</h3>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="bg-cur px-6 py-0">
      <div className={direction}>
        {Array.isArray(videos) &&
          videos.map((video, index) => (
            <div key={`${video._id}_${index}`} className={`${width}`}>
              <Link to={`/videoplayer/${video._id}`} onClick={handleRefresh}>
                <div
                  className={`p-4 cursor-pointer hover:scale-105 ${content} transition-all duration-500`}
                >
                  <div className={`relative ${thumb_width}`}>
                    <img
                      src={video.thumbnail}
                      alt={FirstCapital(video.title)}
                      className={`w-full object-cover z-0 rounded-md relative mb-2 ${height}`}
                      loading="lazy"
                    />
                    <p className="text-gray-50 font-sans bg-black px-[4px] font-semibold py-[1.5px] text-sm bg-opacity-55 rounded-lg absolute bottom-3 z-20 right-2">
                      {Formattime(video.duration)}
                    </p>
                  </div>
                  <div className="flex">
                    {!channelOwnerShow && <div className="mr-2">
                        <img
                          src={owners[video.owner]?.avatar}
                          className="w-12 h-12 object-cover rounded-full"
                          alt=""
                        />
                      </div>
                    }
                    <div className={`flex flex-col ml-2`}>
                      <h2 className="text-lg text-white font-semibold mb-2">
                        {FirstCapital(video.title)}
                      </h2>
                      <p className="text-slate-300 text-md mb-1">
                        {FirstCapital(owners[video.owner]?.username)}
                      </p>
                      <div className="flex space-x-3 font-sans text-slate-300 text-sm">
                        <p>{video.views} Views</p>
                        <p>{Dayago(video.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DisplayAll;
