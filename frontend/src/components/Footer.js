// src/components/Footer.js
import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Libre Express</p>
      <a href="/politica-de-privacidad" className="footer-link">
        Política de Privacidad
      </a>
    </footer>
  );
};

export default Footer;
