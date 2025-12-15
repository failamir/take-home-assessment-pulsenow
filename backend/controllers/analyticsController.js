/**
 * Analytics Controller
 * Handles analytics data operations
 */

const mockData = require('../mockData.js');

/**
 * Get analytics data
 * GET /api/analytics
 */
const getAnalytics = (req, res) => {
  res.json({
    success: true,
    data: mockData.analytics
  });
};

module.exports = {
  getAnalytics
};

