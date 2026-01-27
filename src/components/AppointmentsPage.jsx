import React from "react";
import AppointmentRow from "./AppointmentRow";
import DashboardSidebar from "./DashboardSidebar";
import "../css/DashboardPage.css";
import "../css/Tables.css";

const mockAppointments = [
  { id: 1, patient: "John Doe", date: "2026-01-12", time: "10:00 AM", status: "Confirmed" },
  { id: 2, patient: "Jane Smith", date: "2026-01-13", time: "11:00 AM", status: "Pending" },
  { id: 3, patient: "Mike Johnson", date: "2026-01-14", time: "02:00 PM", status: "Cancelled" },
];

export default function AppointmentsPage({ basePath = '/dash' }) {
  return (
    <div className="dashboard-page">
      <DashboardSidebar basePath={basePath} activePage="appointments" />


      <main className="dashboard-main">
        <div className="page-container">
          <h2 className="page-title">Appointments</h2>
          <div className="table-card">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {mockAppointments.map((app) => (
                  <AppointmentRow key={app.id} appointment={app} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>





  );
}
