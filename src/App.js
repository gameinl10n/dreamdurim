import React, { Suspense, lazy } from 'react';
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
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <Router basename="/dreamdurim">
            <AppContent />
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
