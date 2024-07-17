import React, { useState } from 'react';
import internetIcon from '../../assets/icons/internet.png'; // Correct path to the icon

const LanguageDropdown = ({ language, setLanguage, options, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className="flex items-center justify-between p-4 rounded-full bg-gray-200 dark:bg-dark-400 cursor-pointer transition duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={internetIcon} alt="Language Icon" className="w-6 h-6 mr-2" />
        <span className="selected text-left flex-1 ml-4 text-gray-800 dark:text-light-200" data-value={language}>
          {options.find((opt) => opt.value === language)?.label || 'Select Language'}
        </span>
        <ion-icon name="chevron-down-outline" className="text-gray-600 dark:text-gray-400"></ion-icon>
      </div>
      {isOpen && (
        <ul className="absolute top-full left-0 w-full max-h-48 overflow-auto p-4 bg-gray-200 dark:bg-dark-400 rounded-b-lg shadow-lg z-10">
          {options.map((opt) => (
            <li
              key={opt.value}
              className="option py-2 px-4 rounded-lg cursor-pointer border-b border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 ease-in-out text-left text-gray-800 dark:text-light-200"
              onClick={() => {
                setLanguage(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;
