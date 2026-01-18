// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SignalVerifier
 * @dev Smart contract for verifying crypto trading signals on-chain
 * Task 1: Smart Contract Integration & Signal Verification
 */
contract SignalVerifier {
    struct Verification {
        bytes32 dataHash;
        uint256 timestamp;
        address verifier;
        bool exists;
    }
    
    // Mapping from signalId to verification data
    mapping(string => Verification) public verifications;
    
    // Array to track all verified signal IDs
    string[] public verifiedSignalIds;
    
    // Events
    event SignalVerified(
        string indexed signalId,
        bytes32 dataHash,
        uint256 timestamp,
        address indexed verifier
    );
    
    /**
     * @dev Verify a signal by storing its hash on-chain
     * @param signalId Unique identifier for the signal
     * @param dataHash Keccak256 hash of the signal data
     * @param signalTimestamp Original timestamp of the signal
     */
    function verifySignal(
        string memory signalId,
        bytes32 dataHash,
        uint256 signalTimestamp
    ) external {
        require(bytes(signalId).length > 0, "Signal ID cannot be empty");
        require(dataHash != bytes32(0), "Data hash cannot be empty");
        require(!verifications[signalId].exists, "Signal already verified");
        
        verifications[signalId] = Verification({
            dataHash: dataHash,
            timestamp: signalTimestamp,
            verifier: msg.sender,
            exists: true
        });
        
        verifiedSignalIds.push(signalId);
        
        emit SignalVerified(signalId, dataHash, signalTimestamp, msg.sender);
    }
    
    /**
     * @dev Get verification status and details for a signal
     * @param signalId The signal ID to check
     * @return exists Whether the signal has been verified
     * @return dataHash The stored data hash
     * @return timestamp The verification timestamp
     * @return verifier The address that verified the signal
     */
    function getVerificationStatus(string memory signalId)
        external
        view
        returns (
            bool exists,
            bytes32 dataHash,
            uint256 timestamp,
            address verifier
        )
    {
        Verification memory v = verifications[signalId];
        return (v.exists, v.dataHash, v.timestamp, v.verifier);
    }
    
    /**
     * @dev Get total number of verified signals
     * @return Total count of verified signals
     */
    function getVerifiedSignalCount() external view returns (uint256) {
        return verifiedSignalIds.length;
    }
    
    /**
     * @dev Get all verified signal IDs (use with caution for large datasets)
     * @return Array of all verified signal IDs
     */
    function getAllVerifiedSignalIds() external view returns (string[] memory) {
        return verifiedSignalIds;
    }
}
