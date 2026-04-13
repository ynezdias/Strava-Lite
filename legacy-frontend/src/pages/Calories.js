import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile({ user }) {
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile">
      <h2>Welcome, {user.name}!</h2>
      <div className="feature-links">
        <Link to="/calories" className="feature-btn">Calories Tracker</Link>
        <Link to="/goals" className="feature-btn">Goal Setting</Link>
        <Link to="/medals" className="feature-btn">Medals & Rewards</Link>
        <Link to="/cycling" className="feature-btn">Cycling Tracker</Link>
        <Link to="/friends" className="feature-btn">Friend Comparison</Link>
        <Link to="/health" className="feature-btn">Health Records</Link>
        <Link to="/analytics" className="feature-btn">Charts & Analytics</Link>
      </div>
    </div>
  );
}
