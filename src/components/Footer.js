import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const SNS_LINKS = [
  { id: 'instagram', href: 'https://instagram.com/dreamdurim', label: 'Instagram' },
  { id: 'youtube', href: 'https://youtube.com/@dreamdurim', label: 'YouTube' },
  { id: 'linkedin', href: 'https://linkedin.com/company/dreamdurim', label: 'LinkedIn' },
];

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
        <div className="footer-section footer-section--sns">
          <span className="footer-sns-label">{t('footer.followUs')}</span>
          <div className="footer-sns-links" role="list">
            {SNS_LINKS.map(({ id, href, label }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-sns-link"
                aria-label={label}
              >
                {label}
              </a>
            ))}
          </div>
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
