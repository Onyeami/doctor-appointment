
import React from 'react';
import '../css/FeaturedDoctors.css';

const FeaturedDoctors = ({ doctors, onViewProfile }) => (
  <section className="featured-doctors-section">
    <h2>Featured Doctors</h2>
    <div className="doctors-grid">
      {doctors.map((doc) => (
        <div className="doctor-card" key={doc.id}>
          <img src={doc.photo} alt={doc.name} className="doctor-avatar" />
          <div className="doctor-info">
            <h3>{doc.name}</h3>
            <p className="specialty">{doc.specialty}</p>
            <p className="rating">⭐ {doc.rating}</p>
            <button onClick={() => onViewProfile(doc.id)} className="view-profile-btn">View Profile</button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedDoctors;
