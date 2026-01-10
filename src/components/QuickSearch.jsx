
import React, { useState } from 'react';
import '../css/QuickSearch.css';

const specialties = [
  'Dentist',
  'GP',
  'Orthodontist',
  'Pediatrician',
  'Cardiologist',
  'Dermatologist',
];

const QuickSearch = ({ onSearch }) => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ name, specialty, location });
  };

  return (
    <section className="quick-search-section">
      <form className="quick-search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Doctor name or specialty"
          value={name}
          onChange={e => setName(e.target.value)}
          aria-label="Doctor name or specialty"
        />
        <select
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
          aria-label="Specialty"
        >
          <option value="">All Specialties</option>
          {specialties.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={e => setLocation(e.target.value)}
          aria-label="Location"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>
    </section>
  );
};

export default QuickSearch;
