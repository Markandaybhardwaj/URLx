import React, { useState, useEffect } from 'react'
import { useSearch } from '@tanstack/react-router'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
    const { mode } = useSearch({ from: '/auth' })
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        setIsLogin(mode !== 'register')
    }, [mode])

    const handleGoogleLogin = () => {
        // Redirect to the backend Google auth route
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                {isLogin ? (
                    <LoginForm />
                ) : (
                    <RegisterForm />
                )}

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 font-semibold">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 transition-colors duration-300"
                >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                        <path fill="#4285F4" d="M24 9.5c3.9 0 6.9 1.6 9.1 3.7l6.9-6.9C35.2 2.5 30.1 0 24 0 14.8 0 7.3 5.5 3 13.4l8.3 6.5C12.9 13.2 18 9.5 24 9.5z"></path>
                        <path fill="#34A853" d="M46.2 25.4c0-1.8-.2-3.5-.5-5.2H24v9.9h12.5c-.5 3.2-2.3 5.9-5.1 7.8l7.8 6c4.6-4.2 7.3-10.4 7.3-18.5z"></path>
                        <path fill="#FBBC05" d="M12.9 19.9C12.3 18.2 12 16.4 12 14.5s.3-3.7.9-5.4L3 2.6C1.1 6.3 0 10.3 0 14.5s1.1 8.2 3 11.9l9.9-7.5z"></path>
                        <path fill="#EA4335" d="M24 48c6.1 0 11.2-2 14.9-5.4l-7.8-6c-2.8 1.9-6.4 3-10.1 3-5.9 0-11-3.7-13.6-8.8l-8.3 6.5C7.3 42.5 14.8 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}

export default AuthPage