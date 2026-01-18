/**
 * Authentication Controller
 * Handles wallet signature verification and authentication
 */

const { ethers } = require('ethers');
const crypto = require('crypto');

// In-memory session storage (in production, use Redis or database)
const sessions = new Map();

/**
 * Verify wallet signature and create session
 * POST /api/auth/verify-signature
 */
const verifySignature = async (req, res) => {
  try {
    const { address, message, signature } = req.body;

    if (!address || !message || !signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: address, message, signature'
      });
    }

    // Verify signature using ethers.js
    const recoveredAddress = ethers.verifyMessage(message, signature);

    // Check if recovered address matches provided address
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: 'Signature verification failed: address mismatch'
      });
    }

    // Generate session token
    const sessionToken = crypto.randomBytes(32).toString('hex');

    // Determine subscription tier (mock logic based on address)
    // In production, this would check against a database or smart contract
    const subscriptionTier = isPremiumAddress(address) ? 'premium' : 'free';

    // Create user session
    const userSession = {
      address: address.toLowerCase(),
      sessionToken,
      subscriptionTier,
      createdAt: Date.now(),
      signalsAccessed: 0,
      apiCalls: 0
    };

    // Store session
    sessions.set(sessionToken, userSession);

    // Return session data
    res.json({
      success: true,
      data: {
        sessionToken,
        address: address.toLowerCase(),
        subscriptionTier,
        signalsAccessed: 0,
        apiCalls: 0
      }
    });

  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Mock function to determine if address has premium subscription
 * In production, check smart contract or database
 */
function isPremiumAddress(address) {
  // For testing: addresses ending in even numbers are premium
  const lastChar = address.slice(-1).toLowerCase();
  return ['0', '2', '4', '6', '8', 'a', 'c', 'e'].includes(lastChar);
}

/**
 * Get session by token
 */
function getSession(token) {
  return sessions.get(token);
}

/**
 * Delete session
 */
function deleteSession(token) {
  sessions.delete(token);
}

module.exports = {
  verifySignature,
  getSession,
  deleteSession
};
