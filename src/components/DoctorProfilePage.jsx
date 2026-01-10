import React from "react";
import { useParams } from "react-router-dom";
import mockDoctors from "../mockDoctors";
import "../css/DoctorProfilePage.css";

const DoctorProfilePage = () => {
  const { id } = useParams();
  const doctor = mockDoctors.find(doc => String(doc.id) === String(id));

  if (!doctor) {
    return <div className="doctor-profile-page"><p>Doctor not found.</p></div>;
  }

  return (
    <div className="doctor-profile-page">
      <div className="profile-left">
        <img src={doctor.photo} alt={doctor.name} className="doctor-avatar-large" />
        <h2>{doctor.name}</h2>
        <div className="specialty">{doctor.specialty}</div>
        {doctor.clinic && <div className="clinic-info">{doctor.clinic}</div>}
        {doctor.location && <div className="location-info"><strong>Address:</strong> {doctor.location}</div>}
        <div className="rate-info"><strong>Rate:</strong> {doctor.rate ? `₦${doctor.rate}` : 'Not specified'}</div>
        <div className="workdays-info"><strong>Work Days:</strong> {doctor.workdays || 'Mon - Fri'}</div>
        <div className="hours-info"><strong>Hours:</strong> {doctor.hours || '9:00 AM - 5:00 PM'}</div>
        <div className="availability-info"><strong>Availability:</strong> {doctor.available ? 'Available' : 'Not Available'}</div>
        <div className="walkin-info"><strong>Walk-in:</strong> {doctor.walkin === false ? 'Appointment Only' : doctor.walkin === true ? 'Accepted' : 'Not specified'}</div>
        <div className="about-info">{doctor.about || "No additional details provided."}</div>
      </div>
      <div className="profile-right">
        <h3>Book an Appointment</h3>
        <form className="appointment-form">
          <label>
            Your Name
            <input type="text" name="patientName" required />
          </label>
          <label>
            Email
            <input type="email" name="patientEmail" required />
          </label>
          <label>
            Preferred Date
            <input type="date" name="appointmentDate" required />
          </label>
          <label>
            Preferred Time
            <input type="time" name="appointmentTime" required />
          </label>
          <label>
            Reason for Visit
            <textarea name="reason" rows={3} />
          </label>
          <button type="submit" className="book-btn">Book Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
