import React from 'react';
import './Footer.css';
import jcu_logo from './assets/jcu_logo.png';

// Social media icons (replace with your own image paths)
import facebookIcon from '/assets/facebook.png';
import linkedinIcon from './assets/linkedin.png';
import tiktokIcon from './assets/tiktok.png';
import xIcon from './assets/x.png';
import instagramIcon from './assets/instagram.png';
import youtubeIcon from './assets/youtube.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footerTop">
        <img src={jcu_logo} alt="John Carroll University logo" className="footerImage" />
        <a href="https://www.jcu.edu/" target="_blank" rel="noopener noreferrer" className="jcuLink">
          Visit jcu.edu
        </a>
        <p>&copy; For inquiries, contact otapiaduenas@jcu.edu.</p>
      </div>

      <div className="socialSection">
        <h3>Stay Connected with JCU</h3>
        <div className="socialIcons">
          <a href="https://www.facebook.com/JCU1886" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" className="socialIcon" />
          </a>

          <a href="https://www.linkedin.com/school/john-carroll-university/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" className="socialIcon" />
          </a>

          <a href="https://www.tiktok.com/@johncarrolluniversity" target="_blank" rel="noopener noreferrer">
            <img src={tiktokIcon} alt="TikTok" className="socialIcon" />
          </a>

          <a href="https://x.com/johncarrollu" target="_blank" rel="noopener noreferrer">
            <img src={xIcon} alt="X (Twitter)" className="socialIcon" />
          </a>

          <a href="https://www.instagram.com/johncarrollu/" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" className="socialIcon" />
          </a>

          <a href="https://www.youtube.com/user/JohnCarrollU" target="_blank" rel="noopener noreferrer">
            <img src={youtubeIcon} alt="YouTube" className="socialIcon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;