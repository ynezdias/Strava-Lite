import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        navigate('/');
    };

    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
            <Link to="/dashboard" className="text-xl font-bold font-sans tracking-tight text-white">
                Strava <span className="text-stravaPink">Lite</span>
            </Link>
            <div className="flex gap-6 items-center">
                <Link to="/dashboard" className="text-gray-300 hover:text-white font-medium transition-colors">Dashboard</Link>
                <Link to="/leaderboard" className="text-gray-300 hover:text-white font-medium transition-colors">Leaderboard</Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 font-medium transition-colors">Logout</button>
            </div>
        </nav>
    );
}
