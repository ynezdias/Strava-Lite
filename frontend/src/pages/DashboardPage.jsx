import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';
import { Activity, Trophy, TrendingUp, CalendarDays } from 'lucide-react';

export default function DashboardPage() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('user_id');
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/');
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

    if (loading) return <div className="text-center mt-20 text-gray-400">Loading Analytics Dashboard...</div>;

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Your Analytics</h1>
                    <Link to="/log-run" className="px-4 py-2 bg-stravaOrange hover:bg-orange-600 text-white font-bold rounded-lg transition-colors">
                        Log a Run
                    </Link>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-darkCard p-6 rounded-xl border border-gray-800 flex items-center space-x-4 hover:border-gray-600 transition-colors">
                        <div className="p-3 bg-pink-500/10 rounded-lg text-stravaPink"><TrendingUp size={28} /></div>
                        <div>
                            <p className="text-sm text-gray-400">Average Pace</p>
                            <p className="text-2xl font-bold text-white">{(analytics?.average_pace_sec_per_unit / 60 || 0).toFixed(2)} min/mi</p>
                        </div>
                    </div>
                    
                    <div className="bg-darkCard p-6 rounded-xl border border-gray-800 flex items-center space-x-4 hover:border-gray-600 transition-colors">
                        <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500"><Trophy size={28} /></div>
                        <div>
                            <p className="text-sm text-gray-400">Personal Best Distance</p>
                            <p className="text-2xl font-bold text-white">{analytics?.personal_best?.max_distance || 0} mi</p>
                        </div>
                    </div>

                    <div className="bg-darkCard p-6 rounded-xl border border-gray-800 flex items-center space-x-4 hover:border-gray-600 transition-colors">
                        <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><Activity size={28} /></div>
                        <div>
                            <p className="text-sm text-gray-400">PB Duration</p>
                            <p className="text-2xl font-bold text-white">{(analytics?.personal_best?.min_duration / 60 || 0).toFixed(1)} mins</p>
                        </div>
                    </div>
                </div>

                {/* Window Function Data (7-day rolling) */}
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><CalendarDays size={20}/> 7-Day Rolling Distances</h2>
                <div className="bg-darkCard rounded-xl border border-gray-800 overflow-hidden">
                    {analytics?.rolling_7_day_totals?.length > 0 ? (
                       <table className="w-full text-left text-sm text-gray-300">
                           <thead className="bg-gray-900 text-gray-400 uppercase">
                               <tr>
                                   <th className="px-6 py-4 font-medium">Date</th>
                                   <th className="px-6 py-4 font-medium">Run Distance</th>
                                   <th className="px-6 py-4 font-medium text-stravaPink">7-Day Rolling Total</th>
                               </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-800">
                               {analytics.rolling_7_day_totals.map((run, i) => (
                                   <tr key={i} className="hover:bg-gray-800/50 transition-colors">
                                       <td className="px-6 py-4">{new Date(run.date).toLocaleDateString()}</td>
                                       <td className="px-6 py-4">{run.distance} mi</td>
                                       <td className="px-6 py-4 font-bold text-stravaPink">{run.rolling_7_day_distance} mi</td>
                                   </tr>
                               ))}
                           </tbody>
                       </table>
                    ) : (
                        <div className="p-8 text-center text-gray-500">No runs logged in this window yet. Get out there!</div>
                    )}
                </div>
            </div>
        </div>
    );
}
