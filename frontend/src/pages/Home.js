import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Strava Lite</h1>
        <p>Track your runs, monitor your progress, and reach your goals — all in one place!</p>
        <div className="cta-buttons">
          <Link to="/create" className="btn">Create Runner</Link>
          <Link to="/manage" className="btn btn-alt">Manage Runner</Link>
        </div>
      </div>
    </div>
  );
}
