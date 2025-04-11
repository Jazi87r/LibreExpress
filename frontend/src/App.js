// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import HomeAdmin from './components/product/HomeAdmin';

const App = () => {
  return (
    <div>
       <Navbar />
    <Router>
       <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/homeadmin" element={<HomeAdmin />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
       </Routes>
    </Router>
    <Footer />
    </div>
     
  );
};

export default App;
