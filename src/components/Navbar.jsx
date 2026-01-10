import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">DentApp</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        </li>
        <li>
          <Link to="/doctors" className={location.pathname === "/doctors" ? "active" : ""}>Find a Doctor</Link>
        </li>
        {/* Add more nav links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
