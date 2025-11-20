import './MissionStatement.css';
import ava from './assets/brunerHeadshot.jpg';
import chelsea from './assets/calalbHeadshot.pdf';
import sophia from './assets/colonelloHeadshot.png';
import yoni from './assets/sabagHeadshot.webp';
import riley from './assets/mcgintyHeadshot.jpg';
import tad from './assets/salwanHeadshot.jpeg';
import thomas from './assets/richardsonHeadshot.jpeg';
import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext'; 
import text from './data.json';

function MissionStatement() {

    const navigate = useNavigate();
  const { currentLanguage, toggleLanguage, setCurrentLanguage } = useLanguage(); 
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    // REMOVE this line completely for now:
    // const hasSelectedLanguage = localStorage.getItem('languageSelected');
  
    setShowModal(true); // Force it to always show
  }, []);



  const handleLanguageSelect = (language) => {
    setCurrentLanguage(language); 
    setShowModal(false);
    localStorage.setItem('languageSelected', 'true');
  };


    return(
        <div className="missionStatementPage">
            <h1 className="MissionTitle">{text[currentLanguage].Mission.MissionTitle}</h1>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            <p>
            This webpage was made to make learning Spanish & English a fun experience for kids! Through these interactive games, kids and people of all ages can build their understanding of a language while having a good time. Our mission is to create a playful learning environment, while still encouraging curiosity and confidence in a new language. By intertwining education with entertainment, this project entices kids to explore bilingualism in a way that makes you feel like you’re playing, not work!
            </p>
=======
            <p className="MissionTitle">{text[currentLanguage].Mission.MissionTitle} </p>
>>>>>>> Stashed changes
=======
            <p className="MissionTitle">{text[currentLanguage].Mission.MissionTitle} </p>
>>>>>>> Stashed changes

            <h2 className="MissionTitle">{text[currentLanguage].Mission.AD} </h2>
            <ul>
                <li>Dr. Osvaldo Tapia-Duenas</li>
                <li>Chelsea Calalb</li>
            </ul>

            <h2>Our Front End Team</h2>
            <ul>
                <li>
                    <img src={ava} alt="Ava Bruner" className="missionStatementPhotos" />
                    <p><strong>Ava Bruner</strong> is majoring in Computer Science, and has gained extensive experience with a variety of programming languages and tools 
                    including SQL, Java, Python, HTML, and CSS. Currently, she is serving JCU at 
                    the IT Service Desk as a Hardware Technician, and Cleveland Clinic as a Software Development Intern. 
                    These experiences equip her with the technical knowledge and organizational skills needed to efficiently lead a dev-team to build a successful educational website.
                    After graduation in May 2025, she will be working at Union Home Mortgage Corp. as an IT Project Coordinator and working towards her CompTIA A+ certification.</p>
                </li>
                <li>
                    <img src={tad} alt="Thaddeus Salwan" className="missionStatementPhotos" />
                    <p><strong>Thaddeus Salwan</strong> is a third year Computer Science student at John Carroll University. He is also minoring in both Business and Data Science.
                    He has experience in programming languages such as Python, Java, HTML, CSS, and SQL. During the Summer of 2025 he will be working at Sherwin Williams
                    as an IT Intern.</p>
                </li>
                <li>
                    <img src={thomas} alt="Thomas Richardson" className="missionStatementPhotos" />

                <p><strong>Thomas Richardson III</strong> is a Junior Computer Science major and Philosophy minor at John Carroll University. He has experience with different coding 
                languages like Python, Java, and HTML, with some added experience with Data Science subjects. He is a football player at JCU and is involved in various organizations.</p>
                </li>
            </ul>
            
            <h2>
                Our Back End Team
            </h2>
            <ul>
                <li>
                    <img src={sophia} alt="Sophia Colonello" className="missionStatementPhotos" />
                    <p><strong>Sophia Colonello</strong> is a senior Computer Science major and Data Science minor at John Carroll Unviersity. She has been a TA/Grader for the MCDS Department the past four years, been involved
                    in the COMAP Math Modeling Competition for two years, and was involved in undergraduate research of The Mechanisms of Weight Transformations in Black Box Neural Networks her senior year. Her professional experience within software development as an Applied Technology Intern at PGT Trucking Inc.,
                    and data analytics experience as a Data Analyst Intern at MSA Safety has provided a variety of technical learning opportunities. She has experience with languages such as Java, JavaScript/Typescript, Python, and SQL, and other technologies such as GitHub, Copilot, Postman, and Power BI.</p>
                </li>
                <li>
                    <img src={yoni} alt="Yoni Sabag" className="missionStatementPhotos" />
                    Yoni Sabag</li>
                <li>
                    <img src={riley} alt="Riley McGinty" className="missionStatementPhotos" />
                    <p><strong>Riley McGinty</strong> is a second year Computer Science major, with a minor in Economics, at John Carroll University. He has expereince in programming
                    with Python, Java, Javascript, and SQL. He is a Resident Assitant and Student Worker at JCU, as well as being involved in multiple organizations.</p>
                </li>
            </ul>
        </div>
    )
}

export default MissionStatement;
