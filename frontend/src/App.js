import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfile from './components/user/UserProfile';
import Login from './components/user/Login';
import Register from './components/user/Register';
import HomeAdmin from './components/product/HomeAdmin';
import Home from './components/product/Home';

import PrivacyPolicy from './components/PrivacyPolicy';
import { AuthProvider } from './context/AuthContext';


function AppContent() {
  

  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home  />} />
        <Route path="/homeadmin" element={<HomeAdmin />} />
       
        <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
        <Route path="/userprofile" element={<UserProfile />} />

      </Routes>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
