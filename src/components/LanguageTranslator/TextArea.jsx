import React from 'react';

const TextArea = ({ value, onChange, placeholder, readOnly, darkMode }) => {
  return (
    <div className="text-area relative flex-grow"> {/* Container for the textarea */}
      <textarea
        className={`w-full p-4 my-2 bg-transparent resize-none outline-none border ${
          darkMode 
            ? 'border-dark-300 text-light-100 placeholder-light-400' // Styles for dark mode
            : 'border-light-300 text-dark-900 placeholder-dark-400' // Styles for light mode
        } font-medium h-full`}
        cols="30" // Number of columns
        rows="10" // Number of rows
        placeholder={placeholder} // Placeholder text
        value={value} // Value of the textarea
        onChange={onChange} // Event handler for change event
        readOnly={readOnly} // Read-only state
      ></textarea>
      {!readOnly && ( // Character count only displayed when not read-only
        <div className={`chars absolute bottom-0 right-0 p-2 text-xs ${
          darkMode 
            ? 'text-light-300' // Character count color in dark mode
            : 'text-dark-400' // Character count color in light mode
        }`}>
          <span>{value.length}</span> / 5000 {/* Display the number of characters and max limit */}
        </div>
      )}
    </div>
  );
};

export default TextArea; // Exporting the component
