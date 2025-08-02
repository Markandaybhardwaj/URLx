import React, { useState } from 'react';
import UserUrl from '../components/UserUrl';
import UserQrCodes from '../components/UserQrCodes';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('urls');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
        
        {/* Tab Navigation */}
        <div className="flex justify-center border-b mb-6">
          <button
            onClick={() => setActiveTab('urls')}
            className={`px-6 py-2 font-semibold ${activeTab === 'urls' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
          >
            URL History
          </button>
          <button
            onClick={() => setActiveTab('qrcodes')}
            className={`px-6 py-2 font-semibold ${activeTab === 'qrcodes' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
          >
            QR Code History
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'urls' && <UserUrl />}
          {activeTab === 'qrcodes' && <UserQrCodes />}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;