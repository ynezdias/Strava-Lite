import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Strava Lite</div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className={({ isActive }) => isActive ? "active" : ""}>
            Signup
          </NavLink>
        </li>
        <li>

        </li>
      </ul>
    </nav>
  );
}
