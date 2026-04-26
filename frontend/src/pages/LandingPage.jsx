import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Trophy, Zap, ArrowRight, Shield, BarChart3 } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0a0f1d] text-white selection:bg-stravaOrange/30 font-sans overflow-x-hidden">
            {/* Header / Nav */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-[#0a0f1d]/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-gradient-to-br from-stravaOrange to-stravaPink rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
                            <Activity size={24} className="text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter italic">STRAVA <span className="text-stravaOrange">LITE</span></span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => navigate('/')}
                            className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
                        >
                            Sign In
                        </button>
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-stravaOrange hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                {/* Background Glows */}
                <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[80%] h-[40%] bg-stravaOrange/10 blur-[150px] rounded-full -z-10"></div>
                
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-stravaOrange text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-fade-in">
                        <Zap size={14} /> New: Global Leaderboards Live
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] animate-slide-up">
                        TRACK YOUR <br />
                        <span className="bg-gradient-to-r from-stravaOrange via-stravaPink to-orange-400 bg-clip-text text-transparent">
                            PERFORMANCE
                        </span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed animate-slide-up delay-100">
                        The ultimate lightweight companion for runners. Log runs, analyze performance with sub-second latency, and compete on the global stage.
                    </p>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
                        <button 
                            onClick={() => navigate('/')}
                            className="w-full md:w-auto bg-stravaOrange px-10 py-5 rounded-2xl text-lg font-black hover:bg-stravaPink transition-all duration-500 transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(252,82,0,0.3)] flex items-center justify-center gap-3"
                        >
                            Start Running Now <ArrowRight size={20} />
                        </button>
                        <button className="w-full md:w-auto px-10 py-5 rounded-2xl text-lg font-black border border-white/10 hover:bg-white/5 transition-all">
                            View Features
                        </button>
                    </div>
                </div>

                {/* Dashboard Preview Mockup */}
                <div className="max-w-6xl mx-auto mt-24 relative group animate-fade-in delay-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-stravaOrange/30 to-stravaPink/30 rounded-[32px] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative bg-[#161b2c] rounded-[32px] border border-white/10 p-4 shadow-2xl overflow-hidden">
                        <div className="aspect-[16/9] bg-[#0a0f1d] rounded-[24px] flex items-center justify-center overflow-hidden">
                            {/* Placeholder for dashboard screenshot */}
                            <div className="text-center p-12">
                                <Activity size={64} className="text-stravaOrange/20 mx-auto mb-6" />
                                <p className="text-gray-500 font-black text-2xl uppercase tracking-tighter italic">Live Dashboard Experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-32 px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<BarChart3 className="text-stravaOrange" size={32} />}
                            title="Advanced Analytics"
                            desc="Real-time performance metrics with 7-day rolling totals and personal best tracking."
                        />
                        <FeatureCard 
                            icon={<Trophy className="text-yellow-500" size={32} />}
                            title="Global Leaderboards"
                            desc="Compete with runners worldwide. Powered by high-speed Redis caching for instant updates."
                        />
                        <FeatureCard 
                            icon={<Shield className="text-blue-500" size={32} />}
                            title="Secure & Private"
                            desc="Enterprise-grade JWT authentication ensures your fitness data stays in your hands."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                        <Activity size={20} className="text-stravaOrange" />
                        <span className="font-bold text-white tracking-tighter uppercase">Strava Lite</span>
                    </div>
                    <div className="flex gap-10 font-medium">
                        <a href="#" className="hover:text-stravaOrange transition-colors">Privacy</a>
                        <a href="#" className="hover:text-stravaOrange transition-colors">Terms</a>
                        <a href="#" className="hover:text-stravaOrange transition-colors">API</a>
                        <a href="#" className="hover:text-stravaOrange transition-colors">Support</a>
                    </div>
                    <p>&copy; 2026 Strava Lite. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-stravaOrange/30 transition-all duration-500 group transform hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-gray-400 leading-relaxed font-medium">
                {desc}
            </p>
        </div>
    );
}
