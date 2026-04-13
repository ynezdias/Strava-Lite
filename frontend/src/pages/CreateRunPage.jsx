import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';

export default function CreateRunPage() {
    const [distance, setDistance] = useState('');
    const [durationMinutes, setDurationMinutes] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const userId = localStorage.getItem('user_id');
        const durationSeconds = parseInt(durationMinutes) * 60;

        try {
            // Emits the async task natively!
            await api.post(`/runs/${userId}`, {
                distance: parseFloat(distance),
                duration: durationSeconds
            });
            
            setSuccess(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-md mx-auto p-6 mt-10">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">Log New Run</h1>
                
                <form onSubmit={handleSubmit} className="bg-darkCard p-6 rounded-xl border border-gray-800 space-y-5 shadow-xl">
                    
                    <div>
                        <label className="block text-gray-400 text-sm font-bold mb-2">Distance (miles)</label>
                        <input type="number" step="0.1" value={distance} onChange={(e) => setDistance(e.target.value)} required min="0.1" className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-stravaOrange" placeholder="e.g. 5.5" />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm font-bold mb-2">Duration (minutes)</label>
                        <input type="number" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} required min="1" className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-stravaOrange" placeholder="e.g. 45" />
                    </div>

                    {success ? (
                        <div className="p-3 bg-green-500/20 border border-green-500 text-green-400 text-center rounded">
                            Run tracked! (Processing asynchronously)
                        </div>
                    ) : (
                        <button type="submit" disabled={loading} className="w-full p-3 bg-stravaOrange text-white font-bold rounded hover:bg-orange-600 transition-colors disabled:opacity-50">
                            {loading ? 'Submitting...' : 'Save Run'}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
