const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import mock data
const mockData = require('./mockData.js');

// Import routes
const authRoutes = require('./routes/authRoutes');
const signalRoutes = require('./routes/signalRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const walletRoutes = require('./routes/walletRoutes');
const verificationRoutes = require('./routes/verificationRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// Middleware
// ============================================
app.use(cors());
app.use(express.json());

// ============================================
// API Routes
// ============================================
app.use('/api/auth', authRoutes);
app.use('/api/signals', signalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api', verificationRoutes);

// ============================================
// Health Check
// ============================================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'PulseNow Assessment Backend API'
  });
});

// ============================================
// Start Server
// ============================================
app.listen(PORT, () => {
  console.log(`🚀 PulseNow Backend API running on http://localhost:${PORT}`);
});

