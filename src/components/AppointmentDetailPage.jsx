import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Tables.css";
import "../css/DashboardPage.css";

const mockAppointments = [
  { id: 1, patient: "John Doe", date: "2026-01-12", time: "10:00 AM", status: "Confirmed", notes: "Regular checkup" },
  { id: 2, patient: "Jane Smith", date: "2026-01-13", time: "11:00 AM", status: "Pending", notes: "Teeth whitening" },
  { id: 3, patient: "Mike Johnson", date: "2026-01-14", time: "02:00 PM", status: "Cancelled", notes: "Follow-up visit" },
];

export default function AppointmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const appointment = mockAppointments.find((app) => app.id === parseInt(id));

  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  if (!appointment) {
    return <p>Appointment not found.</p>;
  }

  const handleCancel = () => {
    alert(`Appointment with ${appointment.patient} cancelled.`);
    navigate("/dash/appointments");
  };

  const handleReschedule = (e) => {
    e.preventDefault();
    alert(`Appointment rescheduled to ${rescheduleDate} at ${rescheduleTime}`);
    navigate("/dash/appointments");
  };

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-title">My Dashboard</h2>
        <nav className="sidebar-nav">
          <a href="/dash" className="nav-item">Home</a>
          <a href="/dash/appointments" className="nav-item active">Appointments</a>
          <a href="/dash/patients" className="nav-item">Patients</a>
          <a href="/dash/profile" className="nav-item">Profile</a>
          <a href="/dash/settings" className="nav-item">Settings</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="page-container">
          <h2 className="page-title">Appointment Details</h2>
          <div className="appointment-detail-card">
            <p><strong>Patient:</strong> {appointment.patient}</p>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Status:</strong> {appointment.status}</p>
            <p><strong>Notes:</strong> {appointment.notes}</p>

            <div className="appointment-actions">
              <button className="cancel-btn" onClick={handleCancel}>Cancel Appointment</button>

              <form onSubmit={handleReschedule} className="reschedule-form">
                <label>
                  New Date:
                  <input 
                    type="date" 
                    value={rescheduleDate} 
                    onChange={(e) => setRescheduleDate(e.target.value)} 
                    required 
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
                <button type="submit" className="reschedule-btn">Reschedule</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
