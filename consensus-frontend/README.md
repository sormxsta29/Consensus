# Consensus Frontend

Next.js 14 application for the Consensus CLM platform.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.local.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Visit http://localhost:3000

## Environment Variables

Required:
- `OPENAI_API_KEY`: Your OpenAI API key (get from https://platform.openai.com/api-keys)

Optional:
- `NEXT_PUBLIC_REGISTRY_ADDRESS`: Deployed Registry contract address
- `NEXT_PUBLIC_ESCROW_ADDRESS`: Deployed Escrow contract address
- `NEXT_PUBLIC_CHAIN_ID`: Blockchain network ID (80002 for Polygon Amoy)

## Features

### Secure Upload (`/upload`)
- Client-side PII sanitization
- Split-screen preview (raw vs sanitized)
- PDF text extraction
- Rehydration for local viewing

### Dashboard (`/dashboard`)
- Contract list with status
- Risk scores from AI analysis
- Blockchain hashes
- Statistics overview

### Compare (`/compare`)
- Contract version diff
- Side-by-side and unified views
- Line-by-line changes

## API Routes

### POST `/api/redteam`
Red Team AI analysis
```json
{
  "sanitizedText": "string"
}
```

### POST `/api/analyze`
Contract Q&A and summarization
```json
{
  "sanitizedText": "string",
  "question": "string (optional)"
}
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Ethers.js
- OpenAI API
- PDF.js (client-side extraction)

## Development

The app runs in development mode with hot reloading. TypeScript errors are expected until dependencies are installed with `npm install`.

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

For Vercel deployment, connect your GitHub repo and deploy with one click.
