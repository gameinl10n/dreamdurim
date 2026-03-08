import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { ROUTES } from './constants/routes';
import './App.css';

const About = lazy(() => import('./components/About'));
const We = lazy(() => import('./components/We'));
const History = lazy(() => import('./components/History'));

const REDIRECT_TO_ABOUT = <Navigate to={ROUTES.ABOUT} replace />;
const REDIRECT_TO_WE = <Navigate to={ROUTES.WE} replace />;

function LoadingFallback() {
  return (
    <div className="loading-fallback" aria-live="polite" aria-busy="true">
      <span className="visually-hidden">로딩 중</span>
    </div>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  const isAboutPage = pathname === ROUTES.ABOUT;

  return (
    <div className="App">
      <a href="#main-content" className="skip-link">
        본문으로 건너뛰기
      </a>
      <Navbar />
      <main id="main-content" className="main-content" role="main">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/credit" element={REDIRECT_TO_ABOUT} />
            <Route path="/" element={REDIRECT_TO_ABOUT} />
            <Route path="/home" element={REDIRECT_TO_ABOUT} />
            <Route path="/works" element={REDIRECT_TO_WE} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.WE} element={<We />} />
            <Route path={ROUTES.HISTORY} element={<History />} />
          </Routes>
        </Suspense>
      </main>
      {!isAboutPage && <Footer />}
      <ScrollToTop />
    </div>
  );
}

function App() {
  const { t } = useTranslation();
  const [contextMenuTip, setContextMenuTip] = useState(null);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setContextMenuTip(true);
      setTimeout(() => setContextMenuTip(null), 2500);
    };
    const preventCopy = (e) => {
      e.preventDefault();
    };
    const preventDrag = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', preventCopy);
    document.addEventListener('cut', preventCopy);
    document.addEventListener('paste', preventCopy);
    document.addEventListener('dragstart', preventDrag);
    document.addEventListener('selectstart', preventCopy);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('cut', preventCopy);
      document.removeEventListener('paste', preventCopy);
      document.removeEventListener('dragstart', preventDrag);
      document.removeEventListener('selectstart', preventCopy);
    };
  }, []);

  return (
    <ErrorBoundary>
      {contextMenuTip && (
        <div className="app-contextmenu-tooltip" role="status">
          {t('contextMenuBlocked')}
        </div>
      )}
      <HelmetProvider>
        <ThemeProvider>
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
