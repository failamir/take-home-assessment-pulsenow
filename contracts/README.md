# Smart Contracts

This directory contains the Solidity smart contract for Task 1 of the assessment.

## SignalVerification.sol

A simple contract that stores and verifies trading signal data hashes on-chain.

### Features

- Store signal verification data (hash, timestamp, verifier)
- Retrieve verification status for any signal
- Emit events for verification actions
- Track total verification count

### Deployment

#### Using Hardhat (Recommended)

1. Install Hardhat:
```bash
npm install --save-dev hardhat
```

2. Initialize Hardhat project (if not already initialized)

3. Deploy to local node:
```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

#### Using Remix IDE

1. Open [Remix IDE](https://remix.ethereum.org)
2. Create new file `SignalVerification.sol`
3. Copy contract code
4. Compile with Solidity 0.8.19+
5. Deploy to Sepolia testnet (use MetaMask)

#### Using Foundry

```bash
forge create SignalVerification --rpc-url sepolia --private-key YOUR_PRIVATE_KEY
```

### Usage

After deployment, update the contract address in:
- `mockData.js` - `smartContracts.signalVerificationContract.address`
- Frontend code when connecting to the contract

### Contract Functions

- `verifySignal(signalId, dataHash, timestamp)` - Verify a signal
- `getSignalVerification(signalId)` - Get verification data
- `isVerified(signalId)` - Check if signal is verified

### Example Frontend Integration

```javascript
import { ethers } from 'ethers';

const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
const abi = [/* contract ABI */];

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

// Verify a signal
const signalHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(signalData)));
const tx = await contract.verifySignal(signalId, signalHash, Math.floor(Date.now() / 1000));
await tx.wait();

// Check verification status
const [verified, timestamp, hash, verifier] = await contract.getSignalVerification(signalId);
```

