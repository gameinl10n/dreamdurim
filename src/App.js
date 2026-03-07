import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './components/Home';
import Gallery from './components/Gallery';
import About from './components/About';
import History from './components/History';
import './App.css';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/credit" element={<Navigate to="/about" replace />} />
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/works" element={<Gallery />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  const isAboutPage = pathname === '/about';
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <div className="App">
      {isAboutPage ? (
        <>
          <div
            className="about-navbar-trigger"
            style={{ minHeight: showNavbar ? 100 : 32 }}
            onMouseEnter={() => setShowNavbar(true)}
            onMouseLeave={() => setShowNavbar(false)}
          >
            <div className="about-navbar-trigger-strip" aria-hidden />
            <Navbar hideInAbout={isAboutPage} visibleInAbout={showNavbar} />
          </div>
          <main className="main-content">
            <AppRoutes />
          </main>
        </>
      ) : (
        <>
          <Navbar />
          <main className="main-content">
            <AppRoutes />
          </main>
          <Footer />
        </>
      )}
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
