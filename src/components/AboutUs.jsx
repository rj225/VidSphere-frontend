import React, { useEffect } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaCommentDots,
  FaThumbsUp,
  FaHistory,
  FaVideo,
  FaFolderOpen,
  FaBell,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import heroimg from "../assets/AboutUs/video_influencer.png";
import mern from "../assets/AboutUs/mern.png";
import Seamless from "../assets/AboutUs/yt_tut.png";
import Playlist from "../assets/AboutUs/playlist.png";
import high from "../assets/AboutUs/taking selfie.png";
import Rishabh from "../assets/AboutUs/Rishabh.png";
import video from "../assets/AboutUs/video3.mp4";
import video1 from "../assets/AboutUs/video.mp4";
import bg from "../assets/AboutUs/bgnew2.png";
import bg1 from "../assets/AboutUs/bg13.jpg";
import minions from "../assets/AboutUs/minions.png";
import videoimg from "../assets/AboutUs/video.png";
import secure from "../assets/AboutUs/secure.png";
import bg5 from "../assets/AboutUs/bg5.jpg";
import { Link } from "react-router-dom";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="text-white w-full md:pt-0 pt-2 min-h-screen">
      {/* Hero Section */}
      <section
        className="flex flex-col md:flex-row md:min-h-[80vh] md:gap-x-8 items-center md:justify-between md:py-24 py-3 pb-5 px-3 md:px-16">
        <div data-aos="zoom-in" className="w-full md:h-96 md:w-7/12 md:mb-0 mb-8 flex flex-col">
          <h1 className="md:text-5xl text-xl font-bold text-cyan-100 md:mb-6 mb-3 text-left">
            Welcome to VidSphere
          </h1>

          <h3 className=" text-cyan-600 md:text-2xl text-sm font-bold italic md:mb-10 mb-4 mt-3">
            Stream &nbsp;.&nbsp; Manage &nbsp;.&nbsp; Enjoy
            {/* Your Ultimate Video Experience */}
          </h3>

          <p className="md:text-xl text-base max-w-3xl mb-8 text-white text-left">
            VidSphere is a modern video platform built with the MERN stack,
            providing smooth video streaming, easy content management, and an
            engaging user experience.
          </p>
          <button className="bg-cyan-600 text-white md:w-2/6 px-6 md:py-3 py-1 rounded-lg hover:bg-cyan-700">
            <Link to="/">Explore More</Link>
          </button>
        </div>
        <div
          data-aos="zoom-out-left"
          className="w-full md:w-5/12 hidden md:block h-96 bg-center shadow-left-top rounded-xl overflow-hidden mb-12"
        >
          <img src={heroimg} alt="" className="w-full h-full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden">
        <video
          className="absolute top-0 left-0 h-full w-full opacity-30 object-cover"
          autoPlay
          loop
          muted
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="md:py-16 py-8 bg-black bg-opacity-10">
          <h2
            className="md:text-4xl text-lg font-semibold text-center md:mb-16 mb-4 text-cyan-100"
            data-aos="fade-up"
          >
            Why Choose VidSphere?
          </h2>
          <div className="max-w-6xl md:space-y-28 mx-auto px-4">
            {/* Feature*/}
            <div
              className="flex flex-col md:flex-row items-center mb-12"
              data-aos="fade-up"
            >
              <div className="w-full md:w-2/6 mb-6 md:mb-0">
                <img
                  src={high}
                  alt="Feature 1"
                  className="rounded-lg shadow-left-top md:h-56 h-36 w-11/12"
                />
              </div>
              <div className="w-full md:w-4/6 md:pl-8">
                <h3 className="md:text-3xl text-base font-semibold text-cyan-400 mb-4">
                  High-Performance Video Streaming
                </h3>
                <p className="text-gray-300 md:text-xl text-sm">
                  VidSphere provides high-quality video streaming with minimal
                  buffering, ensuring a smooth and engaging experience for all
                  users. With adaptive streaming technology and a global content
                  delivery network (CDN), videos are delivered at the highest
                  quality based on your internet speed.
                </p>
              </div>
            </div>
            {/* Feature */}
            <div
              className="flex flex-col md:flex-row items-center mb-12"
              data-aos="fade-up"
            >
              <div className="w-full md:w-2/6 md:order-2 mb-6 md:mb-0">
                <img
                  src={Seamless}
                  alt="Feature 2"
                  className="rounded-lg shadow-left-top md:h-56 h-36 w-11/12"
                />
              </div>
              <div className="w-full md:w-4/6 md:pr-8">
                <h3 className="md:text-3xl text-base font-semibold text-cyan-400 mb-4">
                  Seamless User Interface
                </h3>
                <p className="text-gray-300 md:text-xl text-sm">
                  A sleek, responsive, and user-friendly interface that adapts
                  to all devices, making video browsing and viewing a pleasure.
                  VidSphere provides personalized recommendations, advanced
                  search options, and intuitive navigation for an optimal user
                  journey.
                </p>
              </div>
            </div>
            {/* Feature*/}
            <div
              className="flex flex-col md:flex-row items-center mb-12"
              data-aos="fade-up"
            >
              <div className="w-full md:w-2/6 mb-6 md:mb-0">
                <img
                  src={Playlist}
                  alt="Feature 1"
                  className="rounded-lg shadow-left-top md:h-56 h-36 w-11/12"
                />
              </div>
              <div className="w-full md:w-4/6 md:pl-8">
                <h3 className="md:text-3xl text-base font-semibold text-cyan-400 mb-4">
                  Extensive User Features
                </h3>
                <p className="text-gray-300 md:text-xl text-sm">
                  From subscribing to channels, commenting on videos, liking
                  content, maintaining watch history, creating playlists, and
                  managing your videos, VidSphere is equipped with all features
                  needed for an enriched user experience.
                </p>
              </div>
            </div>
            {/* Feature*/}
            <div
              className="flex flex-col md:flex-row items-center mb-12"
              data-aos="fade-up"
            >
              <div className="w-full md:w-2/6 md:order-2 mb-6 md:mb-0">
                <img
                  src={mern}
                  alt="Feature 2"
                  className="rounded-lg md:h-56 h-36 shadow-left-top w-11/12"
                />
              </div>
              <div className="w-full md:w-4/6 md:pr-8">
                <h3 className="md:text-3xl text-base font-semibold text-cyan-400 mb-4">
                  Built with MERN Stack
                </h3>
                <p className="text-gray-300 md:text-xl text-sm">
                  Leveraging MongoDB, Express.js, React, and Node.js to deliver
                  a fast, scalable, and robust video platform for modern needs.
                  This tech stack ensures VidSphere remains future-proof and
                  highly adaptable to new trends and technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="md:py-16 py-7 bg-cyan-900  bg-opacity-10">
        <h2
          className="md:text-3xl text-xl font-semibold text-center mb-8 text-cyan-400"
          data-aos="fade-up"
        >
          About the Creator
        </h2>
        <div className="flex flex-col items-center md:flex-row md:justify-center gap-8 px-4">
          <div
            className="md:w-64 md:h-64 w-32 h-32 rounded-full animate-bounce-slow bg-cyan-700 mb-4 md:mb-0"
            data-aos="zoom-in"
          >
            <img
              src={Rishabh}
              alt="Your Photo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="max-w-lg text-center md:text-left" data-aos="zoom-in">
            <h3 className="md:text-2xl text-lg font-bold text-white mb-2">Rishabh Raj</h3>
            <p className="text-gray-300 md:text-base text-sm mb-4">
              A <span className=" underline">full-stack developer</span> with
              expertise in the <span className="text-cyan-500">MERN</span>{" "}
              stack. I developed{" "}
              <span className="text-cyan-500">VidSphere</span> from scratch,
              building both the <span className="text-cyan-500">backend</span>{" "}
              and <span className="text-cyan-500">frontend</span> to create a
              seamless video streaming platform.
            </p>
            <div className="flex md:flex-row flex-col gap-4 w-full justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/in/rishabh-raj-875327282"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-cyan-600 px-4 py-2 md:justify-start justify-center rounded-full flex items-center gap-2 hover:bg-cyan-700"
              >
                <FaLinkedin /> Contact Me on LinkedIn
              </a>
              <a
                href="https://github.com/rj225"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-gray-800 hover:ring-1 md:justify-start justify-center  ring-cyan-800 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700"
              >
                <FaGithub /> View My GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="relative p-3 md:p-0 overflow-hidden">
        <video
          className="absolute top-0 left-0 h-full w-full opacity-30 object-cover"
          autoPlay
          loop
          muted
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="md:py-16 py-8">
          <h2
            className="md:text-3xl text-lg font-semibold text-center mb-8 text-cyan-400"
            data-aos="fade-up"
          >
            My Vision and Journey
          </h2>
          <div className="md:max-w-2xl mx-auto px-4">
            <Slider {...settings}>
              <div>
                <div
                  className="bg-cover bg-center h-64 rounded-xl"
                  style={{
                    backgroundImage: `url(${bg})`,
                  }}
                >
                  <div className="bg-black bg-opacity-50 h-full w-full flex md:flex-row flex-col-reverse items-center md:justify-center rounded-lg">
                    <div className="text-white md:w-3/4 h-1/2 w-full md:text-lg text-sm md:pt-0 pt-4 px-4">
                      "Transforming how you watch, share, and engage with video
                      content."
                    </div>
                    <div className="text-white md:w-1/4 md:pt-0 pt-4 h-1/2 w-full text-lg px-4">
                      <img
                        src={minions}
                        alt=""
                        className=" w-full h-full shadow-left-top rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="bg-cover bg-center h-64 rounded-xl"
                  style={{
                    backgroundImage: `url(${bg1})`,
                  }}
                >
                   <div className="bg-black bg-opacity-50 h-full w-full flex md:flex-row flex-col-reverse items-center md:justify-center rounded-lg">
                    <div className="text-white md:w-3/4 h-1/2 w-full md:text-lg text-sm md:pt-0 pt-4 px-4">
                      "Empowering creators and viewers through a seamless
                      digital experience."
                    </div>
                    <div className="text-white md:w-1/4 md:pt-0 pt-4 h-1/2 w-full text-lg px-4">
                      <img
                        src={secure}
                        alt=""
                        className=" w-full h-full shadow-left-top rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="bg-cover bg-center h-64 rounded-xl"
                  style={{
                    backgroundImage: `url(${bg5})`,
                  }}
                >
                 <div className="bg-black bg-opacity-50 h-full w-full flex md:flex-row flex-col-reverse items-center md:justify-center rounded-lg">
                    <div className="text-white md:w-3/4 h-1/2 w-full md:text-lg text-sm md:pt-0 pt-4 px-4">
                      "Innovating with the MERN stack to deliver superior
                      performance."
                    </div>
                    <div className="text-white md:w-1/4 md:pt-0 pt-4 h-1/2 w-full text-lg px-4">
                      <img
                        src={videoimg}
                        alt=""
                        className=" w-full h-full shadow-left-top rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>

      {/* Functionalities Section */}
      <section className="md:py-32 p-8">
        <h2
          className="md:text-3xl text-lg font-semibold text-center md:mb-16 mb-8 text-cyan-400"
          data-aos="zoom-in"
        >
          Feature Highlights
        </h2>
        <div className="md:max-w-6xl max-w-xl mx-auto md:px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            className="flex flex-col items-center bg-gray-900 bg-opacity-60 p-6 rounded-lg shadow-lg"
            data-aos="flip-right"
          >
            <FaBell className="text-cyan-400 md:text-5xl text-3xl mb-4" />
            <h3 className="md:text-xl text-base font-semibold mb-2 text-cyan-400">
              Notifications
            </h3>
            <p className="text-gray-300 md:text-base text-xs text-center">
              Stay updated with the latest videos and updates from your
              subscribed channels.
            </p>
          </div>
          {/* Card 2 */}
          <div
            className="flex flex-col items-center bg-gray-900 bg-opacity-60 p-6 rounded-lg shadow-lg"
            data-aos="flip-up"
          >
            <FaCommentDots className="text-cyan-400 md:text-5xl text-3xl mb-4" />
            <h3 className="md:text-xl text-base font-semibold mb-2 text-cyan-400">Engage</h3>
            <p className="text-gray-300 md:text-base text-xs text-center">
              Comment, like, and share your thoughts on videos and engage with
              the community.
            </p>
          </div>
          {/* Card 3 */}
          <div
            className="flex flex-col items-center bg-gray-900 bg-opacity-60 p-6 rounded-lg shadow-lg"
            data-aos="flip-left"
          >
            <FaFolderOpen className="text-cyan-400 md:text-5xl text-3xl mb-4" />
            <h3 className="md:text-xl text-base font-semibold mb-2 text-cyan-400">
              Organize
            </h3>
            <p className="text-gray-300 md:text-base text-xs text-center">
              Manage your playlists and keep your favorite videos organized
              effortlessly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
