import React, { useState } from 'react';
import './WalletConnection.css';

// ============================================
// TASK 2: Wallet-Based Authentication
// ============================================
// TODO: Implement wallet connection using ethers.js
// 1. Detect if MetaMask (or other wallet) is installed
// 2. Request account access
// 3. Get the connected wallet address
// 4. Handle network switching if needed
// 5. Implement disconnect functionality

const WalletConnection = ({ connectedWallet, onConnect, onDisconnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // TODO: Implement wallet connection
      // Use ethers.js to connect to MetaMask
      // Example:
      // if (typeof window.ethereum !== 'undefined') {
      //   const provider = new ethers.BrowserProvider(window.ethereum);
      //   const signer = await provider.getSigner();
      //   const address = await signer.getAddress();
      //   onConnect(address);
      // }

      // Placeholder - replace with actual implementation
      alert('Wallet connection not implemented yet. Please implement using ethers.js');
    } catch (err) {
      setError(err.message);
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    onDisconnect();
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (connectedWallet) {
    return (
      <div className="wallet-connected">
        <div className="wallet-info">
          <span className="wallet-address">{formatAddress(connectedWallet)}</span>
          <button className="btn btn-secondary" onClick={disconnectWallet}>
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-connection">
      <button 
        className="btn btn-primary" 
        onClick={connectWallet}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default WalletConnection;

