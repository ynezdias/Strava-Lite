import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';
import { Map, Timer, Save, CheckCircle2, Activity, ArrowLeft } from 'lucide-react';

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
        <div className="min-h-screen bg-[#0a0f1d] text-white selection:bg-stravaOrange/30">
            <Navbar />
            
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-stravaOrange/10 blur-[100px] rounded-full"></div>
            </div>

            <div className="max-w-2xl mx-auto p-6 pt-32">
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-500 hover:text-white font-bold text-xs uppercase tracking-widest mb-8 transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                </button>

                <div className="mb-10">
                    <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase">Log New <span className="text-stravaOrange">Activity</span></h1>
                    <p className="text-gray-500 font-medium">Every kilometer counts. Tell us how you did today.</p>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-stravaOrange/20 to-stravaPink/20 rounded-[32px] blur-xl opacity-50"></div>
                    <form onSubmit={handleSubmit} className="relative bg-[#161b2c] p-8 md:p-12 rounded-[32px] border border-white/5 shadow-2xl space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                                    <Map size={14} className="text-stravaOrange" /> Distance (KM)
                                </label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        step="0.1" 
                                        value={distance} 
                                        onChange={(e) => setDistance(e.target.value)} 
                                        required 
                                        min="0.1" 
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-6 text-3xl font-black text-white focus:outline-none focus:border-stravaOrange focus:ring-4 ring-stravaOrange/5 transition-all placeholder:text-gray-800" 
                                        placeholder="0.0" 
                                    />
                                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 font-black italic">KM</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                                    <Timer size={14} className="text-stravaPink" /> Duration (MIN)
                                </label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={durationMinutes} 
                                        onChange={(e) => setDurationMinutes(e.target.value)} 
                                        required 
                                        min="1" 
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-6 text-3xl font-black text-white focus:outline-none focus:border-stravaPink focus:ring-4 ring-stravaPink/5 transition-all placeholder:text-gray-800" 
                                        placeholder="0" 
                                    />
                                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 font-black italic">MIN</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            {success ? (
                                <div className="p-6 bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl flex items-center justify-center gap-3 animate-bounce">
                                    <CheckCircle2 size={24} />
                                    <span className="font-black uppercase tracking-widest text-sm">Activity Tracked Successfully!</span>
                                </div>
                            ) : (
                                <button 
                                    type="submit" 
                                    disabled={loading} 
                                    className="w-full bg-white text-black py-6 rounded-2xl font-black text-xl hover:bg-stravaOrange hover:text-white transition-all duration-300 shadow-xl shadow-white/5 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Save size={24} />
                                            SAVE ACTIVITY
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="mt-12 p-8 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-stravaOrange/10 flex items-center justify-center text-stravaOrange">
                        <Activity size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white uppercase tracking-tight">Real-time Processing</p>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">Your run metrics are processed asynchronously to ensure sub-second response times. View your updated stats in the dashboard instantly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
