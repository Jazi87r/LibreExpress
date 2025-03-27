// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';


const App = () => {
  return (
    <div>
       <Navbar />
    <Router>
       <Routes>
          <Route path="/login" element={<Login />} />
       </Routes>
    </Router>
    </div>
     
  );
};

export default App;
