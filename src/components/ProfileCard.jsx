import React from "react";

export default function ProfileCard({ data, isDoctor }) {
  const avatarUrl = data.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&size=150&background=4F46E5&color=fff`;

  return (
    <div className="profile-card">
      <img
        src={avatarUrl}
        alt="User Avatar"
        className="doctor-avatar-large"
      />
      <h3>{data.name}</h3>
      {isDoctor && (
        <>
          <p className="specialty">{data.specialty || 'General Practitioner'}</p>
          {data.clinic && <p>Clinic: {data.clinic}</p>}
          <p>Rate: €{data.hourly_rate || '0'}/hr</p>
        </>
      )}
      {data.email && <p>Email: {data.email}</p>}
      {data.phone && <p>Phone: {data.phone}</p>}
      {!isDoctor && data.created_at && (
        <p>Member Since: {new Date(data.created_at).toLocaleDateString()}</p>
      )}
    </div>
  );
}
