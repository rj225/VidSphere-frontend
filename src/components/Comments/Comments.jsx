import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaComment } from "react-icons/fa";
import FirstCapital from "../utils/FirstCapital";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Dayago from "../utils/Dayago";
import { FaCommentSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Count from "../utils/Count";

function Comments({ videoId, auth, refreshCommentsKey,currentuser }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [heartClicked, setHeartClicked] = useState([]);
  const [editClicked, setEditClicked] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState(false);

  const handeHeartClicked = async (index, id) => {
    if (auth) {
      try {
        const response = await fetch(`/api/v1/like/toggle/c/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          // Toggle the value of heartClicked at the specified index
          const updatedHeartClicked = [...heartClicked];
          updatedHeartClicked[index] = !updatedHeartClicked[index];
          setHeartClicked(updatedHeartClicked);
  
          // Update the like count for the comment in the UI
          const updatedComments = [...comments];
          updatedComments[index].likes += updatedHeartClicked[index] ? 1 : -1;
          setComments(updatedComments);
        } else {
          console.error("Failed to toggle like");
          toast.error("Failed to toggle like");
        }
      } catch (error) {
        console.error("Error toggling like:", error);
        toast.error("Failed to post like or !like");
      }
    } else {
      navigate("/login");
    }
  }; 

  const fetchLikedComments = async () => {
    try {
      if (Array.isArray(comments)) {
      const response = await axios.get("/api/v1/like/comments");
  
      const filteredData = response.data.data.filter(comment => comment !== null);
      const likedCommentIds = filteredData.map(comment => comment._id);
      // Update the heartClicked state based on whether each comment is liked
      const updatedHeartClicked = comments.map(comment =>
        likedCommentIds.includes(comment._id)
      );
      
      setHeartClicked(updatedHeartClicked);
    }
    } catch (error) {
      console.error("Error fetching liked comments:", error);
    }
  };
    

  async function handeDeleteClicked(commentId , commentOwner) {
    if (commentOwner === currentuser._id) {
      try {
        const response = await fetch(`/api/v1/comment/c/${commentId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          toast.success("Comment deleted successfully");
          setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
          setTotalComments(prev => prev - 1 )
        } else {
          // Error deleting video
          toast.error("No such comment!! Please refresh the page.");
         
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error("Failed to Delete. DeleteApi Error");
      
      }
    }
    else{
      toast.error("You Are NoT ThE OWneR oF tHe CoMmENt !!");
    }
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
        `/api/v1/comment/v/${videoId}?page=${page}`
      );
      console.log("comment response" , response.data);
      const newComments = response.data.data.docs;
      setTotalComments(response.data.data.totalDocs);
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
      setHasMore(response.data.data.hasNextPage); // Set hasMore based on whether new comments were fetched
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId, refreshCommentsKey]);

  useEffect(() => {
    fetchLikedComments();
  },[comments])

  

  const handleSeeMore = () => {
    fetchComments(); // Fetch more comments when "See More Comments" button is clicked
  };

  return (
    <div
      className={`mt-4 py-1 ${
        comments.length === 0 ? "flex justify-center items-center" : "block"
      }`}
    >
      {comments.length === 0 ? null : (
        <h2 className="sm:text-2xl text-lg flex items-center text-white font-semibold p-2 mb-2">
          <p className="text-md mr-2 font-mono text-cyan-300">
            {Count(totalComments)}
          </p>
          Comments
        </h2>
      )}
      {comments.length === 0 && !loading ? (
        <div className="text-3xl flex flex-col justify-center text-center py-5 text-white">
          Be the first to share your thoughts
          <p className="text-lg flex justify-center items-center text-slate-400">
            No comments yet. <FaCommentSlash className="text-cyan-500 ml-2" />
          </p>
        </div>
      ) : (
        <ul>
          {Array.isArray(comments) && comments.map((comment, index) => (
            <li
              key={`${comment._id}-${index}`}
              className="mb-2 bg-slate-800 p-3 font-sans text-white rounded-md bg-opacity-30"
            >
              <div className="flex items-center">
                {/* user avatar */}

                <div className="bg-cyan-500 bg-opacity-20 ring-1 ring-opacity-20 ring-cyan-200 rounded-full p-1 mr-2">
                  {/* Display user avatar */}
                  {comment.user && (
                    <img
                      src={comment.user.avatar}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>

                {/* user name and comment */}
                <div>
                  <div className="flex">
                    <p className="sm:text-base text-xs font-semibold">
                      {/* Display username */}
                      {comment.user && FirstCapital(comment.user.username)}
                    </p>
                    <h3 className="text-sm text-slate-400 mx-4">
                      {Dayago(comment.createdAt)}
                    </h3>
                  </div>

                  <p className="sm:text-lg text-sm font-medium">
                    {FirstCapital(comment.content)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-3">
                {/* hearts or likes */}
                <div className="flex items-center">
                {heartClicked[index] ? (
                  <FaHeart
                    onClick={() => handeHeartClicked(index, comment._id)}
                    className={` text-lg hover:scale-125 transition duration-300 cursor-pointer text-cyan-500 `}
                  />
                ) : (
                  <FaRegHeart
                    onClick={() => handeHeartClicked(index , comment._id)}
                    className={` text-lg hover:scale-125 transition duration-300 cursor-pointer text-cyan-500 `}
                  />
                )}
                <div className="mx-2">{comment.likes}</div>
                </div>

                <FiEdit
                  onClick={() => handeEditClicked(index)}
                  className={` text-lg hover:scale-125 hover:text-slate-700 transition duration-300 cursor-pointer ${
                    editClicked[index] ? "text-purple-500" : "text-slate-900"
                  }`}
                />

                <MdDelete
                  onClick={() => handeDeleteClicked(comment._id , comment.user?._id)}
                  className={` text-lg hover:scale-125 transition duration-300 cursor-pointer text-red-700`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      {loading && (
        <div className="">
          <div className="w-16 h-16 border-t-8 border-b-8 border-t-cyan-500 border-r-[0.1px] border-r-red-400 border-l-[0.1px] border-l-red-400 border-b-cyan-500 rounded-full animate-spin"></div>
          &nbsp;&nbsp;&nbsp;{" "}
          <h3 className="text-2xl animate-pulse text-cyan-500">Loading...</h3>
        </div>
      )}
      {hasMore && !loading && comments.length !== 0 && (
        <button
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleSeeMore}
        >
          See More Comments
        </button>
      )}
      {/* <ToastContainer theme="colored" pauseOnHover={false}/> */}
    </div>
  );
}

export default Comments;
