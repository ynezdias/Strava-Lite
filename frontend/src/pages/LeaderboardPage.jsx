import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import { Medal } from 'lucide-react';

export default function LeaderboardPage() {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cached natively on the backend via Redis
        api.get('/leaderboard')
            .then(res => {
                setLeaders(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-2 flex justify-center items-center gap-3">
                        <Medal className="text-yellow-500" size={32}/> Global Leaderboard
                    </h1>
                    <p className="text-gray-400 font-mono text-sm">(Powered by high-speed Redis Cache)</p>
                </div>

                <div className="bg-darkCard rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                        <thead className="bg-gray-900 border-b border-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-gray-400 font-medium tracking-wide text-xs uppercase">Rank</th>
                                <th className="px-6 py-4 text-gray-400 font-medium tracking-wide text-xs uppercase">Runner ID</th>
                                <th className="px-6 py-4 text-gray-400 font-medium tracking-wide text-xs uppercase text-right">Total Distance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-8 text-gray-500">Loading fast data...</td>
                                </tr>
                            ) : leaders.map((leader, index) => (
                                <tr key={leader.user_id} className="hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-300">#{index + 1}</td>
                                    <td className="px-6 py-4 text-gray-400 text-sm font-mono">{leader.user_id}</td>
                                    <td className="px-6 py-4 font-bold text-stravaOrange text-right">{leader.total_distance.toFixed(1)} mi</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
