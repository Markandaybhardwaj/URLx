import { createUserQrCode, fetchUserQrCodes } from '../services/qr_code.service.js';

export const createQrCodeController = async (req, res) => {
  try {
    const { data, styleOptions, image } = req.body;
    const userId = req.user._id;
    if (!data || !image) {
      return res.status(400).json({ message: 'Data and image are required.' });
    }
    const qrCode = await createUserQrCode(userId, data, styleOptions, image);
    res.status(201).json(qrCode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserQrCodesController = async (req, res) => {
  try {
    const userId = req.user._id;
    const qrCodes = await fetchUserQrCodes(userId);
    res.json({ qrCodes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 