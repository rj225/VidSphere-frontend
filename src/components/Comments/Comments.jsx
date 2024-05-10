import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaComment } from "react-icons/fa";
import FirstCapital from "../utils/FirstCapital";
import { FaHeart } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [heartClicked , setHeartClicked] = useState([])
  const [editClicked , setEditClicked] = useState([])
  const [deleteClicked , setDeleteClicked] = useState([])


  function handeHeartClicked(index) {
    // Create a copy of the existing heartClicked state
    const updatedHeartClicked = [...heartClicked];
    // Toggle the value of heartClicked at the specified index
    updatedHeartClicked[index] = !updatedHeartClicked[index];
    // Update the heartClicked state with the modified array
    setHeartClicked(updatedHeartClicked);
  }
  

  function handeDeleteClicked(index) {
    const updatedDeleteClicked = [...deleteClicked];
   
    updatedDeleteClicked[index] = !updatedDeleteClicked[index];
    
    setDeleteClicked(updatedDeleteClicked);
    
  }

  function handeEditClicked(index) {
    const updatedEditClicked = [...editClicked];
    updatedEditClicked[index] = !updatedEditClicked[index];
    setEditClicked(updatedEditClicked);
  }

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/v1/comment/v/662d4b61eabf4fcb93b0c25c?page=${page}`
      );
      const newComments = response.data.data.docs;

      // Fetch user details and avatars for each comment
      const commentsWithUsers = await Promise.all(
        newComments.map(async (comment) => {
          const userResponse = await axios.get(
            `/api/v1/user/c/${comment.username}`
          );
          return {
            ...comment,
            user: userResponse.data.data,
          };
        })
      );

      setComments((prevComments) => [...prevComments, ...commentsWithUsers]);
      setHasMore(newComments.length > 0); // Set hasMore based on whether new comments were fetched
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSeeMore = () => {
    fetchComments(); // Fetch more comments when "See More Comments" button is clicked
  };

  return (
    <div className="mt-4 w-10/12">
      <h2 className="text-lg font-bold mb-2">
        <FaComment className="inline mr-2" />
        Comments
      </h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li
              key={`${comment.id}-${index}`}
              className="mb-2 bg-slate-400 p-3 rounded-md bg-opacity-60"
            >
              <div className="flex items-center">
                {/* user avatar */}

                <div className="bg-cyan-200 rounded-full p-1 mr-2">
                  {/* Display user avatar */}
                  {comment.user && (
                    <img
                      src={comment.user.avatar}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </div>

                {/* user name and comment */}
                  <div>
                    <p className="font-semibold">
                      {/* Display username */}
                      {comment.user && FirstCapital(comment.user.username)}
                    </p>
                    <p>{comment.content}</p>
                  </div>
              </div>

              <div className="flex space-x-4 mt-3">
                    <FaHeart
                    onClick={() => handeHeartClicked(index)}
                    className={` text-lg hover:scale-125 transition duration-300 cursor-pointer ${heartClicked[index] ? "text-cyan-500" : "text-slate-800"}`} />

                    <FiEdit
                    onClick={() => handeEditClicked(index)} 
                    className={` text-lg hover:scale-125 transition duration-300 cursor-pointer ${editClicked[index] ? "text-purple-500" : "text-slate-800"}`} />

                    <MdDelete onClick={() => handeDeleteClicked(index)} className={` text-lg hover:scale-125 transition duration-300 cursor-pointer ${deleteClicked[index] ? "text-red-500" : "text-slate-800"}`} />
                  </div> 
            </li>
          ))}
        </ul>
      )}
      {loading && (
        <div className="">
          <div className="w-64 h-64 border-t-8 border-b-8 border-t-cyan-500 border-r-[0.1px] border-r-red-400 border-l-[0.1px] border-l-red-400 border-b-cyan-500 rounded-full animate-spin"></div>
          &nbsp;&nbsp;&nbsp;{" "}
          <h3 className="text-2xl animate-pulse text-cyan-500">Loading...</h3>
        </div>
      )}
      {hasMore && (
        <button
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleSeeMore}
        >
          See More Comments
        </button>
      )}
    </div>
  );
}

export default Comments;
