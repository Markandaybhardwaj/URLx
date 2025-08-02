import mongoose from 'mongoose';

const qrCodeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  styleOptions: {
    type: Object,
    default: {},
  },
  image: {
    type: String, // base64 PNG/SVG
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('QrCode', qrCodeSchema); 