import React from 'react';

// DarkModeToggle component: A toggle switch for switching between dark mode and light mode
const DarkModeToggle = ({ darkMode, setDarkMode }) => {

  // Function to handle the toggle switch
  const handleToggle = () => {
    // Toggles the dark mode state
    setDarkMode(!darkMode);
  };

  return (
    // A container for the toggle switch, positioned fixed at the bottom-right corner with a high z-index
    <div className="fixed bottom-4 right-4 z-10">
      <div
        // The main toggle switch, with dynamic classes based on the darkMode state
        onClick={handleToggle}
        className={`cursor-pointer relative w-20 h-10 rounded-full flex items-center p-1 transition duration-300 ease-in-out ${darkMode ? 'bg-dark-400' : 'bg-light-400'}`}
      >
        <div
          // The draggable part of the switch, also with dynamic classes for smooth transition
          className={`absolute w-8 h-8 bg-white rounded-full shadow-md transform transition duration-300 ease-in-out ${darkMode ? 'translate-x-10' : 'translate-x-0'}`}
        ></div>
      </div>
    </div>
  );
};

export default DarkModeToggle;
