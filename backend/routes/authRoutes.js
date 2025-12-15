/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/verify-signature
router.post('/verify-signature', authController.verifySignature);

module.exports = router;

