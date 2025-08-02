import axiosInstance from '../utils/axiosInstance';

export const createQrCode = async (qrCodeData) => {
  try {
    const response = await axiosInstance.post('/api/qrcodes', qrCodeData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create QR code.');
  }
};

export const getUserQrCodes = async () => {
  try {
    const response = await axiosInstance.get('/api/qrcodes');
    return response.data.qrCodes;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch QR code history.');
  }
}; 