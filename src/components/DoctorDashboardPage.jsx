import { useState, useEffect } from "react";
import "../css/DashboardPage.css";
import DashboardSidebar from "./DashboardSidebar";

export default function DoctorDashboardPage() {
    const [stats, setStats] = useState({
        totalAppointments: 0,
        todaySchedule: 0,
        pendingRequests: 0
    });
    const [doctorName, setDoctorName] = useState('Doctor');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Get doctor info from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setDoctorName(user.name || 'Doctor');
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
                const response = await fetch('http://localhost:3000/api/doctors/stats', {
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
            <DashboardSidebar basePath="/doctor-dash" activePage="home" />

            <main className="dashboard-main">
                <h3 className="dashboard-heading">Welcome, {doctorName}!</h3>

                {loading ? (
                    <div className="loading-message">Loading dashboard...</div>
                ) : error ? (
                    <div className="error-message" style={{ color: 'red', padding: '20px' }}>{error}</div>
                ) : (
                    <div className="cards-container">
                        <div className="dashboard-card">
                            <h4>Total Appointments</h4>
                            <p>{stats.totalAppointments}</p>
                        </div>
                        <div className="dashboard-card">
                            <h4>Today's Schedule</h4>
                            <p>{stats.todaySchedule} Patients</p>
                        </div>
                        <div className="dashboard-card">
                            <h4>Pending Requests</h4>
                            <p>{stats.pendingRequests}</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
