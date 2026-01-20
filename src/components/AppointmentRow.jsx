import React from "react";
import { useNavigate } from "react-router-dom";

export default function AppointmentRow({ appointment }) {
  const navigate = useNavigate();

  const handleView = () => {
    // Navigate to the appointment detail page
    navigate(`/dash/appointments/${appointment.id}`);
  };

  return (
    <tr>
      <td>{appointment.patient}</td>
      <td>{appointment.date}</td>
      <td>{appointment.time}</td>
      <td>{appointment.status}</td>
      <td>
        <button 
          className="view-btn"
          onClick={handleView}
        >
          View
        </button>
      </td>
    </tr>
  );
}
