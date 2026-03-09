import React, { Suspense, lazy, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { useContentProtection } from './hooks/useContentProtection';
import { ROUTES } from './constants/routes';
import './App.css';

const About = lazy(() => import('./components/About'));
const Activities = lazy(() => import('./components/Activities'));
const We = lazy(() => import('./components/We'));
const History = lazy(() => import('./components/History'));

const RedirectToAbout = () => <Navigate to={ROUTES.ABOUT} replace />;
const RedirectToWe = () => <Navigate to={ROUTES.WE} replace />;

function LoadingFallback() {
  const { t } = useTranslation();
  return (
    <div className="loading-fallback" aria-live="polite" aria-busy="true">
      <span className="visually-hidden">{t('common.loading')}</span>
    </div>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const isAboutPage = pathname === ROUTES.ABOUT;

  return (
    <div className="App">
      <a href="#main-content" className="skip-link">
        {t('common.skipLink')}
      </a>
      <Navbar />
      <main id="main-content" className="main-content" role="main">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/credit" element={<RedirectToAbout />} />
            <Route path="/" element={<RedirectToAbout />} />
            <Route path="/home" element={<RedirectToAbout />} />
            <Route path="/works" element={<RedirectToWe />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.ACTIVITIES} element={<Activities />} />
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
  useContentProtection(setContextMenuTip);

  return (
    <ErrorBoundary>
      {contextMenuTip && (
        <div className="app-contextmenu-tooltip" role="status">
          {t('contextMenuBlocked')}
        </div>
      )}
      <HelmetProvider>
        <ThemeProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppContent />
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
