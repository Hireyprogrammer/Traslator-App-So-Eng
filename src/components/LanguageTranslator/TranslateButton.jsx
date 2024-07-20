import React from 'react';

const TranslateButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick} // Event handler for click event
      className="mt-4 px-8 py-4 rounded-full bg-blue-500 text-white text-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
    >
      Translate
    </button>
  );
};

export default TranslateButton; 
