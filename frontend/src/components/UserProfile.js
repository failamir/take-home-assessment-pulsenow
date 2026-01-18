import React from 'react';
import './UserProfile.css';

const UserProfile = ({ walletAddress, session }) => {
  if (!session) {
    return null;
  }

  const getTierColor = (tier) => {
    switch (tier) {
      case 'premium':
        return '#8b5cf6';
      case 'free':
        return '#64748b';
      default:
        return '#94a3b8';
    }
  };

  return (
    <div className="card user-profile">
      <div className="profile-header">
        <h3>User Profile</h3>
        <span
          className="subscription-badge"
          style={{
            backgroundColor: `${getTierColor(session.subscriptionTier)}20`,
            color: getTierColor(session.subscriptionTier),
            borderColor: `${getTierColor(session.subscriptionTier)}40`
          }}
        >
          {session.subscriptionTier.toUpperCase()}
        </span>
      </div>

      <div className="profile-content">
        <div className="profile-item">
          <span className="profile-label">Wallet Address</span>
          <span className="profile-value wallet-address">{walletAddress}</span>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-label">Signals Accessed</span>
            <span className="stat-value">{session.signalsAccessed}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">API Calls</span>
            <span className="stat-value">{session.apiCalls}</span>
          </div>
        </div>

        <div className="profile-item">
          <span className="profile-label">Session Active</span>
          <span className="profile-value">
            Since {new Date(session.createdAt).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
