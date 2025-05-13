import React, { useState, useEffect, useRef } from 'react';
import './Game1Play.css';
import { useLanguage } from './LanguageContext';
import text from './data.json';

function Game1Play() {
  const { currentLanguage } = useLanguage();
  const [inputWord, setInputWord] = useState('');
  const gameWindowRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the word submission logic here
    console.log("Submitted word:", inputWord);
    setInputWord('');
  };

  return (
    <div className="game1PlayContainer">
      <div className="gameHeader">
        <h2>{text[currentLanguage].game1.name}</h2>
        <div className="gameScore">
          <span>{text[currentLanguage].game1.score}: 0</span>
        </div>
      </div>
      
      <div className="gameWindow" ref={gameWindowRef}>
        {/* This is where falling words will appear */}
      </div>
      
      <form className="inputArea" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          placeholder={text[currentLanguage].game1.placeholder}
          autoFocus
        />
        <button type="submit">
          {text[currentLanguage].game1.submit}
        </button>
      </form>
    </div>
  );
}

export default Game1Play;
