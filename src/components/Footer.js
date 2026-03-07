import React, { memo } from 'react';
import './Footer.css';

const Footer = memo(() => (
  <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-title">꿈드림</div>
          <div className="footer-subtitle">유학생을 위한 비영리 조직</div>
        </div>
        <div className="footer-section">
          <div className="footer-title-en">DREAMDURIM</div>
          <div className="footer-subtitle-en">NPO for international students</div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>COPYRIGHT DREAMDURIM © 2024. ALL RIGHTS RESERVED.</p>
      </div>
  </footer>
));

Footer.displayName = 'Footer';

export default Footer;

