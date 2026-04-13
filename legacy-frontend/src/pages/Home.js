import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>🏃 Strava Lite</h1>

        {user ? (
          <>
            <p className="welcome">
              Welcome back, <span>{user.name}</span> 💪
            </p>

            <div className="auth-buttons">
              <button onClick={() => navigate("/profile")}>My Profile</button>
              <button className="danger" onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <p className="welcome">
              Track your runs. Beat your goals. Stay fit.
            </p>

            <div className="auth-buttons">
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
          </>
        )}
      </div>

      <div className="features">
        <div className="card">🔥 Track Runs</div>
        <div className="card">🎯 Set Goals</div>
        <div className="card">🏅 Earn Medals</div>
        <div className="card">📊 Analyze Progress</div>
      </div>
    </div>
  );
}
