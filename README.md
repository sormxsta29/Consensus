# Consensus: The Zero-Trust Contract Protocol

**TechTriad Hackathon 2026 Project**

A Privacy-First Contract Lifecycle Management (CLM) platform that bridges static documents and programmable assets.

## 🎯 Unique Selling Points

1. **Privacy-First Architecture**: PII sanitized client-side before AI processing
2. **Red Team AI**: Aggressive vulnerability analysis for contract risk assessment
3. **Blockchain Trust Layer**: Immutable contract registry and milestone-based escrow
4. **War Room Dashboard**: Real-time monitoring of contracts, risks, and blockchain status

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4 (Red Team analysis, Q&A)
- **Blockchain**: Hardhat, Ethers.js, Polygon Amoy Testnet
- **Storage**: IPFS (Pinata), MongoDB (optional)

### Project Structure
```
consensus/
├── consensus-frontend/       # Next.js application
│   ├── app/
│   │   ├── api/             # API routes (AI endpoints)
│   │   ├── dashboard/       # War Room dashboard
│   │   ├── upload/          # Secure upload with split-screen
│   │   ├── compare/         # Contract diff viewer
│   │   └── layout.tsx       # Root layout with nav
│   ├── lib/
│   │   └── regex-sanitizer.ts  # PII sanitization utility
│   ├── hooks/
│   │   └── useWeb3.ts       # Web3 wallet integration
│   └── components/          # Reusable UI components
│
├── contracts/               # Solidity smart contracts
│   ├── Registry.sol         # Contract registry
│   ├── Escrow.sol           # Milestone-based escrow
│   ├── hardhat.config.js    # Hardhat configuration
│   └── scripts/deploy.js    # Deployment script
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
You need Node.js and npm installed. If not installed:
1. Download from https://nodejs.org/ (LTS version recommended)
2. Install and verify: `node --version` and `npm --version`

### 1. Install Dependencies

```bash
# Frontend
cd consensus-frontend
npm install

# Contracts (separate terminal)
cd ../contracts
npm install
```

### 2. Environment Setup

**consensus-frontend/.env.local**:
```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_ESCROW_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=80002
```

**contracts/.env**:
```env
PRIVATE_KEY=your_wallet_private_key_here
POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology/
```

### 3. Compile & Deploy Contracts

```bash
cd contracts
npm run compile
npm run deploy              # Local Hardhat network
# OR
npm run deploy:amoy         # Polygon Amoy testnet
```

Copy the deployed contract addresses to `consensus-frontend/.env.local`.

### 4. Run Frontend

```bash
cd consensus-frontend
npm run dev
```

Visit http://localhost:3000

## 📋 Features

### ✅ Phase 1: Core Infrastructure (Completed)
- [x] Next.js project scaffolding
- [x] PII sanitization utility (regex-based)
- [x] Secure upload page with split-screen
- [x] War Room dashboard
- [x] Contract comparison tool
- [x] AI API endpoints (Red Team + Q&A)
- [x] Web3 integration hook
- [x] Smart contracts (Registry + Escrow)
- [x] Deployment scripts

### 🔄 Phase 2: Integration (Next Steps)
- [ ] Connect frontend to deployed contracts
- [ ] IPFS integration for document storage
- [ ] Real-time blockchain status updates
- [ ] Enhanced PDF extraction (server-side)
- [ ] MongoDB integration for metadata

### 🎨 Phase 3: Polish (Final)
- [ ] UI/UX refinement
- [ ] Error handling improvements
- [ ] Loading states and animations
- [ ] Demo data seeding
- [ ] Video demo recording

## 🔐 Privacy-First Flow

1. **Upload**: User uploads contract PDF/text
2. **Sanitize**: Client-side regex masks PII (names, dates, amounts, emails, phones)
3. **Preview**: Split-screen shows raw vs sanitized
4. **Analyze**: Only sanitized text sent to OpenAI API
5. **Rehydrate**: AI response merged with local PII mapping
6. **Register**: Document hash stored on blockchain

## 🧠 AI Features

### Red Team Endpoint (`/api/redteam`)
- Aggressive vulnerability analysis
- Worst-case scenario generation
- Risk scoring (0-100)
- Actionable recommendations

### Helper Endpoint (`/api/analyze`)
- Contract summarization
- Q&A on contract terms
- Key term extraction

## ⛓️ Blockchain Features

### ContractRegistry.sol
- Register contract with SHA-256 hash
- Track signers and status
- IPFS hash storage
- Immutable audit trail

### MilestoneEscrow.sol
- Client deposits full payment
- Funds released per milestone
- Dispute mechanism
- Emergency cancellation

## 🎨 UI Theme: "War Room"

Dark, professional aesthetic inspired by command centers:
- Custom color palette: `war-room-{50-900}`
- Glassmorphism effects
- Real-time status indicators
- Military-grade security vibes

## 📱 Pages

### 1. Home (`/`)
- Landing page with project overview
- Call-to-action for secure upload
- How it works section

### 2. Secure Upload (`/upload`)
- File upload (PDF/TXT)
- Split-screen: Raw | Sanitized
- PII mapping display
- Copy & rehydrate actions

### 3. Dashboard (`/dashboard`)
- Contract list with status
- Risk scores
- Blockchain hashes
- Stats cards

### 4. Compare (`/compare`)
- Side-by-side diff view
- Unified diff view
- Line-by-line changes
- Addition/deletion highlighting

## 🛠️ Development

### Available Scripts

**Frontend**:
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

**Contracts**:
```bash
npm run compile      # Compile Solidity
npm run test         # Run tests
npm run deploy       # Deploy locally
npm run deploy:amoy  # Deploy to testnet
```

### Tech Decisions

- **Next.js App Router**: Modern routing, server components
- **TypeScript**: Type safety for hackathon speed
- **Tailwind**: Rapid UI development
- **Ethers.js v6**: Latest Web3 library
- **Hardhat**: Best Solidity dev experience
- **Polygon Amoy**: Fast, cheap testnet

## 🐛 Troubleshooting

### MetaMask Not Connecting
1. Ensure MetaMask is installed
2. Check you're on the correct network (Polygon Amoy)
3. Try disconnecting and reconnecting

### PDF Extraction Failing
1. Use simple PDF files (not scanned images)
2. Alternatively, copy text and upload as `.txt`
3. Server-side extraction coming in Phase 2

### Contract Deployment Errors
1. Ensure you have test MATIC: https://faucet.polygon.technology/
2. Check your `PRIVATE_KEY` in `.env`
3. Verify network RPC URL is correct

## 🏆 Hackathon Compliance

### Theme 1: Web ✅
- Full Next.js web application
- Responsive design
- Modern UI with Tailwind

### Theme 2: AI ✅
- OpenAI GPT-4 integration
- Red Team vulnerability analysis
- Contract Q&A and summarization

### Theme 3: Blockchain ✅
- Smart contracts (Registry + Escrow)
- Polygon Amoy deployment
- Web3 wallet integration

## 📝 License

MIT License - Built for TechTriad Hackathon 2026

## 👥 Team

Lead Architect & Developer: Building at lightning speed ⚡

---

**Built in 36 hours for TechTriad Hackathon 2026**
