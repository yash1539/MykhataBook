// controllers/walletController.js
import Wallet from "../models/wallet.js";
import Transaction from "../models/Transaction.js";

export const setupWallet = async (req, res) => {
  try {
    const { name, balance } = req.body;
    const wallet = new Wallet({ name, balance });
    await wallet.save();
    const transaction = new Transaction({
      walletId: wallet._id,
      amount: balance,
      balance,
      description: "Setup",
      type: "CREDIT",
    });

    res.status(200).json({
      id: wallet._id,
      name: wallet.name,
      balance: wallet.balance.toFixed(4),
      transactionId: transaction._id.toString(),
      date: transaction.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.id);
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    res.status(200).json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
