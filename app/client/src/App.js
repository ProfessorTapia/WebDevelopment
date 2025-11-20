// App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';

import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import MissionStatement from './MissionStatement';
import Game1 from './Game1'
import Game1Play from './Game1Play'
import Game2 from './Game2'

function App() {

  const [currentLanguage, setCurrentLanguage] = React.useState("english"); // This will be set based on user selection
  
  const switchLanguage = () => {
    setCurrentLanguage((prevLanguage) => (prevLanguage === "english" ? "spanish" : "english"));
  };

  return (
    <Router>
      <LanguageProvider>
        <div className="appContainer">
          <Header currentLanguage={currentLanguage} toggleLanguage={switchLanguage} />
          <main className="mainContent">
            <Routes>
              <Route path="/" element={<Navigate to="/Home" replace />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Game1" element={<Game1 />} />
              <Route path="/Game1/play" element={<Game1Play />} />
              <Route path="/Game2" element={<Game2 />} />
              <Route path="/MissionStatement" element={<MissionStatement />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
