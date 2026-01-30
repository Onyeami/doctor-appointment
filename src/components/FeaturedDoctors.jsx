
import React from 'react';
import '../css/FeaturedDoctors.css';

const FeaturedDoctors = ({ doctors, onViewProfile }) => (
  <section className="featured-doctors-section">
    <h2>Featured Doctors</h2>
    {(!doctors || doctors.length === 0) ? (
      <div className="empty-state">
        <p>No doctors available at the moment.</p>
      </div>
    ) : (
      <div className="doctors-grid">
        {doctors.map((doc) => (
          <div className="doctor-card" key={doc.id}>
            <img
              src={doc.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&size=150&background=4F46E5&color=fff`}
              alt={doc.name}
              className="doctor-avatar"
            />
            <div className="doctor-info">
              <h3>{doc.name}</h3>
              <p className="specialty">{doc.specialty}</p>
              <p className="rating">⭐ {doc.rating || 'N/A'}</p>
              <button className="view-profile-btn" onClick={() => onViewProfile(doc.id)}>View Profile</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

export default FeaturedDoctors;
