/**
 * Wallet Controller
 * Handles wallet data operations
 */

const mockData = require('../mockData.js');

/**
 * Get wallet data
 * GET /api/wallets
 */
const getWallets = (req, res) => {
  res.json({
    success: true,
    data: mockData.wallets,
    count: mockData.wallets.length
  });
};

module.exports = {
  getWallets
};

