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

        <div className="text-center">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform"
          >
            <FileText className="w-5 h-5" />
            Start Secure Upload
          </Link>
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
      </div>
    </main>
  )
}
