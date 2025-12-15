/**
 * Signal Routes
 */

const express = require('express');
const router = express.Router();
const signalController = require('../controllers/signalController');
const { requireAuth } = require('../middleware/authMiddleware');

// GET /api/signals
router.get('/', signalController.getAllSignals);

// GET /api/signals/:id
router.get('/:id', signalController.getSignalById);

// GET /api/signals/premium/list (protected)
router.get('/premium/list', requireAuth, signalController.getPremiumSignals);

module.exports = router;

