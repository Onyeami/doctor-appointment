import "../css/DashboardPage.css";
import DashboardSidebar from "./DashboardSidebar";

export default function DoctorDashboardPage() {
    return (
        <div className="dashboard-page">
            <DashboardSidebar basePath="/doctor-dash" activePage="home" />

            <main className="dashboard-main">
                <h3 className="dashboard-heading">Welcome, Doctor!</h3>
                <div className="cards-container">
                    <div className="dashboard-card">
                        <h4>Total Appointments</h4>
                        <p>24</p>
                    </div>
                    <div className="dashboard-card">
                        <h4>Today's Schedule</h4>
                        <p>8 Patients</p>
                    </div>
                    <div className="dashboard-card">
                        <h4>Pending Requests</h4>
                        <p>5</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
