import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '../store/slice/authSlice';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    queryClient.clear();
    navigate({ to: '/' });
  };

  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Section: Logo and Nav Links */}
          <div className="flex items-center space-x-10">
            <Link to="/" className="text-3xl font-bold text-orange-400 tracking-tight drop-shadow-sm hover:scale-105 transition-transform">
              URLx
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="#" className="hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 px-2 py-1 rounded transition-colors duration-200">Product</Link>
              <Link to="#" className="hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 px-2 py-1 rounded transition-colors duration-200">Feature</Link>
            </div>
          </div>

          {/* Center Section: Main Features */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              className="px-6 py-3 text-lg font-semibold rounded-lg hover:bg-orange-400 hover:text-blue-900 transition-all duration-200 hover:scale-105"
            >
              URL Shortener
            </Link>
            <Link 
              to="/?feature=qrcode" 
              className="px-6 py-3 text-lg font-semibold rounded-lg hover:bg-orange-400 hover:text-blue-900 transition-all duration-200 hover:scale-105"
            >
              QR Code
            </Link>
          </div>

          {/* Right Section: Auth buttons */}
          <div className="hidden md:flex items-center space-x-5">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-md text-sm font-semibold shadow-md hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 transition-all duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2.5 rounded-md text-sm font-semibold shadow-sm hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth?mode=login"
                  className="hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 font-semibold px-3 py-2 rounded transition-colors duration-200"
                >
                  Log in
                </Link>
                <Link
                  to="/auth?mode=register"
                  className="bg-white text-blue-900 hover:bg-gray-200 px-5 py-2.5 rounded-md text-sm font-semibold shadow-md hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 transition-all duration-200"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="text-white hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded p-1 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;