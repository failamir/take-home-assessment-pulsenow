/**
 * Signal Routes
 */

const express = require('express');
const router = express.Router();
const signalController = require('../controllers/signalController');
const { requireAuth, requirePremium } = require('../middleware/authMiddleware');

// GET /api/signals
router.get('/', signalController.getAllSignals);

// GET /api/signals/:id
router.get('/:id', signalController.getSignalById);

// GET /api/signals/premium/list (protected - requires authentication and premium tier)
router.get('/premium/list', requireAuth, requirePremium, signalController.getPremiumSignals);

module.exports = router;

