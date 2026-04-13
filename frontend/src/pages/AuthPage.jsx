import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

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
                const res = await api.post('/auth/signup', { name, email, password, age: 25, weight: 150 });
                // Instantly login upon signup for slick UX
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
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-darkCard p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-800">
                <h1 className="text-3xl font-bold text-center text-white mb-6">
                    Strava <span className="text-stravaPink">Lite</span>
                </h1>
                
                {error && <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-4 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    {!isLogin && (
                        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="p-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-stravaPink transition-colors" />
                    )}
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-stravaPink transition-colors" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-stravaPink transition-colors" />
                    
                    <button type="submit" disabled={loading} className="p-3 bg-stravaPink text-white font-bold rounded hover:bg-pink-600 transition-colors disabled:opacity-50">
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    {isLogin ? "Don't have an account? " : "Already registered? "}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-stravaPink hover:underline">
                        {isLogin ? "Sign up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}
