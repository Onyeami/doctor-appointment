import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate(`/doctors/${doctor.id}`);
  };
  return (
    <article className="doctor-card" tabIndex={0} aria-label={`View profile for ${doctor.name}`}>
      <img src={doctor.photo} alt={doctor.name} className="doctor-avatar" />
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <div className="specialty">{doctor.specialty}</div>
        {doctor.clinic && <div className="clinic-info">{doctor.clinic} &middot; {doctor.location}</div>}
        <div className="rating" aria-label={`Rating: ${doctor.rating} out of 5`}>
          {"★".repeat(Math.round(doctor.rating))}
          <span className="rating-value">{doctor.rating}</span>
        </div>
        <button className="view-profile-btn" onClick={handleViewProfile}>View Profile</button>
      </div>
    </article>
  );
};

export default DoctorCard;
