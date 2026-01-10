
import React from 'react';
import '../css/Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-links">
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <a href="#terms">Terms & Privacy</a>
    </div>
    <div className="footer-copy">&copy; {new Date().getFullYear()} Dent Appointment App</div>
  </footer>
);

export default Footer;
