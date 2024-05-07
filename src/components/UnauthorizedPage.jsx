import React from 'react';
import { Link } from 'react-router-dom';
import error from '../assets/401.jpg'

function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      
      <div className="w-1/2 text-center">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
        <p className="text-lg text-gray-700 mb-8">
          You need to &nbsp;
          <Link to="/login" className="text-cyan-600 hover:text-cyan-700 hover:underline text-2xl transition duration-300" >
          login
          </Link>&nbsp;
           to access this page.
        </p>
        
      </div>
     
      <div className="w-1/2 px-8">
      <img
          src={error}
          alt="Unauthorized"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default UnauthorizedPage;
