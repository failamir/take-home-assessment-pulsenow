import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = ({ walletAddress, session }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (walletAddress) {
      loadProfile();
    }
  }, [walletAddress]);

  const loadProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/${walletAddress}`,
        {
          headers: {
            'Authorization': `Bearer ${session?.token || ''}`
          }
        }
      );
      const result = await response.json();
      if (result.success) {
        setProfile(result.data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!profile) {
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
            backgroundColor: `${getTierColor(profile.subscriptionTier)}20`,
            color: getTierColor(profile.subscriptionTier),
            borderColor: `${getTierColor(profile.subscriptionTier)}40`
          }}
        >
          {profile.subscriptionTier.toUpperCase()}
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
            <span className="stat-value">{profile.signalsAccessed}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">API Calls (This Month)</span>
            <span className="stat-value">{profile.apiCallsThisMonth.toLocaleString()}</span>
          </div>
        </div>

        {profile.subscriptionExpiry && (
          <div className="profile-item">
            <span className="profile-label">Subscription Expires</span>
            <span className="profile-value">
              {new Date(profile.subscriptionExpiry).toLocaleDateString()}
            </span>
          </div>
        )}

        {profile.favoriteTokens && profile.favoriteTokens.length > 0 && (
          <div className="profile-item">
            <span className="profile-label">Favorite Tokens</span>
            <div className="token-tags">
              {profile.favoriteTokens.map(token => (
                <span key={token} className="token-tag">{token}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

