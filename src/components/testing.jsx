import React from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';

const TestingInfoBar = ({ message }) => {
  return (
    <div className="w-full bg-gradient-to-r from-yellow-200 via-amber-600 to-yellow-200 h-10 text-white flex items-center justify-center py-2 px-4 text-sm md:text-base">
      <RiErrorWarningLine className="mr-2 h-5 w-5" />
      <span>{message}</span>
    </div>
  );
};

export default TestingInfoBar;
