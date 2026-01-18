/**
 * Signal Controller
 * Handles market signal related operations
 */

const mockData = require('../mockData.js');

/**
 * Get all market signals
 * GET /api/signals
 */
const getAllSignals = (req, res) => {
  res.json({
    success: true,
    data: mockData.signals,
    count: mockData.signals.length
  });
};

/**
 * Get signal by ID
 * GET /api/signals/:id
 */
const getSignalById = (req, res) => {
  const signal = mockData.signals.find(s => s.id === req.params.id);
  if (!signal) {
    return res.status(404).json({ error: 'Signal not found' });
  }
  res.json({ success: true, data: signal });
};

/**
 * Get premium signals (protected route - requires premium subscription)
 * GET /api/signals/premium/list
 */
const getPremiumSignals = (req, res) => {
  // Check subscription tier (middleware should have attached req.user)
  if (!req.user || req.user.subscriptionTier !== 'premium') {
    return res.status(403).json({
      success: false,
      message: 'Premium subscription required to access these signals'
    });
  }

  // Premium signals are signals with confidence > 0.8
  const premiumSignals = mockData.signals.filter(s => s.confidence > 0.8);
  res.json({
    success: true,
    data: premiumSignals,
    count: premiumSignals.length
  });
};

module.exports = {
  getAllSignals,
  getSignalById,
  getPremiumSignals
};

