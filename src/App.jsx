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
  DoctorLoginPage,
  RegisterPage,
  RegisterDoctorPage,
  DashboardPage,
  DoctorDashboardPage,
  PatientDashboardPage,
  AppointmentsPage,
  ProfilePage,
  SettingsPage,
  PatientsPage,
  AppointmentDetailPage,
  ProtectedRoute,
  BookingForm,
  MedicalHistory,
} from './components';

function App() {
  const [featuredDoctors, setFeaturedDoctors] = React.useState([]);

  React.useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/doctors');
        if (response.ok) {
          const data = await response.json();
          // Take top 3 or random 3
          setFeaturedDoctors(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch featured doctors", error);
      }
    };
    fetchDoctors();
  }, []);

  // Navigation handlers (stubbed for now)
  const handleFindDoctor = () => {
    window.location.href = '/doctors';
  };
  const handleLogin = () => {
    window.location.href = '/login';
  };
  const handleSearch = (searchParams) => {
    // Implement search logic or navigation
    console.log(`Searching for: ${JSON.stringify(searchParams)}`);
  };
  const handleViewProfile = (doctorId) => {
    window.location.href = `/doctors/${doctorId}`;
  };
  const handleRegisterProvider = () => {
    // Navigate to provider registration
    window.location.href = '/register-doctor';
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
              <FeaturedDoctors doctors={featuredDoctors} onViewProfile={handleViewProfile} />
              <HowItWorks />
              <RoleBasedCTA onRegisterProvider={handleRegisterProvider} onLogin={handleLogin} />
              <Footer />
            </>
          } />
          <Route path="/doctors" element={<DoctorsListPage />} />
          <Route path="/doctors/:id" element={<DoctorProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-doctor" element={<DoctorLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-doctor" element={<RegisterDoctorPage />} />
          <Route path="/dash" element={<PatientDashboardPage />} />
          <Route path="/patient-dash" element={<PatientDashboardPage />} />
          <Route path="/doctor-dash" element={<DoctorDashboardPage />} />

          {/* Patient Routes */}
          <Route path="/dash/appointments" element={<AppointmentsPage basePath="/patient-dash" />} />
          <Route path="/patient-dash/appointments" element={<AppointmentsPage basePath="/patient-dash" />} />
          <Route path="/dash/profile" element={<ProfilePage basePath="/patient-dash" />} />
          <Route path="/patient-dash/profile" element={<ProfilePage basePath="/patient-dash" />} />
          <Route path="/dash/settings" element={<SettingsPage basePath="/patient-dash" />} />
          <Route path="/patient-dash/settings" element={<SettingsPage basePath="/patient-dash" />} />
          <Route path="/patient-dash/book" element={<BookingForm basePath="/patient-dash" />} />
          <Route path="/patient-dash/history" element={<MedicalHistory basePath="/patient-dash" />} />
          <Route path="/doctor-dash/book" element={<BookingForm basePath="/doctor-dash" />} />

          {/* Doctor Routes */}
          <Route path="/doctor-dash/appointments" element={<AppointmentsPage basePath="/doctor-dash" />} />
          <Route path="/doctor-dash/patients" element={<PatientsPage basePath="/doctor-dash" />} />
          <Route path="/doctor-dash/profile" element={<ProfilePage basePath="/doctor-dash" />} />
          <Route path="/doctor-dash/settings" element={<SettingsPage basePath="/doctor-dash" />} />
          <Route path="/dash/patients" element={<PatientsPage basePath="/doctor-dash" />} />
          <Route path="/dash/appointments/:id" element={<AppointmentDetailPage />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
