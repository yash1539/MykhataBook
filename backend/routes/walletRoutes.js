import express from 'express';
import { setupWallet, getWallet } from '../controllers/walletController.js';
const router = express.Router();
router.post('/setup', setupWallet);
router.get('/wallet/:id', getWallet);
export default router;