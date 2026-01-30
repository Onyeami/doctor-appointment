import { useState, useEffect } from "react";
import "../css/DashboardPage.css";
import DashboardSidebar from "./DashboardSidebar";

export default function PatientDashboardPage() {
    const [stats, setStats] = useState({
        upcomingAppointments: 0,
        pastVisits: 0,
        messages: 0
    });
    const [patientName, setPatientName] = useState('Patient');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Get patient info from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setPatientName(user.name || 'Patient');
        }

        // Fetch dashboard statistics
        const fetchStats = async () => {
            try {
                const userData = localStorage.getItem('user');
                if (!userData) {
                    setError('Please login to view dashboard');
                    setLoading(false);
                    return;
                }

                const user = JSON.parse(userData);
                const response = await fetch('http://localhost:3000/api/patients/stats', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                } else {
                    setError('Failed to load dashboard statistics');
                }
            } catch (err) {
                setError('Network error. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="dashboard-page">
            <DashboardSidebar basePath="/patient-dash" activePage="home" />

            <main className="dashboard-main">
                <h3 className="dashboard-heading">Welcome, {patientName}!</h3>

                {loading ? (
                    <div className="loading-message">Loading dashboard...</div>
                ) : error ? (
                    <div className="error-message" style={{ color: 'red', padding: '20px' }}>{error}</div>
                ) : (
                    <div className="cards-container">
                        <div className="dashboard-card">
                            <h4>Upcoming Appointments</h4>
                            <p>{stats.upcomingAppointments}</p>
                        </div>
                        <div className="dashboard-card">
                            <h4>Past Visits</h4>
                            <p>{stats.pastVisits}</p>
                        </div>
                        <div className="dashboard-card">
                            <h4>Messages</h4>
                            <p>{stats.messages}</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
