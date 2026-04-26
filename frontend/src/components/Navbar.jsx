import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Trophy, LogOut } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-[#0a0f1d]/50 px-6">
            <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
                <Link to="/dashboard" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-stravaOrange to-stravaPink rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-300">
                        <Activity size={18} className="text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tighter italic text-white">STRAVA <span className="text-stravaOrange">LITE</span></span>
                </Link>
                
                <div className="flex items-center gap-2 md:gap-8 bg-white/5 p-1 rounded-2xl border border-white/5">
                    <NavLink 
                        to="/dashboard" 
                        icon={<LayoutDashboard size={18} />} 
                        label="Stats" 
                        active={isActive('/dashboard')} 
                    />
                    <NavLink 
                        to="/leaderboard" 
                        icon={<Trophy size={18} />} 
                        label="Elite" 
                        active={isActive('/leaderboard')} 
                    />
                </div>

                </button>
            </div>
        </nav>
    );
}

function NavLink({ to, icon, label, active }) {
    return (
        <Link 
            to={to} 
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                active 
                ? 'bg-white text-black shadow-lg shadow-white/5' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
        >
            {icon}
            <span className="hidden sm:inline uppercase tracking-widest text-[10px]">{label}</span>
        </Link>
    );
}
