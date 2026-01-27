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
    </tr>
  );
}
