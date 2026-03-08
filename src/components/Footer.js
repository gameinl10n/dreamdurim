import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = memo(() => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-title">{t('footer.title')}</div>
          <div className="footer-subtitle">{t('footer.subtitle')}</div>
        </div>
        <div className="footer-section">
          <div className="footer-title-en">{t('footer.titleEn')}</div>
          <div className="footer-subtitle-en">{t('footer.subtitleEn')}</div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>{t('footer.copyright', { year })}</p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
