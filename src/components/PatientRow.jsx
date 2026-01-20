import React from "react";

export default function PatientRow({ patient }) {
  return (
    <tr>
      <td>{patient.name}</td>
      <td>{patient.age}</td>
      <td>{patient.gender}</td>
      <td>{patient.phone}</td>
    </tr>
  );
}
