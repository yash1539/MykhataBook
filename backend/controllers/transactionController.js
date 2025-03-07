// controllers/transactionController.js
import Wallet from "../models/wallet.js"; 
import Transaction from "../models/Transaction.js"; // Ensure Transaction is also imported

export const transact = async (req, res) => {
    try {
      const { amount, description } = req.body;
      if (!amount || !description ) return res.status(404).json({ message: 'Wallet not found' });

      const wallet = await Wallet.findById(req.params.walletId);
      if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
      
      const newBalance = wallet.balance + amount;
      if (newBalance < 0) return res.status(400).json({ message: 'Insufficient funds' });
      
      wallet.balance = newBalance;
      await wallet.save();
      
      const transaction = new Transaction({
        walletId: wallet._id,
        amount,
        balance: newBalance,
        description,
        type: amount > 0 ? 'CREDIT' : 'DEBIT',
      });
      await transaction.save();
      
      res.status(200).json({ balance: newBalance, transactionId: transaction._id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const getTransactions = async (req, res) => {
    try {
      const { walletId, skip = 0, limit = 10 } = req.query;
      const transactions = await Transaction.find({ walletId })
        .sort({ date: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
      res.status(200).json(transactions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };