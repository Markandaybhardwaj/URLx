import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useSelector } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { createQrCode } from '../api/qrCode.api.js';
import { useQueryClient } from '@tanstack/react-query';

const SIZES = [64, 128];
const FORMATS = ['PNG', 'JPG'];

const QrCodeForm = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [data, setData] = useState('');
  const [styleOptions, setStyleOptions] = useState({
    dotsColor: '#000000',
    backgroundColor: '#ffffff',
    margin: 0,
    logo: null,
  });
  const [qrInstance, setQrInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [size, setSize] = useState(128);
  const [format, setFormat] = useState('PNG');
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

  // Animation on appear
  useEffect(() => {
    document.getElementById('qr-form-animated')?.classList.add('animate-fade-in-scale');
  }, []);

  // QR code instance
  useEffect(() => {
    if (qrRef.current && showQr) {
      const qrCode = new QRCodeStyling({
        width: size,
        height: size,
        data: data,
        image: styleOptions.logo || '',
        dotsOptions: {
          color: styleOptions.dotsColor,
          type: 'rounded',
        },
        backgroundOptions: {
          color: styleOptions.backgroundColor,
        },
        margin: styleOptions.margin,
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 0,
        },
      });
      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
      setQrInstance(qrCode);
    }
  }, [user, showQr, size, format]);

  useEffect(() => {
    if (qrInstance && showQr) {
      qrInstance.update({
        data,
        dotsOptions: { color: styleOptions.dotsColor },
        backgroundOptions: { color: styleOptions.backgroundColor },
        margin: styleOptions.margin,
        image: styleOptions.logo || '',
      });
    }
  }, [data, styleOptions, qrInstance, showQr]);

  const handleStyleChange = (e) => {
    setStyleOptions({ ...styleOptions, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setStyleOptions((prev) => ({ ...prev, logo: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (qrInstance) {
      const ext = format.toLowerCase();
      qrInstance.download({ name: 'qrcode', extension: ext });
    }
  };

  const handleCopy = async () => {
    if (qrInstance) {
      const image = await qrInstance.getRawData(format.toLowerCase());
      const blob = new Blob([image], { type: `image/${format.toLowerCase()}` });
      try {
        await navigator.clipboard.write([
          new window.ClipboardItem({ [`image/${format.toLowerCase()}`]: blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        setError('Failed to copy QR code.');
      }
    }
  };

  const handleGenerate = () => {
    if (!isAuthenticated) {
      localStorage.setItem('pendingQrData', data);
      alert('LOGIN Your QR is waiting');
      navigate({ to: '/auth', search: { redirect: 'qrcode' } });
      return;
    }
    setShowQr(true);
  };

  useEffect(() => {
    if (isAuthenticated && localStorage.getItem('pendingQrData')) {
      setData(localStorage.getItem('pendingQrData'));
      localStorage.removeItem('pendingQrData');
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-blue-100 py-8 px-2">
      <div id="qr-form-animated" className="w-full max-w-5xl flex flex-col md:flex-row gap-8 bg-transparent animate-fade-in-scale">
        {/* Left: Form */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <label className="font-semibold text-lg">Website URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Paste a URL below to link with your QR code"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <span className="bg-blue-100 p-2 rounded-md">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" /><path strokeWidth="2" d="M7 7h2v2H7zM15 7h2v2h-2zM7 15h2v2H7zM15 15h2v2h-2z" /></svg>
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <label className="font-semibold text-lg">Customize your QR code</label>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm">Background color</label>
                <input type="color" name="backgroundColor" value={styleOptions.backgroundColor} onChange={handleStyleChange} className="w-12 h-8 border rounded" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm">Foreground color</label>
                <input type="color" name="dotsColor" value={styleOptions.dotsColor} onChange={handleStyleChange} className="w-12 h-8 border rounded" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Margin</label>
              <input type="range" min={0} max={10} value={styleOptions.margin} name="margin" onChange={handleStyleChange} className="w-full" />
              <span className="text-xs text-gray-500">{styleOptions.margin}</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Upload a logo (optional, PNG, max 2MB)</label>
              <input type="file" accept="image/png" onChange={handleLogoUpload} className="border rounded p-1" />
              {styleOptions.logo && <img src={styleOptions.logo} alt="Logo preview" className="w-16 h-16 object-contain mt-2 rounded" />}
            </div>
          </div>
        </div>
        {/* Right: QR Preview & Export */}
        <div className="flex-1 flex flex-col items-center bg-white rounded-xl shadow p-6 gap-6">
          <div className="text-lg font-semibold mb-2">QR code preview</div>
          <div className="flex items-center justify-center min-h-[160px]">
            {showQr && (
              <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 flex items-center justify-center animate-fade-in-scale" style={{ minWidth: size, minHeight: size }}>
                <div ref={qrRef} />
              </div>
            )}
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex-1">
              <label className="text-sm">Export size</label>
              <select value={size} onChange={e => setSize(Number(e.target.value))} className="w-full border rounded px-2 py-1">
                {SIZES.map(s => <option key={s} value={s}>{s} px</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-sm">Format</label>
              <select value={format} onChange={e => setFormat(e.target.value)} className="w-full border rounded px-2 py-1">
                {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={!data || loading}
            className={`w-full py-2 mt-2 rounded-lg font-bold text-lg transition-all duration-200 ${!data ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'}`}
          >
            Generate
          </button>
          {showQr && (
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 hover:scale-105 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg>
                Download
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 hover:scale-105 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" /><rect x="3" y="3" width="13" height="13" rx="2" /></svg>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
      {/* Animation keyframes */}
      <style>{`
        @keyframes fade-in-scale {
          0% { opacity: 0; transform: scale(0.95) translateY(30px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.7s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default QrCodeForm; 