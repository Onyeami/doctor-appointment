import "../css/DashboardPage.css";
import DashboardSidebar from "./DashboardSidebar";

export default function PatientDashboardPage() {
    return (
        <div className="dashboard-page">
            <DashboardSidebar basePath="/patient-dash" activePage="home" />

            <main className="dashboard-main">
                <h3 className="dashboard-heading">Welcome, Patient!</h3>
                <div className="cards-container">
                    <div className="dashboard-card">
                        <h4>Upcoming Appointments</h4>
                        <p>2</p>
                    </div>
                    <div className="dashboard-card">
                        <h4>Past Visits</h4>
                        <p>12</p>
                    </div>
                    <div className="dashboard-card">
                        <h4>Messages</h4>
                        <p>0</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
