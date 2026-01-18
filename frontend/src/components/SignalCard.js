import React, { useState } from 'react';
import { BrowserProvider, Contract, keccak256, toUtf8Bytes } from 'ethers';
import './SignalCard.css';
import SignalVerifierABI from '../contracts/SignalVerifier.json';

const SignalCard = ({ signal, onVerify, isVerifying, canAccessPremium }) => {
  const [verifyingSignal, setVerifyingSignal] = useState(false);
  const [verificationError, setVerificationError] = useState(null);
  const [txHash, setTxHash] = useState(null);

  const isPremium = signal.confidence > 0.8;
  const isBlurred = isPremium && !canAccessPremium;

  const handleVerifyOnChain = async () => {
    setVerifyingSignal(true);
    setVerificationError(null);

    try {
      // Check if MetaMask is available
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      // Get provider and signer
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create contract instance
      const contract = new Contract(
        SignalVerifierABI.address,
        SignalVerifierABI.abi,
        signer
      );

      // Generate hash of signal data
      const signalData = `${signal.id}|${signal.timestamp}|${signal.token.address}|${signal.price}|${signal.signalType}`;
      const dataHash = keccak256(toUtf8Bytes(signalData));

      // Convert timestamp to seconds (blockchain timestamps are in seconds)
      const timestampSeconds = Math.floor(new Date(signal.timestamp).getTime() / 1000);

      // Call verify function on contract
      const tx = await contract.verifySignal(
        signal.id,
        dataHash,
        timestampSeconds
      );

      setTxHash(tx.hash);

      // Wait for transaction confirmation
      const receipt = await tx.wait();

      console.log('Signal verified on-chain!', receipt);

      // Call parent callback if provided
      if (onVerify) {
        onVerify(signal.id, tx.hash);
      }

    } catch (error) {
      console.error('Verification error:', error);
      setVerificationError(error.message || 'Verification failed');
    } finally {
      setVerifyingSignal(false);
    }
  };

  const getSignalTypeColor = (type) => {
    switch (type) {
      case 'BULLISH':
        return '#10b981';
      case 'BEARISH':
        return '#ef4444';
      case 'NEUTRAL':
        return '#94a3b8';
      default:
        return '#64748b';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={`signal-card ${isBlurred ? 'blurred' : ''} ${signal.verified ? 'verified' : ''}`}>
      {signal.verified && (
        <div className="verified-badge">
          ✓ Verified On-Chain
        </div>
      )}

      <div className="signal-header">
        <div className="signal-token">
          <span className="token-symbol">{signal.token.symbol}</span>
          <span className="token-name">{signal.token.name}</span>
        </div>
        <div
          className="signal-type"
          style={{ color: getSignalTypeColor(signal.signalType) }}
        >
          {signal.signalType}
        </div>
      </div>

      <div className="signal-content">
        <div className="signal-price">
          <span className="current-price">${signal.price.toLocaleString()}</span>
          {signal.targetPrice && (
            <>
              <span className="arrow">→</span>
              <span className="target-price">${signal.targetPrice.toLocaleString()}</span>
            </>
          )}
        </div>

        <div className="signal-metrics">
          <div className="metric">
            <span className="metric-label">Confidence</span>
            <span className="metric-value">
              {(signal.confidence * 100).toFixed(0)}%
            </span>
          </div>
          <div className="metric">
            <span className="metric-label">Source</span>
            <span className="metric-value">{signal.source}</span>
          </div>
        </div>

        <div className="signal-reasoning">
          <p>{signal.reasoning}</p>
        </div>

        {signal.metadata && Object.keys(signal.metadata).length > 0 && (
          <div className="signal-metadata">
            {Object.entries(signal.metadata).slice(0, 3).map(([key, value]) => (
              <div key={key} className="metadata-item">
                <span className="metadata-key">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span className="metadata-value">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="signal-footer">
          <span className="signal-timestamp">{formatDate(signal.timestamp)}</span>
          {signal.onChainHash && (
            <span className="onchain-hash" title={signal.onChainHash}>
              Hash: {signal.onChainHash.slice(0, 10)}...
            </span>
          )}
        </div>
      </div>

      {!signal.verified && !isBlurred && (
        <div className="signal-actions">
          <button
            className="btn btn-primary verify-btn"
            onClick={handleVerifyOnChain}
            disabled={verifyingSignal}
          >
            {verifyingSignal ? 'Verifying...' : 'Verify On-Chain'}
          </button>
          {txHash && (
            <div className="tx-hash">
              Tx: {txHash.slice(0, 10)}...
            </div>
          )}
          {verificationError && (
            <div className="error-message">
              {verificationError}
            </div>
          )}
        </div>
      )}

      {isBlurred && (
        <div className="premium-overlay">
          <span>🔒 Premium Signal - Connect wallet with premium subscription</span>
        </div>
      )}
    </div>
  );
};

export default SignalCard;

