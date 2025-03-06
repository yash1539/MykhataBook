// models/Transaction.js
import mongoose from 'mongoose';
const TransactionSchema = new mongoose.Schema({
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet', required: true },
  amount: { type: Number, required: true },
  balance: { type: Number, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['CREDIT', 'DEBIT'], required: true },
  date: { type: Date, default: Date.now },
});
export default mongoose.model('Transaction', TransactionSchema);
