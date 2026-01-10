import React, { useState } from 'react';
import QuickSearch from './QuickSearch';
import DoctorCard from './DoctorCard';
import mockDoctors from '../mockDoctors';
import '../css/DoctorsListPage.css';

const sortDoctors = (doctors, sortBy) => {
  if (sortBy === 'rating') {
    return [...doctors].sort((a, b) => b.rating - a.rating);
  }
  // Add more sort logic as needed
  return doctors;
};

const DoctorsListPage = () => {
  const [searchParams, setSearchParams] = useState({ name: '', specialty: '', location: '' });
  const [sortBy, setSortBy] = useState('rating');
  const [loading, setLoading] = useState(false);

  // Filter logic
  const filteredDoctors = sortDoctors(
    mockDoctors.filter(doc => {
      const matchesName = searchParams.name === '' || doc.name.toLowerCase().includes(searchParams.name.toLowerCase());
      const matchesSpecialty = searchParams.specialty === '' || doc.specialty === searchParams.specialty;
      const matchesLocation = searchParams.location === '' || (doc.location && doc.location.toLowerCase().includes(searchParams.location.toLowerCase()));
      return matchesName && matchesSpecialty && matchesLocation;
    }),
    sortBy
  );

  return (
    <section className="doctors-list-page">
      <header className="doctors-header">
        <div className="header-illustration" aria-hidden="true" />
        <h1>Available Doctors & Dentists</h1>
        <p>Select a healthcare professional to view details and book an appointment.</p>
      </header>
      <div className="sticky-search-bar">
        <QuickSearch onSearch={setSearchParams} />
      </div>
      {loading ? (
        <div className="skeleton-loader">Loading...</div>
      ) : filteredDoctors.length === 0 ? (
        <div className="empty-state">
          <p>No doctors found matching your criteria.</p>
          <button onClick={() => setSearchParams({ name: '', specialty: '', location: '' })} className="reset-filters-btn">Reset Filters</button>
        </div>
      ) : (
        <div className="doctors-grid">
          {filteredDoctors.map(practitioner => (
            <DoctorCard key={practitioner.id} doctor={practitioner} />
          ))}
        </div>
      )}
    </section>
  );
};

export default DoctorsListPage;
