import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mammoth from 'mammoth';
import DarkModeToggle from './DarkModeToggle';
import LanguageDropdown from './LanguageDropdown';
import TextArea from './TextArea';
import TranslateButton from './TranslateButton';
import DownloadButton from './DownloadButton';
import swapIcon from '../../assets/icons/swap-icon.png'; // Correct path to the swap icon

const LanguageTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('so'); // Somali
  const [targetLanguage, setTargetLanguage] = useState('en'); // English
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  // Function to handle translation
  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate.');
      return;
    }
    try {
      console.log('Translating text:', inputText);
      const response = await axios.post(
        process.env.REACT_APP_API_URL,
        [{ Text: inputText }],
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
          },
          params: {
            to: targetLanguage,
            from: sourceLanguage,
          },
        }
      );
      console.log('API response:', response.data);
      if (response.data && response.data[0] && response.data[0].translations && response.data[0].translations[0]) {
        setTranslatedText(response.data[0].translations[0].text);
      } else {
        setError('Translation API response is not as expected.');
      }
    } catch (error) {
      console.error('Error translating text:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        setError(`Error: ${error.response.data.message || 'Unable to translate text'}`);
      } else if (error.request) {
        console.error('Request data:', error.request);
        setError('Error: No response received from translation API');
      } else {
        console.error('Error message:', error.message);
        setError(`Error: ${error.message}`);
      }
    }
  };

  // Function to swap source and target languages
  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setTranslatedText('');
    setInputText('');
  };

  // Function to handle language changes and prevent source and target from being the same
  const handleLanguageChange = (setter, value) => {
    if (setter === setSourceLanguage && value === targetLanguage) {
      setTargetLanguage(sourceLanguage);
    } else if (setter === setTargetLanguage && value === sourceLanguage) {
      setSourceLanguage(targetLanguage);
    }
    setter(value);
  };

  // Function to limit the number of words
  const limitWords = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ');
    }
    return text;
  };

  // Function to handle file selection and read its content
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      if (file.name.endsWith('.docx')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          mammoth.extractRawText({ arrayBuffer: e.target.result })
            .then((result) => {
              const limitedText = limitWords(result.value, 200);
              setInputText(limitedText);
              setError('');
            })
            .catch((err) => {
              setError('Error reading DOCX file');
              setInputText('');
            });
        };
        reader.onerror = () => {
          setError('Error reading file');
          setInputText('');
        };
        reader.readAsArrayBuffer(file);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const limitedText = limitWords(e.target.result, 200);
          setInputText(limitedText);
          setError('');
        };
        reader.onerror = () => {
          setError('Error reading file');
          setInputText('');
        };
        reader.readAsText(file);
      }
    } else {
      setError('No file selected');
      setInputText('');
    }
  };

  // Function to remove selected file and reset state
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setInputText('');
    setTranslatedText('');
    setError('');
  };

  // Function to handle download of translated text
  const handleDownload = () => {
    if (translatedText) {
      const blob = new Blob([translatedText], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'translated_text.txt';
      link.click();
    }
  };

  const languageOptions = [
    { value: 'so', label: 'Somali' },
    { value: 'en', label: 'English' },
  ];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-dark-200 text-light-100' : 'bg-light-100 text-dark-900'}`}>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container mx-auto flex flex-col lg:flex-row gap-4 items-stretch w-full p-4">
        <div className={`card flex-1 p-4 rounded-lg ${darkMode ? 'bg-dark-300' : 'bg-light-200'} shadow-lg flex flex-col`}>
          <div className="from flex items-center space-x-4 mb-4">
            <span className={`text-sm font-semibold ${darkMode ? 'text-light-300' : 'text-dark-600'}`}>From :</span>
            <LanguageDropdown
              language={sourceLanguage}
              setLanguage={(value) => handleLanguageChange(setSourceLanguage, value)}
              options={languageOptions}
              label="From :"
            />
          </div>
          <TextArea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here"
            darkMode={darkMode}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>

        <div className="center relative my-4 lg:my-0 flex items-center justify-center">
          <div
            className="swap-position flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
            onClick={handleSwapLanguages}
          >
            <img src={swapIcon} alt="Swap Languages" className="w-6 h-6" style={{ backgroundColor: 'white', borderRadius: '50%' }} />
          </div>
        </div>

        <div className={`card flex-1 p-4 rounded-lg ${darkMode ? 'bg-dark-300' : 'bg-light-200'} shadow-lg flex flex-col`}>
          <div className="to flex items-center space-x-4 mb-4">
            <span className={`text-sm font-semibold ${darkMode ? 'text-light-300' : 'text-dark-600'}`}>To :</span>
            <LanguageDropdown
              language={targetLanguage}
              setLanguage={(value) => handleLanguageChange(setTargetLanguage, value)}
              options={languageOptions}
              label="To :"
            />
          </div>
          <TextArea
            value={translatedText}
            readOnly
            placeholder="Translated text will appear here"
            darkMode={darkMode}
          />
          <div className="card-bottom flex flex-col items-center justify-center pt-4 mt-auto">
            <p className={`mb-4 ${darkMode ? 'text-light-300' : 'text-dark-600'}`}>Download as a document!</p>
            <DownloadButton onClick={handleDownload} disabled={!translatedText} />
          </div>
        </div>
      </div>
      <TranslateButton onClick={handleTranslate} />
    </div>
  );
};

export default LanguageTranslator;
