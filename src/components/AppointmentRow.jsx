import React from "react";
import { useNavigate } from "react-router-dom";

export default function AppointmentRow({ appointment, isDoctor, onStatusUpdate }) {
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
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            className="view-btn"
            onClick={handleView}
            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ddd', cursor: 'pointer' }}
          >
            View
          </button>

          {!isDoctor && appointment.rawStatus === 'proposed' && (
            <>
              <button
                onClick={() => onStatusUpdate(appointment.id, 'confirmed')}
                style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', backgroundColor: '#22c55e', color: 'white', cursor: 'pointer' }}
              >
                Accept
              </button>
              <button
                onClick={() => onStatusUpdate(appointment.id, 'cancelled')}
                style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', backgroundColor: '#ef4444', color: 'white', cursor: 'pointer' }}
              >
                Decline
              </button>
            </>
          )}

          {isDoctor && appointment.rawStatus === 'pending' && (
            <>
              <button
                onClick={() => onStatusUpdate(appointment.id, 'confirmed')}
                style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', backgroundColor: '#22c55e', color: 'white', cursor: 'pointer' }}
              >
                Confirm
              </button>
              <button
                onClick={() => onStatusUpdate(appointment.id, 'cancelled')}
                style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', backgroundColor: '#ef4444', color: 'white', cursor: 'pointer' }}
              >
                Reject
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
