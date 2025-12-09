import React from "react";

export default function Navbar({ title = "Starva Lite" }) {
  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="logo">
          <svg width="30" height="35" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 12c0 4.97 4.03 9 9 9s9-4.03 9-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 7l-2 2 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="nav-title">{title}</h1>
      </div>
      <div className="nav-right">
        <button className="ghost">Sync</button>
      </div>
    </header>
  );
}
