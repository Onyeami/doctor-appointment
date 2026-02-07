import "../css/DashboardPage.css";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-title">My Dashboard</h2>
        <nav className="sidebar-nav">
          <a href="/dash" className="nav-item active">Home</a>
          <a href="/dash/appointments" className="nav-item">Appointments</a>
          <a href="/dash/patients" className="nav-item">Patients</a>
          <a href="/dash/profile" className="nav-item">Profile</a>
          <a href="/dash/settings" className="nav-item">Settings</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <h3 className="dashboard-heading">Dashboard Overview</h3>
        <div className="cards-container">
          <div className="dashboard-card">
            <h4>Total Appointments</h4>
            <p>--</p>
          </div>
          <div className="dashboard-card">
            <h4>Upcoming Patients</h4>
            <p>--</p>
          </div>
          <div className="dashboard-card">
            <h4>New Messages</h4>
            <p>--</p>
          </div>
        </div>
      </main>
    </div>
  );
}
