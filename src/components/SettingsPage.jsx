import React, { useState } from "react";
import SettingsToggle from "./SettingsToggle";
import DashboardSidebar from "./DashboardSidebar";
import "../css/DashboardPage.css";
import "../css/SettingsPage.css";

export default function SettingsPage({ basePath = '/dash' }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="dashboard-page">
      <DashboardSidebar basePath={basePath} activePage="settings" />

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
