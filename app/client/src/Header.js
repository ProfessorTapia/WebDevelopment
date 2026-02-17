import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { useLanguage } from './LanguageContext';
import text from './data.json';

import bunnyLogo from './assets/logo-noBackground.png'; // ✅ your image

function Header() {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const location = useLocation();
  
  const createLink = (path) => {
    const params = new URLSearchParams(location.search);
    const langParam = currentLanguage === 'english' ? 'en' : 'es';
    params.set('language', langParam);
    return `${path}?${params.toString()}`;
  };

  return (
    <div className="navbarContainer">
      <nav className="navbar">

{/* ⭐ GROUP LOGO + SLIDER TOGETHER */}
<div className="leftGroup">
  <div className="logoContainer">
    <img src={bunnyLogo} alt="Logo" className="logoImage" />
  </div>

  <div
    className={`languageToggleSlider ${
      currentLanguage === 'spanish' ? 'active' : ''
    }`}
    onClick={toggleLanguage}
  >
    <div className="slider-button"></div>
    <span className="label left">English</span>
    <span className="label right">Español</span>
  </div>
</div>

<ul className="navbarList">
  <li><Link to={createLink("/home")}>{text[currentLanguage].header.home}</Link></li>
  <li><Link to={createLink("/game1")}>{text[currentLanguage].header.game1}</Link></li>
  <li><Link to={createLink("/game2")}>{text[currentLanguage].header.game2}</Link></li>
  <li><Link to={createLink("/MissionStatement")}>{text[currentLanguage].header.missionStatement}</Link></li>
</ul>

</nav>

    </div>
  );
}

export default Header;
