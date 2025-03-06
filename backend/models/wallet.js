// models/Wallet.js
import mongoose from 'mongoose';
const WalletSchema = new mongoose.Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  date: { type: Date, default: Date.now },
});
export default mongoose.model('Wallet', WalletSchema);