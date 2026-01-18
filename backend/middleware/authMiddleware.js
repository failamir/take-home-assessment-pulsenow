/**
 * Authentication Middleware
 * Handles wallet-based authentication and session verification
 */

// Placeholder for storing authenticated sessions
const authenticatedSessions = new Map();

/**
 * Middleware to check authentication
 * Verifies session token and attaches user info to request
 */
const requireAuth = (req, res, next) => {
  const sessionToken = req.headers.authorization?.replace('Bearer ', '');

  if (!sessionToken) {
    return res.status(401).json({ success: false, message: 'No authentication token provided' });
  }

  const session = getSession(sessionToken);

  if (!session) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session' });
  }

  // Attach user info to request
  req.user = session;
  next();
};

/**
 * Get authenticated session by token
 */
const getSession = (token) => {
  return authenticatedSessions.get(token);
};

/**
 * Set authenticated session
 */
const setSession = (token, sessionData) => {
  authenticatedSessions.set(token, sessionData);
};

/**
 * Remove authenticated session
 */
const removeSession = (token) => {
  authenticatedSessions.delete(token);
};

module.exports = {
  requireAuth,
  getSession,
  setSession,
  removeSession,
  authenticatedSessions
};

