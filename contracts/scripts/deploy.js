const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
    console.log("Deploying SignalVerifier contract...");

    // Deploy the contract
    const SignalVerifier = await hre.ethers.getContractFactory("SignalVerifier");
    const signalVerifier = await SignalVerifier.deploy();

    await signalVerifier.waitForDeployment();

    const contractAddress = await signalVerifier.getAddress();

    console.log(`SignalVerifier deployed to: ${contractAddress}`);

    // Save contract address and ABI for frontend
    const deploymentInfo = {
        address: contractAddress,
        network: hre.network.name,
        chainId: hre.network.config.chainId,
        deployedAt: new Date().toISOString()
    };

    // Save to contracts directory
    const deploymentsDir = path.join(__dirname, '../deployments');
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    fs.writeFileSync(
        path.join(deploymentsDir, 'SignalVerifier.json'),
        JSON.stringify(deploymentInfo, null, 2)
    );

    // Copy ABI to frontend
    const artifactPath = path.join(__dirname, '../artifacts/contracts/SignalVerifier.sol/SignalVerifier.json');
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

    const frontendContractsDir = path.join(__dirname, '../../frontend/src/contracts');
    if (!fs.existsSync(frontendContractsDir)) {
        fs.mkdirSync(frontendContractsDir, { recursive: true });
    }

    fs.writeFileSync(
        path.join(frontendContractsDir, 'SignalVerifier.json'),
        JSON.stringify({
            address: contractAddress,
            abi: artifact.abi
        }, null, 2)
    );

    console.log("✅ Contract deployment info saved to deployments/SignalVerifier.json");
    console.log("✅ Contract ABI and address copied to frontend/src/contracts/");
    console.log("\n📝 Next steps:");
    console.log("1. Keep the Hardhat node running");
    console.log("2. Import account to MetaMask using private key from Hardhat node");
    console.log("3. Connect MetaMask to localhost:8545");
    console.log("4. Test the contract in the frontend application");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
