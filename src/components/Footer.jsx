// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" border-t-[1px] border-gray-800 text-white py-4 flex flex-col items-center">
      <div className="text-sm md:text-lg mb-4">
        © {new Date().getFullYear()} <span className='text-cyan-600'>VidSphere</span>. All rights reserved.
      </div>
      <div className="flex space-x-4">
      <a
          href="https://www.linkedin.com/in/rishabh-raj-875327282"
          className="text-gray-400 hover:text-blue-500 transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://github.com/rj225"
          className="text-gray-400 hover:text-black hover:bg-white transition-colors"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://facebook.com"
          className="text-gray-400 hover:text-blue-500 transition-colors"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com"
          className="text-gray-400 hover:text-black hover:bg-white transition-colors"
          aria-label="Twitter"
        >
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
