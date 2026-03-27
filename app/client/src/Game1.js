import React, { useState } from 'react';
import './Game1.css';

const CATEGORIES = [
  "animal", "verb", "food_and_drink", "color", "adjective",
  "family", "body_part", "clothing", "building", "weather"
];

const DISPLAY_LABELS = {
  animal: "Animal",
  verb: "Verb",
  food_and_drink: "Food or Drink",
  color: "Color",
  adjective: "Adjective",
  family: "Family Member",
  body_part: "Body Part",
  clothing: "Clothing Item",
  building: "Building",
  weather: "Weather"
};

export default function Game1() {
  const [answers, setAnswers] = useState({});
  const [story, setStory] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (category, value) => {
    setAnswers(prev => ({ ...prev, [category]: value }));
    setErrors(prev => ({ ...prev, [category]: null }));
  };

  const handleGenerate = async () => {
    // Basic client-side check: all fields filled
    const newErrors = {};
    CATEGORIES.forEach(cat => {
      if (!answers[cat] || answers[cat].trim() === '') {
        newErrors[cat] = 'Please enter a word';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setStory(null);
    setErrors({});

    const responses = CATEGORIES.map(cat => ({
      category: cat,
      word: answers[cat].trim()
    }));

    try {
      const res = await fetch('/api/games/game1/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: 'en', responses })
      });

      const data = await res.json();

      if (!data.ok) {
        // Map backend errors back to fields
        const backendErrors = {};
        data.errors?.forEach(err => {
          if (err.categoryId) backendErrors[err.categoryId] = err.message;
        });
        setErrors(backendErrors);
      } else {
        setStory(data.stories);
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      console.error('Error details:', err.message, err.stack);
      setErrors({ general: 'Something went wrong. Please try Again.' });
        } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setStory(null);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="page">

      {!submitted ? (
        <>
          <div className="rules-card">
            <h2>Game Rules</h2>
            <p className="subtitle">Objective:</p>
            <p>Enter a Spanish word for each category to build a randomized story.</p>
            <p className="subtitle">How to Play:</p>
            <p>For each prompt, type a Spanish word that fits the category, then hit Generate.</p>
          </div>

          <hr className="divider" />

          <div className="game-card">
            <div className="category-bar">
              <span>Category:</span>
              <span className="category">Spanish Words</span>
            </div>

            {errors.general && (
              <p className="error-general">{errors.general}</p>
            )}

            <div className="prompt-list">
              {CATEGORIES.map(cat => (
                <div className="prompt-row" key={cat}>
                  <span className="prompt">{DISPLAY_LABELS[cat]}</span>
                  <div className="input-wrapper">
                    <input
                      className={`answer ${errors[cat] ? 'input-error' : ''}`}
                      type="text"
                      placeholder="Spanish word..."
                      value={answers[cat] || ''}
                      onChange={e => handleChange(cat, e.target.value)}
                    />
                    {errors[cat] && (
                      <span className="error-msg">{errors[cat]}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="generate-btn"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </>
      ) : (
        <div className="story-card">
          <h2>Your Story</h2>

          <div className="story-block">
            <p className="story-label">Mixed (English + Spanish)</p>
            <p className="story-text">{story.mixed.text}</p>
          </div>

          <div className="story-block">
            <p className="story-label">Full Immersion (Spanish)</p>
            <p className="story-text">{story.immersion.text}</p>
          </div>

          <button className="generate-btn" onClick={handleReset}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}