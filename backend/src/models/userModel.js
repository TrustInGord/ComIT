import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  gameState: {
    money: { type: Number, default: 1000 },
    currentDay: { type: Number, default: 1 },
    purchasedItems: { type: [Number], default: [] }
  }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema, 'wrestlebestdb_collection');