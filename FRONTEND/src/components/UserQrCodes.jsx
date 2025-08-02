import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserQrCodes } from '../api/qrCode.api.js';

const UserQrCodes = () => {
  const { data: qrCodes, isLoading, isError, error } = useQuery({
    queryKey: ['userQrcodes'],
    queryFn: getUserQrCodes,
  });

  if (isLoading) return <p>Loading QR codes...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {qrCodes.map((qr) => (
        <div key={qr._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
          <img src={qr.image} alt="QR Code" className="w-48 h-48 mb-4" />
          <p className="font-mono text-sm break-all mb-2">{qr.data}</p>
          <a
            href={qr.image}
            download={`qrcode-${qr._id}.png`}
            className="mt-auto w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
};

export default UserQrCodes; 