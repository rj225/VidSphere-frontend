import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo1.png";
import { RiAccountCircleFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";

function Navtest({ showSignInButton = true }) {
  return (
    <>
      <nav className="bg-cur font-serif w-full z-10">
        <div className="flex items-center md:w-screen md:pr-1 md:h-24 justify-between">
          {/* <!-- Logo --> */}
          <div className="md:flex md:justify-center md:items-center h-full md:w-2/12">
            <Link to="/" className="cursor-pointer">
              <img src={logo} alt="logo" className="md:h-20 " />
            </Link>
          </div>

          {/* <!-- Search Bar --> */}
          <div className="md:w-7/12 md:flex justify-center">
            <input
              type="text"
              placeholder="Search"
              className="w-3/4 py-2 px-4 rounded-tl-full hidden md:block rounded-bl-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            />
            <RiSearchLine className="text-gray-400  bg-gray-800 h-full w-11 md:rounded-tr-full border-l-[0.1px] hover:bg-white hover:transition-all hover:bg-opacity-15 border-gray-700 cursor-pointer p-2 md:rounded-br-full " />
          </div>

          <div className="md:flex justify-center items-center md:w-3/12 p-1">
            {showSignInButton ? (
              <Link to="/login">
                <div className="justify-center flex hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-center  px-2 py-1 rounded-2xl text-cyan-500 ring-[1px] ring-cyan-700 transition duration-300 hover:ring-1 hover:ring-cyan-300 hover:shadow-3xl">
                    <h3 className="text-3xl">
                      <RiAccountCircleFill />
                    </h3>
                    <span className="text-base mx-2">Sign In</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="justify-center flex cursor-pointer">
                <div className="flex items-center justify-center px-2 py-1 rounded-2xl ring-[1px] ring-cyan-700 text-cyan-500 transition duration-300 hover:ring-1 hover:ring-cyan-300 hover:shadow-3xl">
                  <h3 className="text-3xl ">
                    <BiSupport/>
                  </h3>
                  <span className="text-base mx-2 cursor-pointer">Need Help?</span>
                
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navtest;
