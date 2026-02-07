import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import DashboardSidebar from "./DashboardSidebar";
import "../css/DashboardPage.css";
import "../css/ProfilePage.css";

export default function ProfilePage({ basePath = '/dash' }) {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          setError('Please login to view profile');
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);
        const endpoint = user.role === 'doctor' ? 'doctors' : 'patients';

        const response = await fetch(`http://localhost:3000/api/${endpoint}/profile`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          setError('Failed to load profile data');
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="dashboard-page">
      <DashboardSidebar basePath={basePath} activePage="profile" />

      <main className="dashboard-main">
        <div className="page-container">
          <h2 className="page-title">Profile</h2>

          {loading ? (
            <div className="loading-message">Loading profile...</div>
          ) : error ? (
            <div className="error-message" style={{ color: 'red', padding: '20px' }}>{error}</div>
          ) : profileData ? (
            <div className="profile-card-container">
              <ProfileCard
                data={profileData}
                isDoctor={JSON.parse(localStorage.getItem('user'))?.role === 'doctor'}
              />
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
