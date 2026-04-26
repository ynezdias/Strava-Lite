import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';
import { Activity, Trophy, TrendingUp, CalendarDays, Plus, ArrowUpRight, Timer, Map } from 'lucide-react';

export default function DashboardPage() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('user_id');
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/auth');
            return;
        }

        api.get(`/analytics/${userId}`)
            .then(res => {
                setAnalytics(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load analytics", err);
                setLoading(false);
            });
    }, [userId, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0f1d] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-stravaOrange border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Analyzing Performance...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0f1d] text-white selection:bg-stravaOrange/30">
            <Navbar />
            
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-stravaOrange/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stravaPink/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto p-6 md:p-12 pt-32">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter mb-2">ATHLETE <span className="text-stravaOrange">DASHBOARD</span></h1>
                        <p className="text-gray-500 font-medium">Your running performance, visualized in real-time.</p>
                    </div>
                    <Link to="/log-run" className="inline-flex items-center gap-2 bg-stravaOrange hover:bg-stravaPink text-white font-black px-8 py-4 rounded-2xl transition-all transform hover:-translate-y-1 shadow-lg shadow-stravaOrange/20 active:scale-95 group">
                        <Plus size={20} /> LOG NEW ACTIVITY
                        <ArrowUpRight size={18} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                </header>

                {/* Metrics Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <MetricCard 
                        icon={<Timer size={24} />}
                        label="Average Pace"
                        value={`${(analytics?.average_pace_sec_per_unit / 60 || 0).toFixed(2)}`}
                        unit="min/km"
                        color="text-stravaOrange"
                        bg="bg-stravaOrange/10"
                    />
                    <MetricCard 
                        icon={<Map size={24} />}
                        label="Personal Best"
                        value={`${analytics?.personal_best?.max_distance?.toFixed(1) || 0}`}
                        unit="Kilometers"
                        color="text-yellow-500"
                        bg="bg-yellow-500/10"
                    />
                    <MetricCard 
                        icon={<TrendingUp size={24} />}
                        label="PB Duration"
                        value={`${(analytics?.personal_best?.min_duration / 60 || 0).toFixed(0)}`}
                        unit="Minutes"
                        color="text-stravaPink"
                        bg="bg-stravaPink/10"
                    />
                </div>

                {/* Activity Feed / Table Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black tracking-tight flex items-center gap-2 uppercase">
                                <CalendarDays size={20} className="text-stravaPink" /> 7-Day Rolling Activity
                            </h2>
                        </div>
                        
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-stravaPink/20 to-stravaOrange/20 rounded-3xl blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative bg-[#161b2c]/80 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                                {analytics?.rolling_7_day_totals?.length > 0 ? (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/5">
                                                <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date</th>
                                                <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Distance</th>
                                                <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Rolling Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {analytics.rolling_7_day_totals.map((run, i) => (
                                                <tr key={i} className="group/row hover:bg-white/[0.02] transition-colors">
                                                    <td className="px-8 py-5 font-bold text-gray-400 group-hover/row:text-white transition-colors">{new Date(run.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</td>
                                                    <td className="px-8 py-5 font-black text-white">{run.distance} <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter ml-1">km</span></td>
                                                    <td className="px-8 py-5 text-right font-black text-stravaPink">{run.rolling_7_day_distance.toFixed(1)} <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter ml-1">km</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="py-24 text-center">
                                        <Activity size={48} className="mx-auto mb-4 text-gray-800" />
                                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No Recent Activity Found</p>
                                        <Link to="/log-run" className="text-stravaOrange text-xs font-bold hover:underline mt-4 inline-block">Start your first run now</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-xl font-black tracking-tight flex items-center gap-2 uppercase">
                            <Trophy size={20} className="text-yellow-500" /> Goal Progress
                        </h2>
                        <div className="bg-[#161b2c] rounded-3xl border border-white/5 p-8">
                            <div className="mb-6">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Weekly Goal</span>
                                    <span className="text-xl font-black">25 <span className="text-xs text-gray-600 ml-1">KM</span></span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-stravaOrange rounded-full" style={{ width: '65%' }}></div>
                                </div>
                                <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-widest text-right">16.2 KM REMAINING</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                                    <Trophy size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Next Achievement</p>
                                    <p className="text-sm font-bold">100KM Total Club</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ icon, label, value, unit, color, bg }) {
    return (
        <div className="relative group cursor-pointer">
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${color === 'text-stravaOrange' ? 'from-stravaOrange/20' : color === 'text-yellow-500' ? 'from-yellow-500/20' : 'from-stravaPink/20'} to-transparent rounded-[32px] blur opacity-0 group-hover:opacity-100 transition duration-500`}></div>
            <div className="relative bg-[#161b2c] p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-all transform hover:-translate-y-1">
                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center ${color} mb-6 transform group-hover:scale-110 transition-transform duration-500`}>
                    {icon}
                </div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{label}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tighter">{value}</span>
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{unit}</span>
                </div>
            </div>
        </div>
    );
}
