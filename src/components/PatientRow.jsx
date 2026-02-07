import React from "react";

export default function PatientRow({ patient }) {
  return (
    <tr>
      <td>{patient.name}</td>
      <td>{patient.condition}</td>
      <td>{patient.lastVisit}</td>
      <td>
        <span className={`status-badge ${patient.status.toLowerCase()}`}>
          {patient.status}
        </span>
      </td>
      <td>
        <button
          className="book-btn"
          onClick={() => patient.onBook(patient.id, patient.name)}
          style={{ padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Book
        </button>
      </td>
    </tr>
  );
}
