import React, { useMemo, memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { ROUTES } from '../constants/routes';
import './Navbar.css';

const LANG_OPTIONS = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: 'ZH' },
];

const Navbar = memo(() => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    if (typeof window !== 'undefined') window.localStorage.setItem('dreamdurim-lang', lng);
  };

  const isActive = useMemo(() => {
    const path = location.pathname;
    return {
      about: path === ROUTES.ABOUT,
      we: path === ROUTES.WE,
      history: path === ROUTES.HISTORY,
    };
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" aria-label="메인 네비게이션">
      <div className="navbar-container">
        <Link to={ROUTES.ABOUT} className="navbar-logo" onClick={closeMenu}>
          <img src={`${process.env.PUBLIC_URL || ''}/images/logo.png`} alt={t('nav.logo')} className="navbar-logo-img" />
        </Link>
        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <Link to={ROUTES.ABOUT} className={`navbar-link ${isActive.about ? 'active' : ''}`} onClick={closeMenu}>
            {t('nav.about')}
          </Link>
          <Link to={ROUTES.WE} className={`navbar-link ${isActive.we ? 'active' : ''}`} onClick={closeMenu}>
            {t('nav.we')}
          </Link>
          <Link to={ROUTES.HISTORY} className={`navbar-link ${isActive.history ? 'active' : ''}`} onClick={closeMenu}>
            {t('nav.history')}
          </Link>
        </div>
        <div className="navbar-right">
          <div className="navbar-lang" role="group" aria-label="Language">
            {LANG_OPTIONS.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                className={`navbar-lang-btn ${i18n.language === code ? 'active' : ''}`}
                onClick={() => changeLanguage(code)}
                aria-pressed={i18n.language === code}
              >
                {label}
              </button>
            ))}
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={t('nav.toggleTheme')}>
            <div className="theme-toggle-container">
              <div className="theme-hill"></div>
              <div className={`theme-sun ${isDarkMode ? 'hidden' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="5" fill="currentColor" />
                  <line x1="10" y1="3" x2="10" y2="1" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="10" y1="17" x2="10" y2="19" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="3" y1="10" x2="1" y2="10" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="17" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="1.5" />
                  <line
                    x1="5.343"
                    y1="5.343"
                    x2="3.929"
                    y2="3.929"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="14.657"
                    y1="14.657"
                    x2="16.071"
                    y2="16.071"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="14.657"
                    y1="5.343"
                    x2="16.071"
                    y2="3.929"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="5.343"
                    y1="14.657"
                    x2="3.929"
                    y2="16.071"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div className={`theme-moon ${!isDarkMode ? 'hidden' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M 10 2 A 8 8 0 0 0 10 18 A 6 6 0 0 1 10 2 Z" fill="currentColor" />
                </svg>
              </div>
              {isDarkMode && (
                <>
                  <div className="theme-star star-1"></div>
                  <div className="theme-star star-2"></div>
                  <div className="theme-star star-3"></div>
                </>
              )}
            </div>
          </button>
          <button
            type="button"
            className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
