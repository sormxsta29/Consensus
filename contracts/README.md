# Consensus Smart Contracts

Solidity contracts for the Consensus CLM platform.

## Contracts

### 1. ContractRegistry.sol
- **Purpose**: Immutable registry for contract hashes and metadata
- **Features**:
  - Register contract with document hash
  - Track signers and status
  - IPFS hash storage
  - Verification functions

### 2. Escrow.sol (MilestoneEscrow)
- **Purpose**: Milestone-based payment escrow
- **Features**:
  - Client deposits full amount
  - Contractor receives payment per milestone
  - Dispute mechanism
  - Emergency cancellation

## Setup

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests (if you create them)
npm run test

# Deploy to local Hardhat network
npm run deploy

# Deploy to Polygon Amoy testnet
npm run deploy:amoy
```

## Environment Variables

Create a `.env` file in this directory:

```env
PRIVATE_KEY=your_wallet_private_key_here
POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology/
```

## Usage in Frontend

After deployment, copy the contract addresses to `consensus-frontend/.env.local`:

```env
NEXT_PUBLIC_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_ESCROW_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=80002
```

## Testing on Polygon Amoy

1. Get test MATIC from https://faucet.polygon.technology/
2. Add Polygon Amoy network to MetaMask
3. Deploy contracts with `npm run deploy:amoy`
4. Interact via frontend

## Contract ABIs

After compilation, find ABIs in:
- `artifacts/Registry.sol/ContractRegistry.json`
- `artifacts/Escrow.sol/MilestoneEscrow.json`

Copy these to your frontend for ethers.js integration.
