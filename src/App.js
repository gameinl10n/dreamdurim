import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Gallery from './components/Gallery';
import About from './components/About';
import History from './components/History';
import './App.css';

const REDIRECT_TO_ABOUT = <Navigate to="/about" replace />;

function AppContent() {
  const { pathname } = useLocation();
  const isAboutPage = pathname === '/about';

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/credit" element={REDIRECT_TO_ABOUT} />
          <Route path="/" element={REDIRECT_TO_ABOUT} />
          <Route path="/home" element={REDIRECT_TO_ABOUT} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Gallery />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
      {!isAboutPage && <Footer />}
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
