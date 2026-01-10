
import React from 'react';
import '../css/HowItWorks.css';

const steps = [
  { icon: '🔍', label: 'Search for a doctor or dentist' },
  { icon: '📅', label: 'Choose a time slot' },
  { icon: '✅', label: 'Book your appointment' },
];

const HowItWorks = () => (
  <section className="how-it-works-section">
    <h2>How It Works</h2>
    <div className="steps">
      {steps.map((step, idx) => (
        <div className="step" key={idx}>
          <span className="step-icon" aria-hidden>{step.icon}</span>
          <span className="step-label">{step.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
