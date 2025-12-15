import React, { useState } from 'react';
import './SignalsDashboard.css';
import SignalCard from './SignalCard';

// ============================================
// TASK 1: Smart Contract Integration & Signal Verification
// ============================================
// TODO: Integrate with smart contract to verify signals
// 1. Create/use a smart contract that stores signal hashes
// 2. When a signal is displayed, check if it's verified on-chain
// 3. Show verification status (verified badge, on-chain hash)
// 4. Implement "Verify Signal" button that writes to contract
// 5. Handle transaction states (pending, success, error)

const SignalsDashboard = ({ signals, loading, isAuthenticated, subscriptionTier }) => {
  const [filter, setFilter] = useState('all');
  const [verifyingSignals, setVerifyingSignals] = useState(new Set());

  const handleVerifySignal = async (signalId) => {
    // TODO: Implement signal verification on-chain
    // 1. Generate hash of signal data
    // 2. Connect to smart contract
    // 3. Call verifySignal function
    // 4. Update UI with verification status
    // 5. Handle transaction confirmation

    setVerifyingSignals(prev => new Set(prev).add(signalId));
    
    try {
      // Placeholder - implement actual smart contract interaction
      console.log('Verifying signal:', signalId);
      
      // Simulate verification (remove this)
      setTimeout(() => {
        setVerifyingSignals(prev => {
          const next = new Set(prev);
          next.delete(signalId);
          return next;
        });
        alert('Signal verification not implemented yet. Please implement smart contract interaction.');
      }, 2000);
    } catch (error) {
      console.error('Verification error:', error);
      setVerifyingSignals(prev => {
        const next = new Set(prev);
        next.delete(signalId);
        return next;
      });
    }
  };

  const filteredSignals = signals.filter(signal => {
    if (filter === 'all') return true;
    if (filter === 'verified') return signal.verified === true;
    if (filter === 'bullish') return signal.signalType === 'BULLISH';
    if (filter === 'bearish') return signal.signalType === 'BEARISH';
    return true;
  });

  const premiumSignals = signals.filter(s => s.confidence > 0.8);

  if (loading) {
    return (
      <div className="card signals-dashboard">
        <div className="loading">Loading signals...</div>
      </div>
    );
  }

  return (
    <div className="card signals-dashboard">
      <div className="dashboard-header">
        <h2 className="card-title">Trading Signals</h2>
        <div className="dashboard-controls">
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'verified' ? 'active' : ''}
              onClick={() => setFilter('verified')}
            >
              Verified
            </button>
            <button 
              className={filter === 'bullish' ? 'active' : ''}
              onClick={() => setFilter('bullish')}
            >
              Bullish
            </button>
            <button 
              className={filter === 'bearish' ? 'active' : ''}
              onClick={() => setFilter('bearish')}
            >
              Bearish
            </button>
          </div>
        </div>
      </div>

      {!isAuthenticated && premiumSignals.length > 0 && (
        <div className="premium-banner">
          <span>🔒 {premiumSignals.length} premium signals available</span>
          <span>Connect wallet to access</span>
        </div>
      )}

      <div className="signals-list">
        {filteredSignals.map(signal => (
          <SignalCard
            key={signal.id}
            signal={signal}
            onVerify={handleVerifySignal}
            isVerifying={verifyingSignals.has(signal.id)}
            canAccessPremium={subscriptionTier === 'premium' || !(signal.confidence > 0.8)}
          />
        ))}
      </div>

      {filteredSignals.length === 0 && (
        <div className="empty-state">
          No signals found matching the current filter.
        </div>
      )}
    </div>
  );
};

export default SignalsDashboard;

