import React from 'react';
import { Link } from '@tanstack/react-router';

const products = [
  {
    icon: (
      <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
    title: 'URL Shortener',
    desc: 'Customize, share and track links',
    link: '/'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" /><path strokeWidth="2" d="M7 7h2v2H7zM15 7h2v2h-2zM7 15h2v2H7zM15 15h2v2h-2z" /></svg>
    ),
    title: 'QR Code Generator',
    desc: 'Dynamic solutions for every business need',
    link: '/'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeWidth="2" d="M8 12h8M12 8v8" /></svg>
    ),
    title: 'Link in Bio',
    desc: 'Curate and track links for social media profiles',
    link: '/p/demo'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4M7 7h.01M7 11h.01M7 15h.01" /></svg>
    ),
    title: 'Analytics Dashboard',
    desc: 'A central place to track and analyze performance',
    link: '/dashboard'
  },
];

const integrations = [
  { name: 'Zapier', icon: '🤖' },
  { name: 'Canva', icon: '🎨' },
];

const discover = [
  { name: 'API & Documentation', link: '#' },
  { name: 'Help Center', link: '#' },
];

const FeaturesPage = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    {/* Main Content */}
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-8">Products & Features</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
        {products.map((p) => (
          <div key={p.title} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start hover:shadow-xl transition-shadow">
            <div className="mb-4">{p.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
            <p className="text-gray-600 mb-4">{p.desc}</p>
            <Link to={p.link} className="mt-auto text-indigo-600 hover:underline font-semibold">Learn more →</Link>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-bold mb-4">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 flex items-center gap-4 shadow">
          <span className="bg-indigo-100 text-indigo-600 rounded-full p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" /></svg></span>
          <div>
            <div className="font-semibold">Branded Links</div>
            <div className="text-gray-500 text-sm">Customize links with your brand's URL</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 flex items-center gap-4 shadow">
          <span className="bg-green-100 text-green-600 rounded-full p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg></span>
          <div>
            <div className="font-semibold">Mobile Links</div>
            <div className="text-gray-500 text-sm">Short links for SMS messages</div>
          </div>
        </div>
      </div>
    </div>
    {/* Sidebar */}
    <aside className="w-full md:w-80 bg-white border-l p-8 flex flex-col gap-8">
      <div>
        <h3 className="font-bold mb-3">Integrations</h3>
        <div className="flex flex-col gap-3">
          {integrations.map((i) => (
            <div key={i.name} className="flex items-center gap-2">
              <span className="text-2xl">{i.icon}</span>
              <span>{i.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-3">Discover More</h3>
        <div className="flex flex-col gap-2">
          {discover.map((d) => (
            <a key={d.name} href={d.link} className="text-indigo-600 hover:underline">{d.name}</a>
          ))}
        </div>
      </div>
    </aside>
  </div>
);

export default FeaturesPage; 