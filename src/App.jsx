import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Home from './pages/Home/Home';
import Features from './pages/Features/Features';
import About from './pages/About/About';
import Quizzes from './pages/Quizes/Quizes';
import Profile from './pages/Profile/Profile';
import Class from './components/Class/Class';
import Chatbot from './components/ChatBot/Chatbot';
import Ebook from './components/Ebook/Ebook';

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
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/subject/:id" element={<Class />} />
          <Route path="/ebook/:id" element={<Ebook/>} /> {/* Route for eBook details */}
        </Routes>
        <Chatbot />
       
      </> 
    </Router>
  );
};

export default App;
