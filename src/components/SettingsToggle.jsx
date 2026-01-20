import React from "react";
import "../css/SettingsPage.css";

export default function SettingsToggle({ label, enabled, onToggle }) {
  return (
    <div className="settings-toggle">
      <span>{label}</span>
      <label className="switch">
        <input type="checkbox" checked={enabled} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
