/**
 * Wallet Routes
 */

const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

// GET /api/wallets
router.get('/', walletController.getWallets);

module.exports = router;

