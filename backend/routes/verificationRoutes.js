/**
 * Verification Routes
 */

const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');

// POST /api/verify-data-integrity
router.post('/verify-data-integrity', verificationController.verifyDataIntegrity);

module.exports = router;

