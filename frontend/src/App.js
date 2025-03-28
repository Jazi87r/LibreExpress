// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import HomeAdmin from './components/HomeAdmin';

const App = () => {
  return (
    <div>
       <Navbar />
    <Router>
       <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/homeadmin" element={<HomeAdmin />} />
       </Routes>
    </Router>
    </div>
     
  );
};

export default App;
