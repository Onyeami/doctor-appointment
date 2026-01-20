import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import "../css/DashboardPage.css";
import "../css/ProfilePage.css";

export default function ProfilePage() {
  const [doctor, setDoctor] = useState({
    name: "Dr. Martins Onyia",
    specialty: "Dentist",
    clinic: "Smile Dental Clinic",
    email: "martins@example.com",
    phone: "+2348012345678",
  });

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
          <h2 className="page-title">Profile</h2>
          <div className="profile-card-container">
            <ProfileCard doctor={doctor} />
          </div>
        </div>
      </main>
    </div>





  );
}
