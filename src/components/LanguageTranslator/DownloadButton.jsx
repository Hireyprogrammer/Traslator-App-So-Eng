import React from 'react';
import downloadIcon from '../../assets/icons/cloud-download.png'; // Correct path to the download icon

// DownloadButton component definition
const DownloadButton = ({ onClick, disabled }) => {
  return (
    // Button element with dynamic classes based on 'disabled' prop
    <button
      onClick={onClick} // Event handler for click event
      disabled={disabled} // Disables the button if 'disabled' prop is true
      className={`flex items-center gap-2 px-4 py-2 rounded-full ${
        disabled 
          ? 'bg-gray-400 cursor-not-allowed' // Styles for disabled state
          : 'bg-gray-200 dark:bg-gray-700 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-500 dark:hover:bg-blue-600' // Styles for enabled state
      }`}
    >
      {/* Button text with dynamic color based on 'disabled' prop */}
      <span className={`text-sm font-medium ${
        disabled 
          ? 'text-gray-600' // Text color for disabled state
          : 'text-gray-800 dark:text-gray-200' // Text color for enabled state
      }`}>
        Download
      </span>
      {/* Download icon with dynamic filter based on 'disabled' prop */}
      <img src={downloadIcon} alt="Download Icon" className={`w-6 h-6 ${
        disabled 
          ? 'filter grayscale' // Grayscale filter for disabled state
          : '' // No filter for enabled state
      }`} />
    </button>
  );
};

export default DownloadButton; // Exporting the component
