// src/App.js
import React from 'react';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h2>Bienvenido a nuestra tienda</h2>
        {/* Otras secciones del sitio */}
      </main>
    </div>
  );
};

export default App;
