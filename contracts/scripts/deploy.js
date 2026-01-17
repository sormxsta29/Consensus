const hre = require("hardhat");

async function main() {
  console.log("Deploying Consensus smart contracts...");

  // Deploy ContractRegistry
  console.log("\n1. Deploying ContractRegistry...");
  const Registry = await hre.ethers.getContractFactory("ContractRegistry");
  const registry = await Registry.deploy();
  await registry.waitForDeployment();
  const registryAddress = await registry.getAddress();
  console.log("✅ ContractRegistry deployed to:", registryAddress);

  // Example: Deploy an Escrow contract
  console.log("\n2. Deploying sample MilestoneEscrow...");
  const Escrow = await hre.ethers.getContractFactory("MilestoneEscrow");
  
  const contractor = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Example address
  const milestoneDescriptions = ["Design Phase", "Development Phase", "Testing & Deployment"];
  const milestoneAmounts = [
    hre.ethers.parseEther("1.0"),
    hre.ethers.parseEther("2.0"),
    hre.ethers.parseEther("1.0")
  ];
  const totalAmount = hre.ethers.parseEther("4.0");

  const escrow = await Escrow.deploy(
    contractor,
    milestoneDescriptions,
    milestoneAmounts,
    { value: totalAmount }
  );
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  console.log("✅ MilestoneEscrow deployed to:", escrowAddress);

  console.log("\n📋 Deployment Summary:");
  console.log("Registry:", registryAddress);
  console.log("Sample Escrow:", escrowAddress);
  console.log("\nSave these addresses to your .env file:");
  console.log(`NEXT_PUBLIC_REGISTRY_ADDRESS=${registryAddress}`);
  console.log(`NEXT_PUBLIC_ESCROW_ADDRESS=${escrowAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
