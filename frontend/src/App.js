import React, { useState, useEffect } from 'react';
import './App.css';
import WalletConnection from './components/WalletConnection';
import SignalsDashboard from './components/SignalsDashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import UserProfile from './components/UserProfile';
import ThemeToggle from './components/ThemeToggle';
import { mockData } from './mockData';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function App() {
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [userSession, setUserSession] = useState(null);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiquidGlass, setIsLiquidGlass] = useState(false);

  const toggleTheme = () => {
    setIsLiquidGlass(!isLiquidGlass);
    // Persist choice if needed, or just state for now is fine
  };

  useEffect(() => {
    // Load initial data
    loadSignals();
  }, []);

  const loadSignals = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/signals`);
      const result = await response.json();
      if (result.success) {
        setSignals(result.data);
      }
    } catch (error) {
      console.error('Error loading signals:', error);
      // Fallback to mock data
      setSignals(mockData.signals);
    } finally {
      setLoading(false);
    }
  };

  const handleWalletConnect = (walletAddress, sessionData) => {
    setConnectedWallet(walletAddress);
    if (sessionData) {
      setUserSession(sessionData);
    }
  };

  const handleWalletDisconnect = () => {
    setConnectedWallet(null);
    setUserSession(null);
  };

  const handleSignalVerified = (signalId, verificationData) => {
    setSignals(prevSignals =>
      prevSignals.map(signal =>
        signal.id === signalId
          ? { ...signal, verified: true, onChainHash: verificationData.hash, verificationTimestamp: verificationData.timestamp }
          : signal
      )
    );
  };

  return (
    <div className={`App ${isLiquidGlass ? 'liquid-glass-theme' : ''}`}>
      <header className="App-header">
        <div className="header-content">
          <h1>PulseNow</h1>
          <p className="tagline">AI-Powered Crypto Intelligence Platform</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeToggle isLiquidGlass={isLiquidGlass} toggleTheme={toggleTheme} />
          <WalletConnection
            connectedWallet={connectedWallet}
            onConnect={handleWalletConnect}
            onDisconnect={handleWalletDisconnect}
          />
        </div>
      </header>


      <main className="App-main">
        {connectedWallet && (
          <UserProfile
            walletAddress={connectedWallet}
            session={userSession}
          />
        )}

        <div className="dashboard-container">
          <SignalsDashboard
            signals={signals}
            loading={loading}
            isAuthenticated={!!connectedWallet}
            subscriptionTier={userSession?.subscriptionTier || 'free'}
            onSignalVerified={handleSignalVerified}
          />

          <AnalyticsDashboard />
        </div>
      </main>

      <footer className="App-footer">
        <p>PulseNow Assessment - Complete Tasks 1, 2, and 3</p>
      </footer>
    </div>
  );
}

export default App;

