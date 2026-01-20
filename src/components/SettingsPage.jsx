import React, { useState } from "react";
import SettingsToggle from "./SettingsToggle";
import "../css/DashboardPage.css";
import "../css/SettingsPage.css";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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
          <h2 className="page-title">Settings</h2>
          <div className="settings-card">
            <SettingsToggle
              label="Enable Notifications"
              enabled={notifications}
              onToggle={() => setNotifications(!notifications)}
            />
            <SettingsToggle
              label="Dark Mode"
              enabled={darkMode}
              onToggle={() => setDarkMode(!darkMode)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
