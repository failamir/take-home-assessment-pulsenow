import React, { useState, useEffect } from 'react';
import './AnalyticsDashboard.css';

// ============================================
// TASK 3: On-Chain Analytics Dashboard & Data Integrity
// ============================================
// TODO: Build analytics dashboard with data integrity verification
// 1. Display blockchain metrics (transactions, gas costs, network stats)
// 2. Show data integrity status for displayed data
// 3. Implement audit trail visualization
// 4. Add cryptographic proof display for verified data
// 5. Optimize for real-time updates

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [integrityStatus, setIntegrityStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
    // TODO: Set up polling or WebSocket for real-time updates
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/analytics');
      const result = await response.json();
      if (result.success) {
        setAnalytics(result.data);
        
        // TODO: Verify data integrity
        // 1. Generate hash of received data
        // 2. Compare with on-chain hash
        // 3. Update integrityStatus state
        verifyDataIntegrity(result.data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const verifyDataIntegrity = async (data) => {
    // TODO: Implement data integrity verification
    // 1. Calculate hash of the analytics data
    // 2. Query on-chain hash from contract or API
    // 3. Compare and set integrity status
    // 4. Store verification proof

    // Placeholder - implement actual verification
    setIntegrityStatus({
      verified: false,
      message: 'Data integrity verification not implemented yet',
      timestamp: new Date().toISOString()
    });
  };

  if (loading) {
    return (
      <div className="card analytics-dashboard">
        <div className="loading">Loading analytics...</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="card analytics-dashboard">
        <div className="empty-state">Failed to load analytics</div>
      </div>
    );
  }

  return (
    <div className="card analytics-dashboard">
      <div className="dashboard-header">
        <h2 className="card-title">On-Chain Analytics</h2>
        <div className={`integrity-status ${integrityStatus.verified ? 'verified' : 'unverified'}`}>
          {integrityStatus.verified ? '✓ Verified' : '⚠ Unverified'}
        </div>
      </div>

      {/* TODO: Display data integrity proof */}
      {integrityStatus.proof && (
        <div className="integrity-proof">
          <div className="proof-header">Data Integrity Proof</div>
          <div className="proof-content">
            <div>Hash: {integrityStatus.proof.hash}</div>
            <div>Block: {integrityStatus.proof.blockNumber}</div>
            <div>Timestamp: {new Date(integrityStatus.proof.timestamp).toLocaleString()}</div>
          </div>
        </div>
      )}

      <div className="analytics-content">
        <div className="metric-card">
          <div className="metric-title">Market Overview</div>
          <div className="metric-grid">
            <div className="metric-item">
              <span className="metric-label">Total Market Cap</span>
              <span className="metric-value">
                ${(analytics.marketOverview.totalMarketCap / 1e12).toFixed(2)}T
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">24h Volume</span>
              <span className="metric-value">
                ${(analytics.marketOverview.totalVolume24h / 1e9).toFixed(2)}B
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Active Addresses (24h)</span>
              <span className="metric-value">
                {(analytics.marketOverview.activeAddresses24h / 1e6).toFixed(2)}M
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">DeFi TVL</span>
              <span className="metric-value">
                ${(analytics.marketOverview.defiTotalValueLocked / 1e9).toFixed(2)}B
              </span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-title">Network Metrics</div>
          <div className="network-metrics">
            <div className="network-item">
              <div className="network-name">Ethereum</div>
              <div className="network-stats">
                <div>TPS: {analytics.networkMetrics.ethereum.transactionsPerSecond}</div>
                <div>Avg Gas: {analytics.networkMetrics.ethereum.averageGasPrice} gwei</div>
                <div>Staked: {(analytics.networkMetrics.ethereum.totalStaked / 1e6).toFixed(0)}M ETH</div>
              </div>
            </div>
            <div className="network-item">
              <div className="network-name">Polygon</div>
              <div className="network-stats">
                <div>TPS: {analytics.networkMetrics.polygon.transactionsPerSecond}</div>
                <div>Avg Gas: {analytics.networkMetrics.polygon.averageGasPrice} gwei</div>
                <div>Staked: {(analytics.networkMetrics.polygon.totalStaked / 1e9).toFixed(2)}B MATIC</div>
              </div>
            </div>
          </div>
        </div>

        {/* TODO: Add audit trail visualization */}
        <div className="metric-card">
          <div className="metric-title">Audit Trail</div>
          <div className="audit-trail">
            <div className="empty-state">
              Audit trail visualization not implemented yet.
              <br />
              TODO: Display timestamped history of data updates with cryptographic proofs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

