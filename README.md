# PulseNow - Senior Blockchain & Web3 Developer Assessment

## About PulseNow

PulseNow is a next-generation, AI-powered crypto intelligence and trading platform designed to transform how digital asset markets are analyzed, understood, and navigated. We combine real-time market data, predictive AI models, on-chain analytics, and decentralized infrastructure to deliver transparent, high-signal insights for traders, investors, and analysts worldwide.

Our mission is to build an open, trust-minimized financial intelligence layer for crypto markets — one that empowers individuals with data sovereignty, verifiable insights, and algorithmic clarity.

## Assessment Overview

This assessment is designed to evaluate your skills in blockchain development, Web3 integration, and building production-ready systems that bridge traditional backend services with decentralized infrastructure. You'll be working with realistic crypto market data, implementing wallet-based authentication, and building systems for verifiable data integrity.

**Estimated Time: 40-60 minutes**

## Project Structure

```
take-home-assessment-pulsenow/
├── frontend/          # React.js application
├── backend/           # Node.js API server
├── mockData.js        # Complex mockup data (crypto signals, market data, blockchain data)
└── README.md          # This file
```

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- A Web3 wallet (MetaMask recommended) installed in your browser
- Basic understanding of Ethereum/EVM chains
- Familiarity with React.js and Node.js

## Setup Instructions

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start the Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:3001`

### 3. Start the Frontend Application

In a new terminal:

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## Assessment Tasks

You need to complete **3 tasks** that demonstrate your blockchain and Web3 development skills. Each task builds upon the previous one, creating a cohesive crypto intelligence dashboard.

### Task 1: Smart Contract Integration & Signal Verification
**Estimated Time: 15-20 minutes**

Implement a system to verify crypto trading signals using on-chain data. You need to:
- Connect to an Ethereum-compatible network (use Sepolia testnet or local Hardhat node)
- Create or use a smart contract that verifies signal timestamps and data integrity
- Display verified signals with cryptographic proof of their on-chain verification
- Handle transaction status and error states appropriately

**Deliverables:**
- Smart contract code (Solidity) that stores/verifies signal hashes
- Frontend component that interacts with the contract
- Display verification status for signals in the dashboard

### Task 2: Wallet-Based Authentication & Access Control
**Estimated Time: 15-20 minutes**

Implement secure wallet-based authentication for accessing premium signals:
- Integrate Web3 wallet connection (MetaMask/WalletConnect)
- Implement wallet signature verification on the backend
- Create role-based access control (free users vs premium subscribers)
- Protect API endpoints that serve premium signal data
- Display user wallet address and subscription status in the UI

**Deliverables:**
- Wallet connection flow in the frontend
- Backend API endpoint for signature verification
- Protected routes/components based on subscription tier
- User profile showing wallet address and access level

### Task 3: On-Chain Analytics Dashboard & Data Integrity
**Estimated Time: 10-20 minutes**

Build an analytics dashboard that displays verified on-chain metrics:
- Create a component that displays blockchain data (transactions, gas costs, addresses)
- Implement data integrity checks using cryptographic hashing
- Show timestamped audit trail for signal generation
- Display verifiable proof that data hasn't been tampered with
- Optimize for displaying high-frequency data updates

**Deliverables:**
- Analytics dashboard component with blockchain metrics
- Data integrity verification display
- Audit trail visualization
- Efficient data loading and update mechanisms

## Mock Data

The project includes `mockData.js` with realistic crypto market data including:
- Trading signals with timestamps, tokens, prices, and confidence scores
- On-chain transaction data
- Wallet addresses and balances
- Market analytics and metrics
- Token metadata and DeFi protocol data

This data is automatically loaded when the application starts and simulates real-world crypto intelligence platform data.

## Evaluation Criteria

Your submission will be evaluated on:

1. **Code Quality**: Clean, maintainable, and well-structured code
2. **Security**: Proper handling of private keys, secure signature verification, input validation
3. **Web3 Best Practices**: Correct use of libraries, error handling, transaction management
4. **Integration**: Seamless connection between frontend, backend, and blockchain
5. **Problem Solving**: Creative solutions to technical challenges
6. **Documentation**: Clear comments and code documentation

## Submission Guidelines

1. Complete all 3 tasks
2. Ensure the application runs without errors
3. Add comments explaining your implementation decisions
4. Include a brief summary (in a separate file or README comment) explaining:
   - Your approach to each task
   - Any trade-offs or design decisions you made
   - Potential improvements for production deployment

## Getting Help

If you encounter issues:
- Check that all dependencies are installed correctly
- Ensure your Web3 wallet is connected to the correct network
- Review the console for error messages
- Use the browser's developer tools for debugging

## Notes

- You may use any Web3 libraries (ethers.js, web3.js, viem, etc.)
- Feel free to create mock smart contracts for testing
- Focus on demonstrating blockchain/Web3 skills rather than perfect UI design
- Code should be production-ready quality, even if not fully polished

Good luck! We're excited to see your solution.

