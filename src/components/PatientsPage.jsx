import React, { useState, useEffect } from "react";
import PatientRow from "./PatientRow";
import DashboardSidebar from "./DashboardSidebar";
import "../css/DashboardPage.css";
import "../css/Tables.css";

export default function PatientsPage({ basePath = '/doctor-dash' }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');

  const handleBookClick = (id, name) => {
    setSelectedPatient({ id, name });
    setBookingStatus('');
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus('submitting');

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch('http://localhost:3000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          patient_id: selectedPatient.id,
          appointment_date: bookingDate,
          notes: bookingNotes
        })
      });

      const data = await response.json();

      if (response.ok) {
        setBookingStatus('success');
        setTimeout(() => {
          setSelectedPatient(null);
          setBookingDate('');
          setBookingNotes('');
        }, 1500);
      } else {
        setError(data.message || 'Failed to book appointment');
        setBookingStatus('error');
      }
    } catch (err) {
      setError('Network error');
      setBookingStatus('error');
    }
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;

        if (!token) {
          setError('Not authenticated');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3000/api/doctors/patients', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          // Format date for display
          const formattedData = data.map(p => ({
            ...p,
            lastVisit: p.lastVisit ? new Date(p.lastVisit).toLocaleDateString() : 'N/A',
            condition: p.condition || 'General Checkup',
            onBook: handleBookClick
          }));
          setPatients(formattedData);
        } else {
          setError(data.message || 'Failed to fetch patients');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="dashboard-page">
      <DashboardSidebar basePath={basePath} activePage="patients" />

      <main className="dashboard-main">
        <div className="page-container">
          <h2 className="page-title">Patients</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : patients.length === 0 ? (
            <p>No patients found. Booked appointments will appear here.</p>
          ) : (
            <>
              <div className="table-card">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Condition (Latest Note)</th>
                      <th>Last Visit</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <PatientRow key={patient.id} patient={patient} />
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedPatient && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                  <div className="modal-content" style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', width: '400px', maxWidth: '90%' }}>
                    <h3>Book Follow-up: {selectedPatient.name}</h3>
                    <form onSubmit={handleBookingSubmit}>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Date & Time</label>
                        <input
                          type="datetime-local"
                          required
                          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                        />
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Notes</label>
                        <textarea
                          placeholder="Instructions for patient..."
                          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '80px' }}
                          value={bookingNotes}
                          onChange={(e) => setBookingNotes(e.target.value)}
                        ></textarea>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button type="button" onClick={() => setSelectedPatient(null)} disabled={bookingStatus === 'submitting'} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ddd', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" disabled={bookingStatus === 'submitting'} style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', backgroundColor: '#3b82f6', color: 'white', cursor: 'pointer' }}>
                          {bookingStatus === 'submitting' ? 'Booking...' : bookingStatus === 'success' ? 'Booked!' : 'Confirm Booking'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
