import React, { useRef ,useEffect } from 'react';
import { toast } from 'react-toastify';

function DeleteVideo({videoId , onClose , showToast}) {

  const deleteRef = useRef(null);

  const handleClickOutside = event => {
    if (deleteRef.current && !deleteRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/v1/video/delete-video/${videoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Video deleted successfully
        showToast('Video deleted successfully', 'success');
      } else {
        // Error deleting video
        showToast('Error deleting video', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('Error deleting video', 'error');
    }
    finally{
      onClose()
    }
  };

  return (
    <div className='fixed top-0 left-0 w-screen bg-cur bg-opacity-85 z-50 h-screen flex justify-center items-center'>
      <div ref={deleteRef} className='w-4/12 h-1/6 bg-slate-300 shadow-xl rounded-lg p-3 relative ring-2 ring-cyan-500'>
      <h1 className='text-gray-800 text-xl font-semibold text-center'>Are you sure you want to delete this video?</h1>
      <div className='flex items-end justify-center h-5/6 pb-3'>
      <button onClick={handleDelete}
      className='mr-3 from-cyan-600 hover:underline to-cyan-300 hover:ring-1 scale-105 hover:ring-cyan-700 rounded-md px-7 py-2 hover:bg-gradient-to-br transition duration-300 bg-gradient-to-bl hover:scale-105'>Yes</button>
      <button onClick={onClose}
      className='from-cyan-600 hover:underline to-cyan-300 hover:ring-1 scale-105 hover:ring-cyan-700 rounded-md px-7 py-2 hover:bg-gradient-to-tl transition duration-300 bg-gradient-to-br hover:scale-105'>No</button>
      </div>
      </div>
    </div>
  );
}

export default DeleteVideo;
