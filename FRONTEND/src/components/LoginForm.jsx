import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { authRoute } from '../routing/auth.route.js';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { redirect } = useSearch({ from: '/auth' });
    console.log(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await loginUser(email, password);
            dispatch(login(data.user));
            if (redirect) {
                navigate({ to: '/', search: { redirect } });
            } else {
                navigate({ to: "/dashboard" });
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh] animate-fade-in">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md animate-shake">
                        {error}
                    </div>
                )}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                        id="email"
                        type="email"
                        placeholder="test@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                        id="password"
                        type="password"
                        placeholder="password123"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                    <button
                    className={`w-full flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={loading}
                    >
                    {loading && (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                    )}
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                <div className="text-center mt-2">
                    <p className="cursor-pointer text-sm text-gray-600">
                        Don't have an account? <span onClick={() => navigate({ to: '/auth?mode=register' })} className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">Register</span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;