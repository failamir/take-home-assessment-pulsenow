/**
 * Authentication Controller
 * Handles wallet signature verification and authentication
 */

const { getSession, setSession } = require('../middleware/authMiddleware');
const crypto = require('crypto');
const { ethers } = require('ethers');
const mockData = require('../mockData');

/**
 * Verify wallet signature and create session
 * POST /api/auth/verify-signature
 */
const verifySignature = async (req, res) => {
  try {
    const { address, message, signature } = req.body;

    if (!address || !message || !signature) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // 1. Recover the signer address from the signature
    const recoveredAddress = ethers.verifyMessage(message, signature);

    // 2. Verify it matches the provided address
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ success: false, message: 'Invalid signature' });
    }

    // 3. Find user profile or create default
    let userProfile = mockData.userProfiles.find(u => u.walletAddress.toLowerCase() === address.toLowerCase());

    // Default profile if not found in mock data
    if (!userProfile) {
      userProfile = {
        walletAddress: address,
        subscriptionTier: 'free',
        subscriptionExpiry: null,
        joinedDate: new Date().toISOString(),
        signalsAccessed: 0,
        apiCallsThisMonth: 0,
        favoriteTokens: []
      };
    }

    // 4. Create a session token (mock logic)
    const token = crypto.randomUUID();

    // In a real app, we would store this token in a DB/Redis
    // Store session
    setSession(token, {
      address,
      tier: userProfile.subscriptionTier,
      walletAddress: userProfile.walletAddress
    });

    // 5. Return session info
    res.json({
      success: true,
      data: {
        token,
        user: userProfile,
        subscriptionTier: userProfile.subscriptionTier
      }
    });

  } catch (error) {
    console.error('Auth Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  verifySignature
};

