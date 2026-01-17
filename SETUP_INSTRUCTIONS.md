# 🚀 CONSENSUS - SETUP INSTRUCTIONS

**TechTriad Hackathon 2026 | 36-Hour MVP**

Your complete Consensus project has been created! Since Node.js is not installed on your system, follow these instructions to get started.

---

## ✅ WHAT'S BEEN CREATED

### 📁 Project Structure
```
Python/
├── consensus-frontend/          # Next.js application (29 files)
│   ├── app/                     # Pages & API routes
│   │   ├── api/redteam/        # AI vulnerability analysis
│   │   ├── api/analyze/        # Contract Q&A
│   │   ├── dashboard/          # War Room dashboard
│   │   ├── upload/             # Secure upload page
│   │   ├── compare/            # Contract diff viewer
│   │   └── layout.tsx & page.tsx
│   ├── lib/regex-sanitizer.ts  # PII sanitization utility
│   ├── hooks/useWeb3.ts        # Web3 integration
│   └── Config files (package.json, tsconfig, tailwind, etc.)
│
├── contracts/                   # Solidity smart contracts
│   ├── Registry.sol            # Contract registry
│   ├── Escrow.sol              # Milestone-based escrow
│   ├── hardhat.config.js       # Hardhat setup
│   ├── scripts/deploy.js       # Deployment script
│   └── package.json
│
└── README.md                    # Full project documentation
```

### 🎯 Features Implemented
✅ Privacy-First PII Sanitization (client-side regex)
✅ Split-Screen Secure Upload (Raw | Sanitized)
✅ War Room Dashboard (contract monitoring)
✅ Contract Comparison Tool (diff viewer)
✅ Red Team AI Endpoint (vulnerability analysis)
✅ Contract Q&A AI Endpoint (summarization)
✅ Web3 Wallet Integration (MetaMask)
✅ Smart Contracts (Registry + Escrow)
✅ Deployment Scripts (Hardhat)

---

## 📋 PREREQUISITES

Before you can run the application, you need to install:

### 1. Node.js & npm
**Download & Install**: https://nodejs.org/
- Choose the **LTS version** (recommended)
- Installer includes npm automatically
- Restart your terminal after installation

**Verify Installation**:
```bash
node --version    # Should show v20.x.x or similar
npm --version     # Should show v10.x.x or similar
```

### 2. MetaMask Browser Extension (Optional for blockchain features)
**Install**: https://metamask.io/download/
- Available for Chrome, Firefox, Brave, Edge

### 3. OpenAI API Key (Optional for AI features)
**Get Key**: https://platform.openai.com/api-keys
- Sign up/login to OpenAI
- Create new API key
- Copy for later use

---

## 🔧 INSTALLATION STEPS

Once Node.js is installed, run these commands:

### Step 1: Install Frontend Dependencies
```bash
cd "c:\Users\SORMISTA PAL\Desktop\Python\consensus-frontend"
npm install
```

This will install:
- Next.js & React
- TypeScript
- Tailwind CSS
- Ethers.js (Web3)
- OpenAI SDK
- PDF.js
- And all other dependencies (~300MB)

### Step 2: Set Up Environment Variables

Create `.env.local` file in `consensus-frontend/`:
```bash
# Copy the example file
copy .env.local.example .env.local
```

Edit `.env.local` and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-openai-key-here
NEXT_PUBLIC_CHAIN_ID=80002
```

### Step 3: Install Contract Dependencies (Optional)
```bash
cd ..\contracts
npm install
```

This installs Hardhat and Solidity tools.

---

## ▶️ RUNNING THE APPLICATION

### Start Development Server
```bash
cd "c:\Users\SORMISTA PAL\Desktop\Python\consensus-frontend"
npm run dev
```

Visit: **http://localhost:3000**

### What You'll See
1. **Home Page** (`/`): Landing page with project overview
2. **Secure Upload** (`/upload`): Upload contracts, see PII sanitization in action
3. **Dashboard** (`/dashboard`): View contracts with risk scores
4. **Compare** (`/compare`): Compare two contract versions

---

## 🧪 TESTING THE FEATURES

### Test PII Sanitization
1. Go to `/upload`
2. Create a sample text file with:
   ```
   This agreement is between John Smith and Jane Doe.
   Payment of $50,000 due on 2026-03-15.
   Contact: john@example.com, phone: +1-555-1234
   ```
3. Upload → See PII masked as `[NAME_1]`, `[EMAIL_1]`, etc.

### Test AI Features (requires OpenAI API key)
- The sanitized text can be sent to AI for analysis
- Red Team will identify vulnerabilities
- Without API key, mock responses are returned

### Test Blockchain (requires MetaMask)
1. Install MetaMask
2. Add Polygon Amoy Testnet (instructions in README)
3. Get test MATIC from faucet
4. Deploy contracts with Hardhat

---

## 📦 DEPLOYMENT OPTIONS

### Vercel (Recommended for Frontend)
1. Push to GitHub (already done ✅)
2. Go to https://vercel.com/
3. Import your repository
4. Add environment variables
5. Deploy!

### Smart Contracts
```bash
cd contracts
npm run compile              # Compile Solidity
npm run deploy               # Deploy locally
npm run deploy:amoy          # Deploy to Polygon Amoy
```

---

## 🛠️ TROUBLESHOOTING

### "npm command not found"
→ Node.js not installed or not in PATH. Reinstall Node.js.

### "Module not found" errors
→ Run `npm install` in the correct directory.

### MetaMask not connecting
→ Ensure extension is installed and unlocked.

### PDF extraction failing
→ Use simple PDFs or upload as `.txt` files.

### TypeScript errors in editor
→ Normal until `npm install` is run. Errors will disappear.

---

## 📚 DOCUMENTATION

- **Main README**: `README.md` (project root)
- **Frontend README**: `consensus-frontend/README.md`
- **Contracts README**: `contracts/README.md`

---

## 🎯 NEXT STEPS FOR HACKATHON

### Phase 2: Integration (4-6 hours)
- [ ] Test frontend with real OpenAI API
- [ ] Deploy contracts to Polygon Amoy
- [ ] Connect frontend to deployed contracts
- [ ] Add IPFS document storage
- [ ] MongoDB for contract metadata

### Phase 3: Polish (2-4 hours)
- [ ] UI refinements and animations
- [ ] Error handling improvements
- [ ] Loading states
- [ ] Demo data seeding
- [ ] Record demo video

---

## 🏆 HACKATHON COMPLIANCE CHECK

✅ **Web**: Full Next.js application with modern UI
✅ **AI**: OpenAI GPT-4 integration (Red Team + Q&A)
✅ **Blockchain**: Smart contracts + Web3 integration

All three themes covered! 🎉

---

## 📞 SUPPORT

If you encounter issues:
1. Check the README files
2. Review console errors
3. Verify all dependencies are installed
4. Ensure environment variables are set

---

## 🎬 DEMO FLOW

1. **Start**: Show landing page explaining the concept
2. **Upload**: Demonstrate PII sanitization with split-screen
3. **Dashboard**: Show contract list with risk scores
4. **Compare**: Display contract diff viewer
5. **AI**: Show Red Team vulnerability analysis
6. **Blockchain**: Demonstrate wallet connection and contract registration

---

**Built for TechTriad Hackathon 2026**
**Repository**: https://github.com/sormxsta29/Consensus

Good luck with your hackathon! 🚀
