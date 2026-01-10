import React from 'react';
import '../css/HeroSection.css';

const HeroSection = ({ onFindDoctor, onLogin }) => (
  <section className="hero-section">
    <div className="hero-content">
      <h1>Book an Appointment with a Doctor or Dentist</h1>
      <p>Find verified healthcare professionals and book appointments in minutes.</p>
      <div className="hero-actions">
        <button className="primary-cta" onClick={onFindDoctor}>Find a Doctor</button>
        <button className="secondary-cta" onClick={onLogin}>Login / Register</button>
      </div>
    </div>
  </section>
);

export default HeroSection;
