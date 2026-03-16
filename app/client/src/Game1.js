import React from 'react';
import './Game1.css';  
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext'; 
import text from './data.json';


export default function Game1() {
  const prompts = [
    "Animal",
    "Color",
    "Fruit",
    "Country",
    "Sport",
    "Vehicle",
    "Emotion",
    "Tool",
    "Beverage",
    "Flower"
  ];

  return (
    <div className="page">

      <div className="rules-card">
        <h2>Game Rules</h2>

        <p className="subtitle">Objective:</p>
        <p>Match the Prompt with a word that matched</p>

        <p className="subtitle">How to Play:</p>
        <p>For each prompt type a word that fits the prompt</p>
      </div>

      <hr className="divider"/>

      <div className="game-card">

        <div className="category-bar">
          <span>Category :</span>
          <span className="category">Subjects</span>
        </div>

        <div className="prompt-list">
          {prompts.map((prompt, index) => (
            <div className="prompt-row" key={index}>
              <span className="prompt">{prompt}</span>
              <input className="answer" type="text"/>
            </div>
          ))}
        </div>

        <button className="generate-btn">Generate</button>

      </div>
    </div>
  );
}


