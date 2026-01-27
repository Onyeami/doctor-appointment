import React, { useState, useEffect } from 'react';
import QuickSearch from './QuickSearch';
import DoctorCard from './DoctorCard';
import '../css/DoctorsListPage.css';

const sortDoctors = (doctors, sortBy) => {
  if (sortBy === 'rating') {
    return [...doctors].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }
  return doctors;
};

const DoctorsListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchParams, setSearchParams] = useState({ name: '', specialty: '', location: '' });
  const [sortBy, setSortBy] = useState('rating');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/doctors');
        const data = await response.json();

        if (response.ok) {
          // Map API data to component expectation if needed, or just use as is
          setDoctors(data);
        } else {
          setError('Failed to load doctors');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Filter logic
  const filteredDoctors = sortDoctors(
    doctors.filter(doc => {
      const matchesName = searchParams.name === '' || doc.name.toLowerCase().includes(searchParams.name.toLowerCase());
      const matchesSpecialty = searchParams.specialty === '' || (doc.specialty && doc.specialty.includes(searchParams.specialty));
      // Location logic might need adjustment based on backend data structure
      const matchesLocation = true;
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
        <div className="skeleton-loader">Loading doctors...</div>
      ) : error ? (
        <div className="error-message">Error: {error}</div>
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
