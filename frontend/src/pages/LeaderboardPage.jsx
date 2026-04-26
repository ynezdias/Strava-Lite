import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import { Medal, Trophy, Crown } from 'lucide-react';

export default function LeaderboardPage() {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/leaderboard')
            .then(res => {
                setLeaders(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const getRankIcon = (index) => {
        if (index === 0) return <Crown className="text-yellow-400" size={24} />;
        if (index === 1) return <Trophy className="text-gray-300" size={22} />;
        if (index === 2) return <Trophy className="text-amber-600" size={20} />;
        return <span className="text-gray-500 font-bold w-6 text-center">#{index + 1}</span>;
    };

    const getInitials = (name) => {
        if (!name) return "?";
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <div className="min-h-screen bg-[#0a0f1d] text-white selection:bg-stravaOrange/30">
            <Navbar />
            
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-stravaOrange/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stravaPink/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto p-6 pt-32">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-stravaOrange to-stravaPink bg-clip-text text-transparent">
                        Global Champions
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                        <div className="h-px w-8 bg-gray-800"></div>
                        <p className="text-sm font-medium uppercase tracking-widest">Top Performers</p>
                        <div className="h-px w-8 bg-gray-800"></div>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-stravaOrange/20 to-stravaPink/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    
                    <div className="relative bg-[#161b2c]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Rank</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Runner</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] text-right">Distance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-20">
                                            <div className="inline-block animate-pulse text-stravaOrange font-medium">Crunching race data...</div>
                                        </td>
                                    </tr>
                                ) : leaders.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-20 text-gray-500">No runners logged yet. Be the first!</td>
                                    </tr>
                                ) : leaders.map((leader, index) => (
                                    <tr key={index} className="group/row hover:bg-white/[0.03] transition-all duration-300">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-center w-8">
                                                {getRankIcon(index)}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-transform duration-300 group-hover/row:scale-110 ${
                                                    index === 0 ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400' :
                                                    index === 1 ? 'bg-gray-400/20 border-gray-400/50 text-gray-300' :
                                                    index === 2 ? 'bg-amber-600/20 border-amber-600/50 text-amber-500' :
                                                    'bg-stravaOrange/10 border-stravaOrange/30 text-stravaOrange'
                                                }`}>
                                                    {getInitials(leader.name)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white group-hover/row:text-stravaOrange transition-colors">{leader.name}</div>
                                                    <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Level {10 - index} Runner</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-lg font-black text-white group-hover/row:text-stravaOrange transition-colors">
                                                    {leader.total_distance.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}
                                                </span>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Kilometers</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-600 font-medium flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Live updates from high-speed Redis edge cache
                    </p>
                </div>
            </div>
        </div>
    );
}
