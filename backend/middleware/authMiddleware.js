/**
 * Authentication Middleware
 * Handles wallet-based authentication and session verification
 */

const { getSession } = require('../controllers/authController');

/**
 * Middleware to check authentication
 * Verifies session token and attaches user info to request
 */
const requireAuth = (req, res, next) => {
  const sessionToken = req.headers.authorization?.replace('Bearer ', '');

  if (!sessionToken) {
    return res.status(401).json({
      success: false,
      message: 'No authorization token provided'
    });
  }

  // Get session from authController
  const session = getSession(sessionToken);

  if (!session) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session'
    });
  }

  // Attach user session to request
  req.user = session;

  next();
};

/**
 * Middleware to require premium subscription
 */
const requirePremium = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (req.user.subscriptionTier !== 'premium') {
    return res.status(403).json({
      success: false,
      message: 'Premium subscription required'
    });
  }

  next();
};

module.exports = {
  requireAuth,
  requirePremium
};

