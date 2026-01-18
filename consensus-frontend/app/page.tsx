import Link from 'next/link'
import { Shield, Brain, Lock, FileText } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-war-room-900 via-war-room-800 to-war-room-700 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Consensus
          </h1>
          <p className="text-2xl text-war-room-200 mb-2">The Zero-Trust Contract Protocol</p>
          <p className="text-lg text-war-room-300">Privacy-First CLM Platform • TechTriad Hackathon 2026</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-war-room-700/50 backdrop-blur-sm rounded-lg p-6 border border-war-room-600">
            <Shield className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Privacy-First</h3>
            <p className="text-war-room-300">
              PII sanitized locally before AI processing. Your data never leaves your control.
            </p>
          </div>

          <div className="bg-war-room-700/50 backdrop-blur-sm rounded-lg p-6 border border-war-room-600">
            <Brain className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Red Team AI</h3>
            <p className="text-war-room-300">
              Aggressive vulnerability analysis finds worst-case scenarios in your contracts.
            </p>
          </div>

          <div className="bg-war-room-700/50 backdrop-blur-sm rounded-lg p-6 border border-war-room-600">
            <Lock className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Blockchain Trust</h3>
            <p className="text-war-room-300">
              Immutable registry and smart escrow on Polygon Amoy testnet.
            </p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex gap-4 justify-center">
            <Link
              href="/workbench/dashboard"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform"
            >
              <FileText className="w-5 h-5" />
              Open Workbench
            </Link>
            <Link
              href="/workbench/ai-analysis"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform"
            >
              🤖 AI Analysis
            </Link>
          </div>
          <div>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              <Shield className="w-5 h-5" />
              Quick Upload
            </Link>
          </div>
        </div>

        <div className="mt-20 bg-war-room-800/50 backdrop-blur-sm rounded-lg p-8 border border-war-room-600">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <ol className="space-y-3 text-war-room-200">
            <li className="flex gap-3">
              <span className="font-bold text-blue-400">1.</span>
              <span>Upload contract PDF/text — PII is masked client-side using regex patterns</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-emerald-400">2.</span>
              <span>Red Team AI analyzes sanitized text for vulnerabilities and risk scores</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-purple-400">3.</span>
              <span>Register contract hash on blockchain — immutable audit trail</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-yellow-400">4.</span>
              <span>Deploy escrow smart contract for milestone-based payments</span>
            </li>
          </ol>
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-lg p-8 border border-purple-600">
          <h2 className="text-2xl font-bold mb-4 text-center">🚀 Contract Management Workbench Features</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-war-room-800/50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-blue-300">📊 Dashboard</h3>
              <p className="text-sm text-war-room-300">Contract list with filters, metrics, and AI alerts</p>
            </div>
            <div className="bg-war-room-800/50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-emerald-300">📝 Create & Upload</h3>
              <p className="text-sm text-war-room-300">Upload contracts, use templates, version management</p>
            </div>
            <div className="bg-war-room-800/50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-yellow-300">✅ Review & Approval</h3>
              <p className="text-sm text-war-room-300">Multi-step workflows with role-based access</p>
            </div>
            <div className="bg-war-room-800/50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-purple-300">🤖 AI Intelligence</h3>
              <p className="text-sm text-war-room-300">Summarization, clause extraction, risk detection, Q&A</p>
            </div>
            <div className="bg-war-room-800/50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-pink-300">🔍 Compare Versions</h3>
              <p className="text-sm text-war-room-300">Visual diff with AI-identified changes</p>
            </div>
            <div className="bg-war-room-800/50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-cyan-300">📜 Audit & History</h3>
              <p className="text-sm text-war-room-300">Unified timeline with blockchain-verified actions</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
