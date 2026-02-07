import React from 'react';
import { useLocation } from 'react-router-dom';
import "../css/DashboardPage.css";

export default function DashboardSidebar({ basePath = '/dash', activePage }) {
    // Determine role based on basePath for specific labels or links if needed
    const isDoctor = basePath.includes('doctor');

    return (
        <aside className="dashboard-sidebar">
            <h2 className="sidebar-title">{isDoctor ? 'Doctor Dashboard' : 'My Health'}</h2>
            <nav className="sidebar-nav">
                <a href={`${basePath}`} className={`nav-item ${activePage === 'home' ? 'active' : ''}`}>Home</a>
                <a href={`${basePath}/appointments`} className={`nav-item ${activePage === 'appointments' ? 'active' : ''}`}>Appointments</a>
                <a href={`${basePath}/book`} className={`nav-item ${activePage === 'book' ? 'active' : ''}`}>Book Appointment</a>

                {isDoctor && (
                    <a href={`${basePath}/patients`} className={`nav-item ${activePage === 'patients' ? 'active' : ''}`}>Patients</a>
                )}
                {!isDoctor && (
                    <>
                        <a href="/doctors" className="nav-item">Find Doctors</a>
                        <a href={`${basePath}/history`} className={`nav-item ${activePage === 'history' ? 'active' : ''}`}>Medical History</a>
                    </>
                )}

                <a href={`${basePath}/profile`} className={`nav-item ${activePage === 'profile' ? 'active' : ''}`}>Profile</a>
                <a href={`${basePath}/settings`} className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}>Settings</a>
            </nav>
        </aside>
    );
}
