import React, { useState, useEffect } from "react";
import PatientRow from "./PatientRow";
import DashboardSidebar from "./DashboardSidebar";
import "../css/DashboardPage.css";
import "../css/Tables.css";

export default function PatientsPage({ basePath = '/doctor-dash' }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
            condition: p.condition || 'General Checkup' // Fallback if null
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
            <div className="table-card">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Condition (Latest Note)</th>
                    <th>Last Visit</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <PatientRow key={patient.id} patient={patient} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
