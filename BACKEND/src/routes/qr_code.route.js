import express from 'express';
import { createQrCodeController, getUserQrCodesController } from '../controller/qr_code.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create a new QR code
router.post('/', authMiddleware, createQrCodeController);

// Get user's QR code history
router.get('/', authMiddleware, getUserQrCodesController);

export default router; 