import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaVideo, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  const userId = "65f7f7eb392c2626b5310797";

  const openDeleteModal = (playlistId) => {
    setShowDeleteModal(true);
    setPlaylistToDelete(playlistId);
  };

  const confirmDelete = () => {
    deletePlaylist(playlistToDelete);
    setShowDeleteModal(false);
    setPlaylistToDelete(null);
  };

  useEffect(() => {
    // Fetch user's playlists when component mounts
    axios
      .get(`/api/v1/playlist/user/${userId}`) // Replace 'userId' with the actual user ID
      .then((response) => setPlaylists(response.data.data || []))
      .catch((error) => console.error("Error fetching playlists:", error));
  }, []);

  const createPlaylist = () => {
    if (newPlaylistName.trim() !== "" && newPlaylistDescription.trim() !== "") {
      axios
        .post("/api/v1/playlist/createplaylist", {
          name: newPlaylistName,
          description: newPlaylistDescription,
        })
        .then((response) => {
          setPlaylists([...playlists, response.data.data]);
          setNewPlaylistName("");
          setNewPlaylistDescription("");
        })
        .catch((error) => console.error("Error creating playlist:", error));
    }
  };

  const updatePlaylist = (id) => {
    if (editName.trim() !== "" && editDescription.trim() !== "") {
      axios
        .patch(`/api/v1/playlist/${id}`, {
          name: editName,
          description: editDescription,
        })
        .then((response) => {
          const updatedPlaylists = playlists.map((playlist) =>
            playlist._id === id ? response.data.data : playlist
          );
          setPlaylists(updatedPlaylists);
          setEditing(null);
          setEditName("");
          setEditDescription("");
        })
        .catch((error) => console.error("Error updating playlist:", error));
    }
  };

  const deletePlaylist = (id) => {
    axios
      .delete(`/api/v1/playlist/${id}`)
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

  const addVideoToPlaylist = (videoId, playlistId) => {
    axios
      .patch(`/add/${videoId}/${playlistId}`)
      .then((response) => {
        const updatedPlaylists = playlists.map((playlist) =>
          playlist._id === playlistId ? response.data.data : playlist
        );
        setPlaylists(updatedPlaylists);
      })
      .catch((error) =>
        console.error("Error adding video to playlist:", error)
      );
  };

  const removeVideoFromPlaylist = (videoId, playlistId) => {
    axios
      .patch(`/remove/${videoId}/${playlistId}`)
      .then((response) => {
        const updatedPlaylists = playlists.map((playlist) =>
          playlist._id === playlistId ? response.data.data : playlist
        );
        setPlaylists(updatedPlaylists);
      })
      .catch((error) =>
        console.error("Error removing video from playlist:", error)
      );
  };

  return (
    <div className="p-4 max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto bg-black text-white">
      <h1 className="text-2xl mb-4 text-cyan-500">My Playlists</h1>
      <div className="flex flex-col mb-4">
        <input
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          className="mb-2 p-2 rounded bg-gray-800 text-white focus:outline-none"
          placeholder="Playlist name"
        />
        <input
          type="text"
          value={newPlaylistDescription}
          onChange={(e) => setNewPlaylistDescription(e.target.value)}
          className="mb-2 p-2 rounded bg-gray-800 text-white focus:outline-none"
          placeholder="Playlist description"
        />
        <button
          onClick={createPlaylist}
          className="p-2 rounded bg-cyan-500 text-black hover:bg-cyan-600"
        >
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {Array.isArray(playlists) &&
          playlists.map((playlist) => (
            <li
              key={playlist._id}
              className="flex flex-col sm:flex-row items-center bg-gray-800 p-2 rounded"
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
                  <div className="flex-1 mb-2 sm:mb-0">
                    <span className="block">{playlist.name}</span>
                    <span className="text-sm text-gray-400">
                      {playlist.description}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      startEditing(
                        playlist._id,
                        playlist.name,
                        playlist.description
                      )
                    }
                    className="ml-2 p-2 text-cyan-500 hover:text-cyan-600"
                  >
                    <FaEdit className="hover:scale-125 duration-500 text-lg" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(playlist._id)}
                    className="ml-2 p-2 text-red-500 hover:text-red-600"
                  >
                    <FaTrash className="hover:scale-125 duration-500 text-md" />
                  </button>
                </>
              )}
              {showDeleteModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-slate-500 bg-opacity-20 flex items-center justify-center">
                  <div className="bg-gray-800 p-4 rounded shadow-lg text-white">
                    <p className="text-2xl">Are you sure you want to delete this playlist?</p>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => setShowDeleteModal(false)}
                        className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmDelete}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Playlist;
