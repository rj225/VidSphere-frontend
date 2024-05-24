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
    <div className='fixed top-0 left-0 w-full h-full backdrop-blur-md bg-slate-500 bg-opacity-20 z-50 flex justify-center items-center'>
  <div ref={deleteRef} className='w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 h-auto sm:h-auto md:h-auto lg:h-auto xl:h-auto bg-slate-700 rounded-lg p-3 relative shadow-xl border-2 border-cyan-700'>
    <h1 className='text-gray-100 text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-semibold text-center'>Are you sure you want to delete this video?</h1>
    <div className='flex items-end justify-end h-auto sm:h-auto md:h-auto lg:h-auto xl:h-auto pr-2 pb-3'>
      <button onClick={handleDelete} className='mr-3 from-cyan-200 to-cyan-200 to-85% hover:to-35% via-red-200 hover:ring-1 scale-105 hover:ring-cyan-700 rounded-md px-7 py-2 hover:bg-gradient-to-br duration-500 bg-gradient-to-tl hover:scale-110'>Yes</button>
      <button onClick={onClose} className='from-cyan-300 via-cyan-500 to-cyan-200 hover:ring-1 scale-105 hover:ring-cyan-700 rounded-md px-7 py-2 hover:bg-gradient-to-tl transition duration-300 bg-gradient-to-tr hover:scale-110'>No</button>
    </div>
  </div>
</div>

  );
}

export default DeleteVideo;
