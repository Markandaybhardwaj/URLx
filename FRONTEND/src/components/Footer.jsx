import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Why Use It? Column */}
          <div className="col-span-1">
            <h3 className="text-orange-400 font-bold mb-4">Why Use It?</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Easy to Use</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Free & Fast</a></li>
              <li><a href="#" className="hover:underline">Custom Links</a></li>
            </ul>
          </div>

          {/* Features Column */}
          <div className="col-span-1">
            <h3 className="text-orange-400 font-bold mb-4">Features</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">URL Shortening</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">QR Code Generator</a></li>
              <li><a href="#" className="hover:underline">Analytics Dashboard</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="col-span-1">
            <h3 className="text-orange-400 font-bold mb-4">Resources</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Blog</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">API Docs</a></li>
              <li><a href="#" className="hover:underline">Help Center</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-1">
            <h3 className="text-orange-400 font-bold mb-4">Legal</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Terms of Use</a></li>
              <li><a href="#" className="hover:underline">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Developer Info Column */}
          <div className="col-span-1">
            <h3 className="text-orange-400 font-bold mb-4">Developer Info</h3>
            <p className="font-semibold">Markanday Bhardwaj</p>
            <a href="mailto:markandaybhardwaj1183@gmail.com" className="text-blue-300 hover:underline">
              markandaybhardwaj1183@gmail.com
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 border-t border-blue-800 pt-6 text-center text-sm text-blue-300">
          <p>&copy; 2025 Markanday Bhardwaj. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 