/**
 * Transaction Controller
 * Handles on-chain transaction related operations
 */

const mockData = require('../mockData.js');

/**
 * Get on-chain transactions
 * GET /api/transactions
 */
const getTransactions = (req, res) => {
  res.json({
    success: true,
    data: mockData.transactions,
    count: mockData.transactions.length
  });
};

module.exports = {
  getTransactions
};

