import React, { useState } from 'react';
import { BrowserProvider } from 'ethers';
import './WalletConnection.css';

const WalletConnection = ({ connectedWallet, onConnect, onDisconnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      // Request account access
      const provider = new BrowserProvider(window.ethereum);

      // Request accounts
      await provider.send("eth_requestAccounts", []);

      // Get signer and address
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Check network (chainId 1337 for local Hardhat)
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      // Switch to localhost network if not already connected
      if (chainId !== 1337 && chainId !== 31337) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x539' }], // 1337 in hex
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0x539',
                  chainName: 'Localhost 8545',
                  rpcUrls: ['http://127.0.0.1:8545'],
                }],
              });
            } catch (addError) {
              throw new Error('Failed to add localhost network to MetaMask');
            }
          } else {
            throw switchError;
          }
        }
      }

      // Request signature for authentication (Task 2)
      const timestamp = Date.now();
      const message = `Sign in to PulseNow\n\nWallet: ${address}\nTimestamp: ${timestamp}`;

      const signature = await signer.signMessage(message);

      // Send to backend for verification
      const authResponse = await fetch('http://localhost:3001/api/auth/verify-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, message, signature })
      });

      if (!authResponse.ok) {
        throw new Error('Authentication failed');
      }

      const authData = await authResponse.json();

      // Store session token
      if (authData.success && authData.data.sessionToken) {
        localStorage.setItem('sessionToken', authData.data.sessionToken);
        localStorage.setItem('walletAddress', address);
      }

      onConnect(address, authData.data);

    } catch (err) {
      setError(err.message);
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('walletAddress');
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
