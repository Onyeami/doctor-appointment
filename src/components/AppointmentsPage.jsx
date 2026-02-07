import React, { useState, useEffect } from "react";
import AppointmentRow from "./AppointmentRow";
import DashboardSidebar from "./DashboardSidebar";
import "../css/DashboardPage.css";
import "../css/Tables.css";

export default function AppointmentsPage({ basePath = '/dash' }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`http://localhost:3000/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Update local state
        setAppointments(prev => prev.map(apt =>
          apt.id === id ? { ...apt, status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1), rawStatus: newStatus } : apt
        ));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update status');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          setError('Please login to view appointments');
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);
        const response = await fetch('http://localhost:3000/api/appointments', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const isDoctor = user?.role === 'doctor';

          // Transform data to match the expected format
          const formattedAppointments = data.map(apt => ({
            id: apt.id,
            patient: isDoctor ? (apt.patient_name || 'Unknown Patient') : (apt.doctor_name || 'Unknown Doctor'),
            date: new Date(apt.appointment_date).toLocaleDateString(),
            time: new Date(apt.appointment_date).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            }),
            status: apt.status.charAt(0).toUpperCase() + apt.status.slice(1),
            rawStatus: apt.status // Keep for logic
          }));
          setAppointments(formattedAppointments);
        } else {
          setError('Failed to load appointments');
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Determine user role for table header
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  const isDoctor = user?.role === 'doctor';

  return (
    <div className="dashboard-page">
      <DashboardSidebar basePath={basePath} activePage="appointments" />

      <main className="dashboard-main">
        <div className="page-container">
          <h2 className="page-title">Appointments</h2>

          {loading ? (
            <div className="loading-message">Loading appointments...</div>
          ) : error ? (
            <div className="error-message" style={{ color: 'red', padding: '20px' }}>{error}</div>
          ) : appointments.length === 0 ? (
            <div className="empty-state" style={{ padding: '40px', textAlign: 'center' }}>
              <p>No appointments found.</p>
            </div>
          ) : (
            <div className="table-card">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>{isDoctor ? 'Patient Name' : 'Doctor Name'}</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <AppointmentRow
                      key={app.id}
                      appointment={app}
                      isDoctor={isDoctor}
                      onStatusUpdate={handleStatusUpdate}
                    />
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
