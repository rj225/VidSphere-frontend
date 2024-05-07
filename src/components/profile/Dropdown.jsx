import { all } from 'axios';
import React, { useRef, useState } from 'react';

function Dropdown() {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsOpen(false);
//     }
//   };

//   // Attach click event listener to document to close dropdown when clicked outside
//   React.useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

  return (
    <>
    {/* <div className="dropdown bg-white text-center" ref={dropdownRef}>
      <button onClick={toggleDropdown}>Toggle Dropdown</button>
      {isOpen && (
        <div className="dropdown-content bg-white text-center" style={{ transition: 'all 3s ease-in', display: isOpen ? 'block' : 'hidden', overflow: 'hidden' }}>
          <p>Dropdown content goes here</p>
        </div>
      )}
      </div> */}
<br /><br /><br /><br /><br /> 

    </>
  );
}

export default Dropdown;
