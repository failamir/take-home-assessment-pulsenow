/**
 * Smart Contract Helper Functions
 * Utilities for interacting with blockchain contracts
 */

const { ethers } = require('ethers');
const mockData = require('../mockData.js');

/**
 * Get provider (for tasks)
 * Uses Sepolia testnet or local Hardhat node
 */
function getProvider() {
  const rpcUrl = process.env.RPC_URL || 'http://localhost:8545';
  return new ethers.JsonRpcProvider(rpcUrl);
}

/**
 * Get contract instance
 * @param {ethers.Signer} signer - The signer to use for contract interactions
 * @returns {ethers.Contract} Contract instance
 */
function getSignalVerificationContract(signer) {
  const contractAddress = mockData.smartContracts.signalVerificationContract.address;
  const abi = mockData.smartContracts.signalVerificationContract.abi;
  return new ethers.Contract(contractAddress, abi, signer);
}

module.exports = {
  getProvider,
  getSignalVerificationContract
};

