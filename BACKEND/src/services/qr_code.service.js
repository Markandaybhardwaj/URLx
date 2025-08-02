import { createQrCode, getUserQrCodes } from '../dao/qr_code.dao.js';

export const createUserQrCode = async (userId, data, styleOptions, image) => {
  return await createQrCode(userId, data, styleOptions, image);
};

export const fetchUserQrCodes = async (userId) => {
  return await getUserQrCodes(userId);
}; 