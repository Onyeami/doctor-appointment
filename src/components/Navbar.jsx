import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setIsLoggedIn(true);
      setUserRole(user.role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, [location]); // Re-check on location change

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
  };

  // Determine dashboard path based on role
  const dashboardPath = userRole === 'doctor' ? '/doctor-dash' : '/patient-dash';

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Doctor-App</Link>
      </div>
      <ul className="navbar-links">
        {!isLoggedIn ? (
          // Links for logged-out users
          <>
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
            </li>
            <li>
              <Link to="/doctors" className={location.pathname === "/doctors" ? "active" : ""}>Find a Doctor</Link>
            </li>
            <li>
              <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
            </li>
          </>
        ) : (
          // Links for logged-in users
          <>
            <li>
              <Link to={dashboardPath} className={location.pathname.includes('dash') ? "active" : ""}>Dashboard</Link>
            </li>
            <li>
              <Link to="/doctors" className={location.pathname === "/doctors" ? "active" : ""}>Find a Doctor</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="logout-btn"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  padding: 0,
                  textDecoration: 'none'
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
