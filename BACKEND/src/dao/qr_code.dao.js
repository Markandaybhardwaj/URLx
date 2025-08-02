import QrCode from '../models/qr_code.model.js';

export const createQrCode = async (userId, data, styleOptions, image) => {
  return await QrCode.create({ user: userId, data, styleOptions, image });
};

export const getUserQrCodes = async (userId) => {
  return await QrCode.find({ user: userId }).sort({ createdAt: -1 });
}; 