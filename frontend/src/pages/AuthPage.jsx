import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Activity, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                const res = await api.post('/auth/login', { email, password });
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_id', res.data.user.id);
                navigate('/dashboard');
            } else {
                await api.post('/auth/signup', { name, email, password, age: 25, weight: 150 });
                const loginRes = await api.post('/auth/login', { email, password });
                localStorage.setItem('token', loginRes.data.token);
                localStorage.setItem('user_id', loginRes.data.user.id);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || 'Authentication Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1d] flex items-center justify-center p-6 selection:bg-stravaOrange/30">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-stravaOrange/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-stravaPink/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="w-full max-w-5xl bg-[#111827]/80 backdrop-blur-2xl rounded-[40px] border border-white/5 overflow-hidden shadow-2xl flex flex-col md:flex-row">
                {/* Left Side: Illustration/Promo */}
                <div className="md:w-1/2 bg-gradient-to-br from-stravaOrange to-stravaPink p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-32 -mt-32"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                <Activity size={24} className="text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter italic">STRAVA <span className="opacity-80">LITE</span></span>
                        </div>
                        
                        <h2 className="text-5xl font-black tracking-tighter leading-tight mb-6 uppercase">
                            Push Your <br />Limits.
                        </h2>
                        <p className="text-white/80 text-lg font-medium max-w-sm mb-12">
                            Join the community of elite runners tracking their progress.
                        </p>
                        
                        <div className="space-y-4">
                            <BenefitItem text="Real-time performance analytics" />
                            <BenefitItem text="Global leaderboard rankings" />
                            <BenefitItem text="Secure data synchronization" />
                        </div>
                    </div>

                    <div className="relative z-10 pt-12">
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Trusted by athletes worldwide</p>
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-stravaOrange bg-gray-800 flex items-center justify-center text-[10px] font-bold">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-1/2 p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h3 className="text-3xl font-black tracking-tight text-white mb-2 uppercase">
                            {isLogin ? 'Welcome Back' : 'Get Started'}
                        </h3>
                        <p className="text-gray-400 font-medium">
                            {isLogin ? 'Sign in to access your stats.' : 'Create your athlete profile.'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold flex items-center gap-3">
                            <Activity size={16} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-stravaOrange/50 focus:ring-4 ring-stravaOrange/10 transition-all outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-stravaOrange/50 focus:ring-4 ring-stravaOrange/10 transition-all outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-stravaOrange/50 focus:ring-4 ring-stravaOrange/10 transition-all outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg hover:bg-stravaOrange hover:text-white transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {loading ? 'Processing...' : (isLogin ? 'SIGN IN' : 'CREATE ACCOUNT')}
                            {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 font-medium">
                            {isLogin ? "New to Strava Lite?" : "Already an athlete?"}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-white font-black hover:text-stravaOrange transition-colors"
                            >
                                {isLogin ? 'Create Account' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BenefitItem({ text }) {
    return (
        <div className="flex items-center gap-3 text-white/90 font-bold">
            <CheckCircle2 size={18} className="text-white" />
            <span>{text}</span>
        </div>
    );
}
