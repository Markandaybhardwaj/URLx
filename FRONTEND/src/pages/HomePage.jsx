import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import UrlForm from '../components/UrlForm';
import QrCodeForm from '../components/QrCodeForm';

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [activeFeature, setActiveFeature] = useState('shortener');
  const navigate = useNavigate();
  const { redirect, feature } = useSearch({ from: '/' });

  // On mount, check for a redirect from login or feature from navbar
  useEffect(() => {
    if (redirect) {
      setActiveFeature(redirect);
    } else if (feature === 'qrcode') {
      setActiveFeature('qrcode');
    } else {
      setActiveFeature('shortener');
    }
  }, [redirect, feature]);

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature);
    if (feature === 'qrcode') {
      navigate({ to: '/', search: { feature: 'qrcode' } });
    } else {
      navigate({ to: '/' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            {/* Logo/Brand */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                URLx
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your links into powerful tools. Shorten URLs, create QR codes, and build landing pages that convert.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started Free
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Toggle Section */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            Choose Your Tool
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => handleFeatureClick('shortener')}
              className={`flex-1 group relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                activeFeature === 'shortener' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                  : 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${activeFeature === 'shortener' ? 'bg-white/20' : 'bg-blue-100'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">URL Shortener</h3>
                  <p className="text-sm opacity-80">Create short, memorable links</p>
                </div>
              </div>
        </button>
            
        <button
          onClick={() => handleFeatureClick('qrcode')}
              className={`flex-1 group relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                activeFeature === 'qrcode' 
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg' 
                  : 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${activeFeature === 'qrcode' ? 'bg-white/20' : 'bg-green-100'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" strokeWidth="2" />
                    <path strokeWidth="2" d="M7 7h2v2H7zM15 7h2v2h-2zM7 15h2v2H7zM15 15h2v2h-2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">QR Code Generator</h3>
                  <p className="text-sm opacity-80">Generate custom QR codes</p>
                </div>
              </div>
        </button>
          </div>
        </div>
      </div>

      {/* Active Feature Area */}
      <div className="max-w-4xl mx-auto px-4 mb-20">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        {activeFeature === 'shortener' && <UrlForm />}
        {activeFeature === 'qrcode' && <QrCodeForm showQrOnMount={!!redirect && redirect === 'qrcode'} />}
        </div>
      </div>

      {/* Enhanced Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional tools to enhance your digital presence and track your success
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* URL Shortener Card */}
            <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mr-4">
                  <span className="text-2xl">🔗</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">URL Shortener</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                A free, fast, and reliable solution to shorten long URLs and track their performance in real time.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Clicks by location
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>New Delhi</span>
                    <span className="font-semibold text-blue-600">45 clicks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mumbai</span>
                    <span className="font-semibold text-purple-600">28 clicks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Generator Card */}
            <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl mr-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">QR Code Generator</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Generate branded, dynamic QR codes with color customization and real-time analytics.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="font-medium">Customizable styles</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="font-medium">Dynamic destinations</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="font-medium">Performance tracking</span>
                </div>
              </div>
            </div>

            {/* Landing Pages Card */}
            <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl mr-4">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Landing Pages</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Create mobile-optimized, fast-loading pages to showcase your brand and increase conversions.
              </p>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                <div className="flex items-center text-sm text-gray-700">
                  <span className="text-xl mr-2">⚡</span>
                  <span className="font-medium">Ready in minutes — no coding required.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">10M+</div>
            <div className="text-gray-600">Links Created</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">500K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;