import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import "animate.css"; // Importing Animate.css
import Formattime from "../utils/Formattime";
import { IoMdEye } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import NoPlaylists from "./NoPlaylists";
import NoVideosPlaylist from "./NoVideoPlaylist";
import FirstCapital from "../utils/FirstCapital";
import { Link } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

export default function Playlist({ userId }) {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  const [creating, setCreating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; 
  const [loader,setLoader] = useState(true)

  const openDeleteModal = (playlistId) => {
    setShowDeleteModal(true);
    setPlaylistToDelete(playlistId);
  };

  const confirmDelete = () => {
    deletePlaylist(playlistToDelete);
    setShowDeleteModal(false);
    setPlaylistToDelete(null);
  };

  const getPlaylist = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`/api/v1/playlist/user/${userId}`);
      setPlaylists(response.data.data || []);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
    finally{
      setLoader(false);
    }
  };


  useEffect(() => {
    getPlaylist();
  }, [userId]);

  const createPlaylist = () => {
    if (newPlaylistName.trim() !== "" && newPlaylistDescription.trim() !== "") {
      toast
        .promise(
          axios.post("/api/v1/playlist/createplaylist", {
            name: newPlaylistName,
            description: newPlaylistDescription,
          }),
          {
            pending: "Creating playlist...",
            success: "Playlist created successfully!",
            error: "Failed to create playlist (Contact Admin).",
          }
        )
        .then((response) => {
          setPlaylists([...playlists, response.data.data]);
          setNewPlaylistName("");
          setNewPlaylistDescription("");
          setCreating(false); // Hide the input fields after creating a playlist
        })
        .catch((error) => console.error("Error creating playlist:", error));
    }
  };

  const handleRemoveFromPlaylist = async (videoId, playlistId) => {
    // console.log("playlistId", playlistId);
    // console.log("videoId", videoId);

    try {
      await toast.promise(
        axios.patch(`/api/v1/playlist/remove/${videoId}/${playlistId}`),
        {
          pending: "Removing video from playlist...",
          success: "Video removed from playlist successfully!",
          error: "Failed to remove video from playlist (Contact Admin).",
        }
      );
      await getPlaylist();
    } catch (error) {
      toast.error("Error removing video from playlist:");
      // toast.error is already handled by toast.promise
    }
  };

  const updatePlaylist = async (id) => {
    if (editName.trim() !== "" && editDescription.trim() !== "") {
      try {
        const response = await axios.patch(`/api/v1/playlist/${id}`, {
          // Await the axios call
          name: editName,
          description: editDescription,
        });

        await getPlaylist(); // Await getPlaylist call

        setEditing(null);
        setEditName("");
        setEditDescription("");
      } catch (error) {
        console.error("Error updating playlist:", error);
      }
    }
  };

  const deletePlaylist = (id) => {
    toast
      .promise(axios.delete(`/api/v1/playlist/${id}`), {
        pending: "Deleting playlist...",
        success: "Playlist deleted successfully!",
        error: "Failed to delete playlist (Contact Admin).",
      })
      .then(() => {
        const updatedPlaylists = playlists.filter(
          (playlist) => playlist._id !== id
        );
        setPlaylists(updatedPlaylists);
      })
      .catch((error) => console.error("Error deleting playlist:", error));
  };

  const startEditing = (id, name, description) => {
    setEditing(id);
    setEditName(name);
    setEditDescription(description);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlaylists = playlists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(playlists.length / itemsPerPage);

  if (loader) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="p-4 w-full mx-auto bg-black bg-opacity-10 text-white">
      <div className="flex md:flex-row flex-col justify-between items-center mb-4">
        <h1 className="md:text-2xl sm:text-xl text-lg md:mb-0 mb-2 text-cyan-500">
          My Playlists
        </h1>
        {creating ? null : (
          <button
            onClick={() => setCreating(!creating)}
            className="p-2 rounded bg-cyan-500 ring-1 md:w-auto md:scale-100 text-sm ring-cyan-400 text-black shadow-xl hover:shadow-3xl duration-300 shadow-cyan-950 hover:underline flex items-center"
          >
            <FaPlus className="mr-2 text-xs" />
            Create New Playlist
          </button>
        )}
      </div>
      {creating && (
        <div
          className={`animate__animated md:space-x-3 space-y-2 animate__fadeIn flex md:flex-row flex-col items-center justify-start mb-4`}
        >
          <input
            type="text"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className=" p-2 rounded md:ring-0 ring-1 ring-cyan-600 bg-gray-800 text-white focus:outline-none"
            placeholder="Playlist name"
          />
          <input
            type="text"
            value={newPlaylistDescription}
            onChange={(e) => setNewPlaylistDescription(e.target.value)}
            className=" p-2 rounded md:ring-0 ring-1 ring-cyan-600 bg-gray-800 text-white focus:outline-none"
            placeholder="Playlist description"
          />
          <div className="flex items-center justify-evenly">
            <button
              onClick={createPlaylist}
              className="p-2 rounded hover:scale-110 hover:bg-cyan-600"
            >
              <FaSave className="duration-500 text-3xl text-cyan-400" />
            </button>
            <button
              onClick={() => setCreating(false)}
              className="ml-2 p-2 hover:scale-110  text-red-400 hover:text-red-500"
            >
              <MdCancel className=" duration-500 text-3xl" />
            </button>
          </div>
        </div>
      )}
      {playlists.length === 0 ? (
        <NoPlaylists />
      ) : (
        <div className="space-y-4 h-full">
          {currentPlaylists.map((playlist) => (
            <div
              key={playlist._id}
              className="bg-gray-800 bg-opacity-35 p-4 rounded"
            >
              {editing === playlist._id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 p-2 mr-3 mb-2 sm:mb-0 border-2 bg-gray-700 text-white focus:outline-none"
                    placeholder="Edit name"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="flex-1 p-2 mb-2 sm:mb-0 border-2 bg-gray-700 text-white focus:outline-none"
                    placeholder="Edit description"
                  />

                  <div className=" flex items-center">
                    <button
                      onClick={() => updatePlaylist(playlist._id)}
                      className="ml-2 p-2 text-cyan-300 hover:text-cyan-400"
                    >
                      <FaSave className="hover:scale-125 duration-500 text-lg" />
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="ml-2 p-2 text-red-400 text-lg hover:text-red-500"
                    >
                      <MdCancel className="hover:scale-125 duration-500 text-xl" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="md:text-xl sm:text-lg text-base  flex gap-x-10 mb-2">
                    {FirstCapital(playlist.name)}
                    <div className=" flex items-center space-x-2">
                      <button
                        onClick={() =>
                          startEditing(
                            playlist._id,
                            playlist.name,
                            playlist.description
                          )
                        }
                        title="Edit"
                        className=" text-cyan-500 hover:scale-105"
                      >
                        <FaEdit />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => openDeleteModal(playlist._id)}
                        className=" text-red-700 hover:scale-105"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </h2>
                  <p className="text-gray-400 md:text-base text-xs mb-2 relative">
                    {FirstCapital(playlist.description)}
                  </p>
                </>
              )}
              {playlist.videos.length === 0 ? (
                <NoVideosPlaylist />
              ) : (
                <div
                  key={playlist._id}
                  className="whitespace-nowrap"
                >
                  <div className="flex overflow-x-auto w-full max-w-full gap-x-4 p-2">
                    {playlist.videos.map((video, index) => (
                      <div
                        key={index}
                        className="bg-gray-700 ring-1 ring-cyan-800 md:shadow-right-top shadow-none cursor-pointer bg-opacity-25 p-2 relative md:min-w-max min-w-40 rounded-xl"
                      >
                        <Link to={`/videoplayer/${video._id}`}>
                          <span
                            onClick={(e) => {
                              e.preventDefault(); // Prevents navigation
                              handleRemoveFromPlaylist(video._id, playlist._id);
                            }}
                            className="text-red-800 absolute top-0 hover:scale-105 z-10 right-0"
                          >
                            <RxCrossCircled
                              title="Delete video from playlist"
                              className=" bg-red-400 rounded-full text-xl"
                            />
                          </span>
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="md:w-48 md:h-24 w-36 h-24 object-cover rounded mb-2"
                          />
                          <h3 className="sm:text-sm text-xs text-wrap font-bold">
                            {FirstCapital(video.title)}
                          </h3>
                          <div className="text-xs flex my-2 font-sans text-gray-300">
                            <span className=" flex items-center gap-x-1">
                              <IoTime className=" text-cyan-100" />{" "}
                              {Formattime(video.duration)}
                            </span>
                            &nbsp; &nbsp;
                            <span className=" flex items-center gap-x-1">
                              <IoMdEye className=" text-cyan-100" />{" "}
                              {video.views}
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-lg bg-slate-500 bg-opacity-20 z-20 flex items-center justify-center">
          <div className="bg-gray-600 p-4 rounded shadow-right-top shadow-cyan-700 md:scale-110 scale-95 border-l-2 border-cyan-300  text-white">
            <p className="md:text-xl text-sm">
              Are you sure you want to delete this playlist?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-xs rounded-2xl md:text-base text-white py-1 px-3 mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-cyan-600 hover:bg-gray-700 text-white rounded-2xl md:text-base text-xs py-1 px-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
}
