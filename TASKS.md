# Assessment Tasks - Detailed Instructions

## Overview

Complete the following 3 tasks to demonstrate your blockchain and Web3 development skills.

---

## Task 1: Smart Contract Integration & Signal Verification

### Objective
Implement on-chain verification of crypto trading signals using smart contracts.

### Requirements

1. **Smart Contract Development**
   - Create a Solidity smart contract that can store and verify signal data hashes
   - Contract should include:
     - Function to verify a signal (takes signalId, dataHash, timestamp)
     - Function to retrieve signal verification status
     - Event emission for verification events
   - Deploy the contract to a test network (Sepolia) or local Hardhat node

2. **Frontend Integration**
   - Connect frontend to the deployed smart contract using ethers.js
   - In `SignalCard.js`, implement "Verify On-Chain" button functionality
   - Generate a hash of the signal data (use keccak256 or SHA256)
   - Call the smart contract's verify function
   - Handle transaction states: pending, success, error
   - Update the UI to show verification status

3. **Verification Display**
   - Show verified badge on signals that are verified on-chain
   - Display the on-chain hash/transaction hash
   - Show timestamp of verification

### Implementation Hints

- Use ethers.js v6 for contract interaction
- Hash signal data consistently (consider including: id, timestamp, token address, price, signalType)
- Handle network switching if user is on wrong network
- Show loading states during transaction confirmation

### Deliverables
- Solidity smart contract code
- Contract deployment script (optional but helpful)
- Modified `SignalCard.js` with verification functionality
- Smart contract interaction code in frontend

---

## Task 2: Wallet-Based Authentication & Access Control

### Objective
Implement secure wallet-based authentication using cryptographic signature verification.

### Requirements

1. **Wallet Connection**
   - In `WalletConnection.js`, implement MetaMask (or other wallet) connection
   - Detect if wallet is installed
   - Request account access
   - Get connected wallet address
   - Handle wallet disconnection

2. **Signature Verification**
   - After wallet connection, request user to sign a message
   - Message format: `"Sign in to PulseNow\n\nWallet: ${address}\nTimestamp: ${timestamp}"`
   - Send signature, address, and message to backend `/api/auth/verify-signature`
   - In backend `server.js`, implement signature verification:
     - Use ethers.js to recover signer address from signature
     - Verify recovered address matches provided address
     - Create a session token (JWT or simple token)
     - Return session info with user profile/subscription tier

3. **Protected Routes**
   - Implement authentication middleware in backend
   - Protect `/api/signals/premium/list` endpoint
   - Check subscription tier from user profile
   - Show/hide premium signals based on subscription tier in frontend

4. **User Profile Display**
   - Show user profile when wallet is connected
   - Display subscription tier (free/premium)
   - Show wallet address
   - Display user stats (signals accessed, API calls)

### Implementation Hints

- Use `ethers.utils.verifyMessage()` or `ethers.verifyMessage()` (v6) for signature verification
- Store sessions in-memory (Map) for simplicity
- Include session token in Authorization header for protected requests
- Handle signature rejection gracefully

### Deliverables
- Complete wallet connection implementation
- Backend signature verification endpoint
- Authentication middleware
- Protected API endpoints
- User profile display

---

## Task 3: On-Chain Analytics Dashboard & Data Integrity

### Objective
Build an analytics dashboard with cryptographic data integrity verification.

### Requirements

1. **Data Integrity Verification**
   - In `AnalyticsDashboard.js`, implement data integrity checking
   - Generate hash of analytics data when loaded
   - Compare with stored on-chain hash (can use smart contract from Task 1 or separate endpoint)
   - Display integrity status (verified/unverified)
   - Show verification proof (hash, block number, timestamp)

2. **Audit Trail Visualization**
   - Create a component to display timestamped audit trail
   - Show history of data updates with timestamps
   - Display cryptographic proofs for each update
   - Include transaction hashes linking to on-chain data

3. **Real-Time Updates**
   - Implement efficient data loading (consider debouncing/throttling)
   - Show loading states
   - Handle errors gracefully

4. **Blockchain Metrics Display**
   - Enhance the analytics display with:
     - Transaction count over time
     - Gas cost trends
     - Network activity metrics
   - Use mock data or fetch from API

### Implementation Hints

- Use crypto library (Node.js) or ethers.js for hashing
- Store data hashes in smart contract or database
- Consider using a timeline/chronological view for audit trail
- Use React hooks (useEffect, useState) for data fetching

### Deliverables
- Data integrity verification implementation
- Audit trail visualization component
- Enhanced analytics display
- Real-time update mechanisms

---

## General Guidelines

1. **Code Quality**: Write clean, maintainable code with appropriate error handling
2. **Security**: Never expose private keys, validate all inputs, verify signatures properly
3. **User Experience**: Show loading states, handle errors gracefully, provide feedback
4. **Testing**: Test with MetaMask on Sepolia testnet or local Hardhat node

## Submission
After completing all tasks, please create a GitHub repository and send me the URL.

Good luck! 🚀

