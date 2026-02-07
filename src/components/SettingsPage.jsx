import React, { useState } from "react";
import SettingsToggle from "./SettingsToggle";
import DashboardSidebar from "./DashboardSidebar";
import "../css/DashboardPage.css";
import "../css/SettingsPage.css";

export default function SettingsPage({ basePath = '/dash' }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you absolutely sure? This will permanently delete your account, clinical profile, and all appointments. This action cannot be undone."
    );

    if (!confirmed) return;

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch('http://localhost:3000/api/auth/me', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        alert("Account deleted successfully.");
        localStorage.removeItem('user');
        window.location.href = '/';
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete account");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <DashboardSidebar basePath={basePath} activePage="settings" />

      <main className="dashboard-main">
        <div className="page-container">
          <h2 className="page-title">Settings</h2>

          <div className="settings-card">
            <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Preferences</h3>
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

          <div className="settings-card" style={{ marginTop: '24px', border: '1px solid #fee2e2' }}>
            <h3 style={{ marginBottom: '8px', fontSize: '18px', color: '#991b1b' }}>Danger Zone</h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
