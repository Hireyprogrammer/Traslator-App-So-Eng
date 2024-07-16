import React from 'react';
import downloadIcon from '../../assets/icons/cloud-download.png'; // Correct path to the download icon

// DownloadButton component with onClick handler and disabled state
const DownloadButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick} // Event handler for button click
      disabled={disabled} // Disables button if 'disabled' is true
      className={`flex items-center gap-2 px-4 py-2 rounded-full ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-700 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-500 dark:hover:bg-blue-600'}`} // Conditional styling based on 'disabled' prop
    >
      <span className={`text-sm font-medium ${disabled ? 'text-gray-600' : 'text-gray-800 dark:text-gray-200'}`}>Download</span> // Conditional text styling
      <img src={downloadIcon} alt="Download Icon" className={`w-6 h-6 ${disabled ? 'filter grayscale' : ''}`} /> // Conditional image styling based on 'disabled' prop
    </button>
  );
};

export default DownloadButton;
