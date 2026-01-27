import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import DashboardSidebar from "./DashboardSidebar";
import "../css/DashboardPage.css";
import "../css/ProfilePage.css";

export default function ProfilePage({ basePath = '/dash' }) {
  const [doctor, setDoctor] = useState({
    name: "Dr. Martins Onyia",
    specialty: "Dentist",
    clinic: "Smile Dental Clinic",
    email: "martins@example.com",
    phone: "+2348012345678",
  });

  return (
    <div className="dashboard-page">
      <DashboardSidebar basePath={basePath} activePage="profile" />

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
