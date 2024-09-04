import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaImage,
  FaUserPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { LinearGradient } from "react-text-gradients";
import PreviousLocation from "./utils/PreviousLocation";
import Navbar from "./Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Css/app.css";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, []);

  const handleChangeText = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleChangeFile = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fullname", fullname);
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    data.append("avatar", avatar);
    data.append("coverImage", coverPhoto);

    const postData = {
      email: email,
      password: password,
    };

    toast
      .promise(
        axios.post("/api/v1/user/register", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          pending: "Registering...",
          success: "Registration successful! 🎉",
          error: "Registration failed. Please try again.",
        }
      )
      .then(async () => {
        try {
          await axios.post("/api/v1/user/login", postData);
          const previousLocation = PreviousLocation.retrieve();
          navigate(previousLocation || "/");
          PreviousLocation.clear();
        } catch (error) {
          console.error(
            "Registered successfully, Error in logging in:",
            error.response.data
          );
        }
      })
      .catch((error) => {
        console.error("There was an error registering!", error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar showSignInButton={false} uploadbutton={false} />
      <div className="md:h-[89vh] h-auto md:flex">
        {/* Left Side - Background Image with Text */}
        <div
          className="hidden md:flex w-full h-full md:w-1/2 login_img_section justify-around items-center"
          data-aos="slide-left"
          data-aos-delay="200"
        >
          <div className="bg-cyan-600 opacity-20 inset-0 z-0"></div>
          <div className="w-full mx-auto px-10 flex-col items-center space-y-6">
            <h1 className="text-white font-bold text-3xl font-serif">
              Explore the <span className="text-cyan-400">World</span> of Videos
              with VidSphere
            </h1>
            <h4 className="text-cyan-200 font-extrabold mt-4 text-lg">
              Join our community to experience a whole new level of video
              engagement.
            </h4>
            <ul className="list-disc list-inside text-white mt-1 space-y-2 text-base">
              <span className="text-white text-base border-b-2 border-cyan-300 ">
                Why Register Here:
              </span>
              <li>
                Like, comment, and share your favorite videos effortlessly
              </li>
              <li>Maintain your personalized watch history for easy access</li>
              <li>
                Create and manage your own playlists for a customized experience
              </li>
              <li>Upload and showcase your videos to a wide audience</li>
              <li>
                Stay updated with your subscribed channels' latest content
              </li>
              <li>Get tailored recommendations based on your interests</li>
            </ul>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div
          className="flex flex-col items-center md:p-0  justify-center w-full md:w-1/2 md:mx-auto"
          data-aos="zoom-in-down"
          data-aos-delay="600"
        >
          <h3 className="text-center md:text-4xl sm:text-3xl text-xl font-bold text-cyan-400 md:mb-10 mt-4">
            Welcome to{" "}
            <LinearGradient
              gradient={["to left", "rgb(8 145 178) , white"]}
              fallbackColor="black"
            >
              VidSphere
            </LinearGradient>{" "}
            🚀
          </h3>
          <div className="nd:mt-8 mt-4 bg-gray-200 w-10/12 py-8 px-6 shadow sm:rounded-lg rounded-2xl">
            <form className="space-y-10" onSubmit={handleSubmit}>
              {/* Full Name and Username */}
              <div className="flex flex-col lg:flex-row lg:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <span className="text-red-600 font-extrabold">*</span>Full Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow">
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      autoComplete="name"
                      required
                      className="block w-full pr-10 md:h-auto h-8 p-2 border rounded-md"
                      value={fullname}
                      onChange={handleChangeText(setFullname)}
                    />
                    <FaUser className="absolute inset-y-2 right-0 pr-3 flex items-center pointer-events-none h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1 mt-4 lg:mt-0">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <span className="text-red-600 font-extrabold">*</span>Username
                  </label>
                  <div className="mt-1 relative rounded-md shadow">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      autoComplete="username"
                      required
                      className="block w-full pr-10 md:h-auto h-8 p-2 border rounded-md"
                      value={username}
                      onChange={handleChangeText(setUsername)}
                    />
                    <FaUser className="absolute inset-y-2 right-0 pr-3 flex items-center pointer-events-none h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Email and Password */}
              <div className="flex flex-col lg:flex-row lg:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <span className="text-red-600 font-extrabold">*</span>Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      required
                      className="block w-full pr-10 md:h-auto h-8 p-2 border rounded-md"
                      value={email}
                      onChange={handleChangeText(setEmail)}
                    />
                    <FaEnvelope className="absolute inset-y-2 right-0 pr-3 flex items-center pointer-events-none h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1 mt-4 lg:mt-0">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <span className="text-red-600 font-extrabold">*</span>Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      autoComplete="new-password"
                      required
                      className="block w-full md:h-auto h-8 pr-10 p-2 border rounded-md"
                      value={password}
                      onChange={handleChangeText(setPassword)}
                    />
                    <FaLock className="absolute inset-y-2 right-0 pr-3 flex items-center pointer-events-none h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Avatar and Cover Photo */}
              <div className="flex flex-col lg:flex-row lg:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <span className="text-red-600 font-extrabold">*</span>Avatar
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      required
                      className="block w-full text-sm md:h-auto text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                      onChange={handleChangeFile(setAvatar)}
                    />
                    <FaCamera className="absolute inset-y-2 right-0 pr-3 flex items-center pointer-events-none h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1 mt-4 lg:mt-0">
                  <label
                    htmlFor="coverPhoto"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cover Photo
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="file"
                      id="coverPhoto"
                      name="coverPhoto"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                      onChange={handleChangeFile(setCoverPhoto)}
                    />
                    <FaImage className="absolute inset-y-2 right-0 pr-3 flex items-center pointer-events-none h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full md:w-1/2 flex hover:text-black duration-300 items-center justify-center md:mt-0 mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
              >
                <FaUserPlus className="mr-2" />
                Register
              </button>
              </div>
            </form>

            {/* Already have an account? */}
            <p className="mt-6 text-center italic md:text-base text-sm text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-700 font-bold hover:text-cyan-600">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
