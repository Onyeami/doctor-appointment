import React from "react";

export default function ProfileCard({ doctor }) {
  return (
    <div className="profile-card">
      <img
        src="https://via.placeholder.com/120"
        alt="Doctor Avatar"
        className="doctor-avatar-large"
      />
      <h3>{doctor.name}</h3>
      <p className="specialty">{doctor.specialty}</p>
      <p>Clinic: {doctor.clinic}</p>
      <p>Email: {doctor.email}</p>
      <p>Phone: {doctor.phone}</p>
    </div>
  );
}
