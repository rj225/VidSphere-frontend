import React, { useState, useEffect } from "react";
import { HiArrowNarrowUp } from "react-icons/hi"; // Importing the icon

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) { // Show button after scrolling down 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to the top smoothly when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-opacity-50 bg-cyan-500 text-white shadow-md hover:bg-cyan-600 transition duration-300"
      >
        <HiArrowNarrowUp size={24} /> {/* Using the icon */}
      </button>
    )
  );
};

export default BackToTopButton;
