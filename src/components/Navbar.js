import React, { useMemo, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = memo(({ hideInAbout, visibleInAbout }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const isActive = useMemo(() => {
    const path = location.pathname;
    return {
      about: path === '/about',
      gallery: path === '/works',
      history: path === '/history'
    };
  }, [location.pathname]);

  const hiddenClass = hideInAbout && !visibleInAbout ? ' navbar--hidden-in-about' : '';

  return (
    <nav className={`navbar${hiddenClass}`}>
      <div className="navbar-container">
        <Link to="/about" className="navbar-logo">
          DREAMDURIM
        </Link>
        <div className="navbar-menu">
          <Link
            to="/about"
            className={`navbar-link ${isActive.about ? 'active' : ''}`}
          >
            ABOUT
          </Link>
          <Link
            to="/works"
            className={`navbar-link ${isActive.gallery ? 'active' : ''}`}
          >
            WE
          </Link>
          <Link
            to="/history"
            className={`navbar-link ${isActive.history ? 'active' : ''}`}
          >
            HISTORY
          </Link>
        </div>
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <div className="theme-toggle-container">
            <div className="theme-hill"></div>
            <div className={`theme-sun ${isDarkMode ? 'hidden' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="5" fill="currentColor"/>
                <line x1="10" y1="3" x2="10" y2="1" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="10" y1="17" x2="10" y2="19" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="3" y1="10" x2="1" y2="10" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="17" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="5.343" y1="5.343" x2="3.929" y2="3.929" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="14.657" y1="14.657" x2="16.071" y2="16.071" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="14.657" y1="5.343" x2="16.071" y2="3.929" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="5.343" y1="14.657" x2="3.929" y2="16.071" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className={`theme-moon ${!isDarkMode ? 'hidden' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M 10 2 A 8 8 0 0 0 10 18 A 6 6 0 0 1 10 2 Z" fill="currentColor"/>
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
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;

