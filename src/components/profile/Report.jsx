import React, { useState } from 'react';
import { FaBug, FaComment } from 'react-icons/fa'; // Importing icons

const Report = () => {
  const [bugDescription, setBugDescription] = useState('');
  const [feedback, setFeedback] = useState('');
  const [options, setOptions] = useState([]);

  const handleBugChange = (e) => {
    setBugDescription(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleOptionChange = (option) => {
    if (options.includes(option)) {
      setOptions(options.filter((item) => item !== option));
    } else {
      setOptions([...options, option]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bug Description:', bugDescription);
    console.log('Feedback:', feedback);
    console.log('Selected Options:', options);
    setBugDescription('');
    setFeedback('');
    setOptions([]);
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-cur font-serif'>
    <div className="bg-cyan-100 p-6 rounded-md w-1/3">
      <h1 className="text-cyan-800 text-2xl text-center mb-8 underline">Report Issue</h1>
      <form onSubmit={handleSubmit} className=' text-lg'>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="bug"
              value="Bug"
              checked={options.includes('Bug')}
              onChange={() => handleOptionChange('Bug')}
            />
            <label htmlFor="bug" className="flex items-center text-cyan-800 cursor-pointer">
              <FaBug />
              <span className="ml-2">Bug</span>
            </label>
          </div>
          {options.includes('Bug') && (
            <div>
              <label htmlFor="bugDescription" className="text-cyan-800 block mb-2">Bug Description:</label>
              <textarea
                id="bugDescription"
                value={bugDescription}
                onChange={handleBugChange}
                className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring focus:ring-cyan-500"
              ></textarea>
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="feedbackOption"
              value="Feedback"
              checked={options.includes('Feedback')}
              onChange={() => handleOptionChange('Feedback')}
            />
            <label htmlFor="feedbackOption" className="flex items-center text-cyan-800 cursor-pointer">
              <FaComment />
              <span className="ml-2">Feedback</span>
            </label>
          </div>
          {options.includes('Feedback') && (
            <div>
              <label htmlFor="feedbackText" className="text-cyan-800 block mb-2">Feedback:</label>
              <textarea
                id="feedbackText"
                value={feedback}
                onChange={handleFeedbackChange}
                className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring focus:ring-cyan-500"
              ></textarea>
            </div>
          )}
        </div>
        <button type="submit" className="bg-cyan-600 text-white py-2 px-4 mt-4 rounded-md hover:bg-cyan-700 transition">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default Report;
