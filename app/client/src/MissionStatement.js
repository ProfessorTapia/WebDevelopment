import React from 'react';
import './MissionStatement.css';
import ava from './assets/brunerHeadshot.jpg';
import chelsea from './assets/calalbHeadshot.pdf';
import sophia from './assets/colonelloHeadshot.png';
import yoni from './assets/sabagHeadshot.webp';
import riley from './assets/mcgintyHeadshot.jpg';
import tad from './assets/salwanHeadshot.jpeg';
import thomas from './assets/richardsonHeadshot.jpeg';
import { useLanguage } from './LanguageContext';
import text from './data.json'
function MissionStatement() {
    const { currentLanguage, toggleLanguage, setCurrentLanguage } = useLanguage(); 
    return(
        <div className="missionStatementPage">
            <h1>{text[currentLanguage].missionPage.missionStatementHeader}</h1>
            <p>
            {text[currentLanguage].missionPage.missionStatement}
            </p>

            <h2>{text[currentLanguage].missionPage.advisory}</h2>
            <ul>
                <li>Dr. Osvaldo Tapia-Duenas</li>
                <li>Chelsea Calalb</li>
            </ul>

            <h2>{text[currentLanguage].missionPage.frontEndTeam}</h2>
            <ul>
                <li>
                    <img src={ava} alt="Ava Bruner" className="missionStatementPhotos" />
                    <p><strong>Ava Bruner</strong> {text[currentLanguage].missionPage.ava}</p>
                </li>
                <li>
                    <img src={tad} alt="Thaddeus Salwan" className="missionStatementPhotos" />
                    <p><strong>Thaddeus Salwan</strong> {text[currentLanguage].missionPage.Thaddeus}</p>
                </li>
                <li>
                    <img src={thomas} alt="Thomas Richardson" className="missionStatementPhotos" />

                <p><strong>Thomas Richardson III</strong> {text[currentLanguage].missionPage.Thomas}</p>
                </li>
            </ul>
            
            <h2>
                {text[currentLanguage].missionPage.backEndTeam}
            </h2>
            <ul>
                <li>
                    <img src={sophia} alt="Sophia Colonello" className="missionStatementPhotos" />
                    <p><strong>Sophia Cononello </strong>{text[currentLanguage].missionPage.sophia}</p>

                </li>
                <li>
                    <img src={yoni} alt="Yoni Sabag" className="missionStatementPhotos" />
                    <p><strong>Yoni Sabag</strong> {text[currentLanguage].missionPage.yoni}</p>
                </li>
                <li>
                    <img src={riley} alt="Riley McGinty" className="missionStatementPhotos" />
                    <p><strong>Riley McGinty</strong> {text[currentLanguage].missionPage.riley}</p>
                </li>
            </ul>
        </div>
    )
}

export default MissionStatement;