import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import CreateRunPage from './pages/CreateRunPage';

function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/" />;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                <Route path="/leaderboard" element={<PrivateRoute><LeaderboardPage /></PrivateRoute>} />
                <Route path="/log-run" element={<PrivateRoute><CreateRunPage /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
