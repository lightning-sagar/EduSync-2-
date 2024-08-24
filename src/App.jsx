import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Home from './pages/Home/Home';
import Features from './pages/Features/Features';
import About from './pages/About/About';
import Quizes from './pages/Quizes/Quizes';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <>
        <Navbar setShowLogin={setShowLogin} />
        {showLogin && <Login setShowLogin={setShowLogin} />}
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/quizes" element={<Quizes />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
