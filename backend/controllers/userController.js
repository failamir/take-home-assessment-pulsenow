/**
 * User Controller
 * Handles user profile related operations
 */

const mockData = require('../mockData.js');

/**
 * Get user profile by wallet address
 * GET /api/users/:address
 */
const getUserProfile = (req, res) => {
  const profile = mockData.userProfiles.find(
    p => p.walletAddress.toLowerCase() === req.params.address.toLowerCase()
  );
  
  if (!profile) {
    // Return default free user profile
    return res.json({
      success: true,
      data: {
        walletAddress: req.params.address,
        subscriptionTier: 'free',
        subscriptionExpiry: null,
        joinedDate: new Date().toISOString(),
        signalsAccessed: 0,
        apiCallsThisMonth: 0,
        favoriteTokens: []
      }
    });
  }
  
  res.json({ success: true, data: profile });
};

module.exports = {
  getUserProfile
};

