/**
 * User Routes
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');

// GET /api/users/:address (protected)
router.get('/:address', requireAuth, userController.getUserProfile);

module.exports = router;

