import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import {
  HeroSection,
  QuickSearch,
  FeaturedDoctors,
  HowItWorks,
  RoleBasedCTA,
  Footer,
  Navbar,
  DoctorsListPage,
  DoctorProfilePage,
  LoginPage,
  RegisterPage,
  DashboardPage,
  AppointmentsPage,
  ProfilePage,
  SettingsPage,
  PatientsPage,
  mockDoctors,
  AppointmentDetailPage,
  ProtectedRoute,
} from './components';

function App() {
  // Navigation handlers (stubbed for now)
  const handleFindDoctor = () => {
    window.location.href = '/doctors';
  };
  const handleLogin = () => {
    // Implement navigation to login/register page
    alert('Navigate to Login/Register');
  };
  const handleSearch = (searchParams) => {
    // Implement search logic or navigation
    alert(`Searching for: ${JSON.stringify(searchParams)}`);
  };
  const handleViewProfile = (doctorId) => {
    // Implement navigation to doctor profile
    alert(`View profile for doctor ID: ${doctorId}`);
  };
  const handleRegisterProvider = () => {
    // Implement navigation to provider registration
    alert('Navigate to Provider Registration');
  };

  return (
    <Router>
      <Navbar />
      <div className="app-wrapper landing-page">
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection onFindDoctor={handleFindDoctor} onLogin={handleLogin} />
              {/* <div id="quick-search">
                <QuickSearch onSearch={handleSearch} />
              </div> */}
              <FeaturedDoctors doctors={mockDoctors} onViewProfile={handleViewProfile} />
              <HowItWorks />
              <RoleBasedCTA onRegisterProvider={handleRegisterProvider} onLogin={handleLogin} />
              <Footer />
            </>
          } />
          <Route path="/doctors" element={<DoctorsListPage />} />
          <Route path="/doctors/:id" element={<DoctorProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dash" element={<DashboardPage />} />
          <Route path="/dash/appointments" element={<AppointmentsPage />} />
          <Route path="/dash/profile" element={<ProfilePage />} />
          <Route path="/dash/settings" element={<SettingsPage />} />
          <Route 
          path="/dash/patients" 
          element={<PatientsPage /> } />
          <Route path="/dash/appointments/:id" element={<AppointmentDetailPage />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
