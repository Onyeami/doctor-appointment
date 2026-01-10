import React from 'react';
// import './App.css';
import HeroSection from './components/HeroSection';
import QuickSearch from './components/QuickSearch';
import FeaturedDoctors from './components/FeaturedDoctors';
import HowItWorks from './components/HowItWorks';
import RoleBasedCTA from './components/RoleBasedCTA';
import Footer from './components/Footer';
import mockDoctors from './mockDoctors';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorsListPage from './components/DoctorsListPage';
import Navbar from './components/Navbar';
import DoctorProfilePage from './components/DoctorProfilePage';

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
              <div id="quick-search">
                <QuickSearch onSearch={handleSearch} />
              </div>
              <FeaturedDoctors doctors={mockDoctors} onViewProfile={handleViewProfile} />
              <HowItWorks />
              <RoleBasedCTA onRegisterProvider={handleRegisterProvider} onLogin={handleLogin} />
              <Footer />
            </>
          } />
          <Route path="/doctors" element={<DoctorsListPage />} />
          <Route path="/doctors/:id" element={<DoctorProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
