
import React from 'react';
import '../css/RoleBasedCTA.css';


const RoleBasedCTA = ({ onRegisterProvider, onLogin }) => (
  <section className="role-cta-section">
    <h2>Are you a Doctor or Dentist?</h2>
    <button className="register-provider-btn" onClick={onRegisterProvider}>
      Register as a Healthcare Provider
    </button>
    <button className="login-link" onClick={() => window.location.href = '/login-doctor'}>
      Already have an account? Login
    </button>
  </section>
);

export default RoleBasedCTA;
