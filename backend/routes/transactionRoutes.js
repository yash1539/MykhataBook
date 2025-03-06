import express from 'express';
import { transact, getTransactions } from '../controllers/transactionController.js';
const router = express.Router();
router.post('/transact/:walletId', transact);
router.get('/transactions', getTransactions);
export default router;