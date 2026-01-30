import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import "../css/Tables.css";
import "../css/DashboardPage.css";

export default function AppointmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Determine basePath based on user role
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  const basePath = user?.role === 'doctor' ? '/doctor-dash' : '/patient-dash';
  const isDoctor = user?.role === 'doctor';

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          setError('Please login to view appointment details');
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);
        const response = await fetch(`http://localhost:3000/api/appointments/${id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAppointment(data);
        } else {
          setError('Appointment not found or you do not have permission to view it');
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm(`Are you sure you want to cancel this appointment?`)) {
      return;
    }

    setSubmitting(true);
    try {
      const userData = localStorage.getItem('user');
      const user = JSON.parse(userData);

      const response = await fetch(`http://localhost:3000/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      if (response.ok) {
        alert('Appointment cancelled successfully');
        navigate(`${basePath}/appointments`);
      } else {
        alert('Failed to cancel appointment');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAccept = async () => {
    setSubmitting(true);
    try {
      const userData = localStorage.getItem('user');
      const user = JSON.parse(userData);

      const response = await fetch(`http://localhost:3000/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'confirmed' })
      });

      if (response.ok) {
        alert('Appointment accepted successfully');
        navigate(`${basePath}/appointments`);
      } else {
        alert('Failed to accept appointment');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDecline = async () => {
    if (!window.confirm(`Are you sure you want to decline this appointment?`)) {
      return;
    }

    setSubmitting(true);
    try {
      const userData = localStorage.getItem('user');
      const user = JSON.parse(userData);

      const response = await fetch(`http://localhost:3000/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      if (response.ok) {
        alert('Appointment declined successfully');
        navigate(`${basePath}/appointments`);
      } else {
        alert('Failed to decline appointment');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReschedule = async (e) => {
    e.preventDefault();

    if (!rescheduleDate || !rescheduleTime) {
      alert('Please select both date and time');
      return;
    }

    setSubmitting(true);
    try {
      const userData = localStorage.getItem('user');
      const user = JSON.parse(userData);

      // Combine date and time into a datetime string
      const appointmentDateTime = `${rescheduleDate} ${rescheduleTime}:00`;

      const response = await fetch(`http://localhost:3000/api/appointments/${id}/reschedule`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ appointment_date: appointmentDateTime })
      });

      if (response.ok) {
        alert('Appointment rescheduled successfully');
        navigate(`${basePath}/appointments`);
      } else {
        alert('Failed to reschedule appointment');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <DashboardSidebar basePath={basePath} activePage="appointments" />
        <main className="dashboard-main">
          <div className="page-container">
            <div className="loading-message">Loading appointment details...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="dashboard-page">
        <DashboardSidebar basePath={basePath} activePage="appointments" />
        <main className="dashboard-main">
          <div className="page-container">
            <div className="error-message" style={{ color: 'red', padding: '20px' }}>
              {error || 'Appointment not found'}
            </div>
            <button onClick={() => navigate(`${basePath}/appointments`)} className="back-btn">
              Back to Appointments
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Format date and time for display
  const appointmentDate = new Date(appointment.appointment_date);
  const formattedDate = appointmentDate.toLocaleDateString();
  const formattedTime = appointmentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="dashboard-page">
      <DashboardSidebar basePath={basePath} activePage="appointments" />

      <main className="dashboard-main">
        <div className="page-container">
          <h2 className="page-title">Appointment Details</h2>
          <div className="appointment-detail-card">
            <p><strong>{isDoctor ? 'Patient' : 'Doctor'}:</strong> {appointment.patient_name || appointment.doctor_name}</p>
            <p><strong>Date:</strong> {formattedDate}</p>
            <p><strong>Time:</strong> {formattedTime}</p>
            <p><strong>Status:</strong> <span style={{
              color: appointment.status === 'confirmed' ? 'green' :
                appointment.status === 'cancelled' ? 'red' : 'orange',
              fontWeight: 'bold'
            }}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span></p>
            <p><strong>Notes:</strong> {appointment.notes || 'No notes provided'}</p>

            {appointment.status !== 'cancelled' && (
              <div className="appointment-actions">
                {isDoctor ? (
                  // Doctor actions: Accept/Decline
                  <>
                    {appointment.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <button
                          className="reschedule-btn"
                          onClick={handleAccept}
                          disabled={submitting}
                          style={{ backgroundColor: '#4CAF50' }}
                        >
                          {submitting ? 'Processing...' : 'Accept Appointment'}
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={handleDecline}
                          disabled={submitting}
                        >
                          {submitting ? 'Processing...' : 'Decline Appointment'}
                        </button>
                      </div>
                    )}
                    {appointment.status === 'confirmed' && (
                      <p style={{ color: 'green', fontWeight: 'bold' }}>✓ This appointment has been confirmed</p>
                    )}
                  </>
                ) : (
                  // Patient actions: Cancel and Reschedule
                  <>
                    <button
                      className="cancel-btn"
                      onClick={handleCancel}
                      disabled={submitting}
                    >
                      {submitting ? 'Cancelling...' : 'Cancel Appointment'}
                    </button>

                    <form onSubmit={handleReschedule} className="reschedule-form">
                      <h3>Reschedule Appointment</h3>
                      <label>
                        New Date:
                        <input
                          type="date"
                          value={rescheduleDate}
                          onChange={(e) => setRescheduleDate(e.target.value)}
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </label>
                      <label>
                        New Time:
                        <input
                          type="time"
                          value={rescheduleTime}
                          onChange={(e) => setRescheduleTime(e.target.value)}
                          required
                        />
                      </label>
                      <button
                        type="submit"
                        className="reschedule-btn"
                        disabled={submitting}
                      >
                        {submitting ? 'Rescheduling...' : 'Reschedule'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            )}

            {appointment.status === 'cancelled' && (
              <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fee', borderRadius: '5px' }}>
                <p style={{ color: 'red', margin: 0 }}>This appointment has been cancelled.</p>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate(`${basePath}/appointments`)}
            className="back-btn"
            style={{ marginTop: '20px' }}
          >
            Back to Appointments
          </button>
        </div>
      </main>
    </div>
  );
}
