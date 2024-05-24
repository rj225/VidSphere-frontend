import React from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';

const TestingInfoBar = ({ message }) => {
  return (
    <div className="w-full bg-yellow-500 text-white flex items-center justify-center py-2 px-4 text-sm md:text-base">
      <RiErrorWarningLine className="mr-2 h-5 w-5" />
      <span>{message}</span>
    </div>
  );
};

export default TestingInfoBar;
