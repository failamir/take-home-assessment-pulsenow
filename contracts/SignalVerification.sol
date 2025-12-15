// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * SignalVerification Contract
 * 
 * This contract stores and verifies trading signal data hashes on-chain.
 * Used for Task 1 of the PulseNow assessment.
 * 
 * Deploy this contract to Sepolia testnet or local Hardhat node
 */
contract SignalVerification {
    // Struct to store signal verification data
    struct SignalVerificationData {
        bool verified;
        bytes32 dataHash;
        uint256 timestamp;
        address verifier;
    }

    // Mapping from signal ID to verification data
    mapping(string => SignalVerificationData) public signalVerifications;
    
    // Counter for total verifications
    uint256 public verificationCount;
    
    // Event emitted when a signal is verified
    event SignalVerified(
        string indexed signalId,
        bytes32 dataHash,
        uint256 timestamp,
        address indexed verifier
    );

    /**
     * @dev Verify a signal by storing its hash and metadata
     * @param signalId The unique identifier of the signal
     * @param dataHash The hash of the signal data (keccak256)
     * @param timestamp The timestamp of the signal
     */
    function verifySignal(
        string memory signalId,
        bytes32 dataHash,
        uint256 timestamp
    ) external {
        // Store verification data
        signalVerifications[signalId] = SignalVerificationData({
            verified: true,
            dataHash: dataHash,
            timestamp: timestamp,
            verifier: msg.sender
        });
        
        // Increment counter
        verificationCount++;
        
        // Emit event
        emit SignalVerified(signalId, dataHash, timestamp, msg.sender);
    }

    /**
     * @dev Get verification data for a signal
     * @param signalId The unique identifier of the signal
     * @return verified Whether the signal is verified
     * @return timestamp The timestamp of verification
     * @return dataHash The hash of the signal data
     * @return verifier The address that verified the signal
     */
    function getSignalVerification(string memory signalId)
        external
        view
        returns (
            bool verified,
            uint256 timestamp,
            bytes32 dataHash,
            address verifier
        )
    {
        SignalVerificationData memory data = signalVerifications[signalId];
        return (data.verified, data.timestamp, data.dataHash, data.verifier);
    }

    /**
     * @dev Check if a signal is verified
     * @param signalId The unique identifier of the signal
     * @return true if verified, false otherwise
     */
    function isVerified(string memory signalId) external view returns (bool) {
        return signalVerifications[signalId].verified;
    }
}

