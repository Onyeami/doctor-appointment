import React from "react";
import PatientRow from "./PatientRow";
import "../css/DashboardPage.css";
import "../css/Tables.css";

const mockPatients = [
  { id: 1, name: "John Doe", age: 35, gender: "Male", phone: "+2348012345678" },
  { id: 2, name: "Jane Smith", age: 29, gender: "Female", phone: "+2348098765432" },
  { id: 3, name: "Mike Johnson", age: 42, gender: "Male", phone: "+2348023456789" },
];

export default function PatientsPage() {
  return (


    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-title">My Dashboard</h2>
        <nav className="sidebar-nav">
          <a href="/dash" className="nav-item active">Home</a>
          <a href="/dash/appointments" className="nav-item">Appointments</a>
          <a href="/dash/patients" className="nav-item">Patients</a>
          <a href="/dash/profile" className="nav-item">Profile</a>
          <a href="/dash/settings" className="nav-item">Settings</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="page-container">
          <h2 className="page-title">Patients</h2>
          <div className="table-card">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {mockPatients.map((patient) => (
                  <PatientRow key={patient.id} patient={patient} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>


  );
}
