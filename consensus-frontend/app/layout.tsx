import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Shield, FileText, GitCompare } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Consensus - Zero-Trust Contract Protocol',
  description: 'Privacy-First CLM Platform for TechTriad Hackathon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-war-room-800 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <Shield className="w-6 h-6" />
              Consensus
            </Link>
            <div className="flex gap-6">
              <Link href="/dashboard" className="flex items-center gap-1 hover:text-war-room-300">
                <FileText className="w-4 h-4" />
                Dashboard
              </Link>
              <Link href="/upload" className="flex items-center gap-1 hover:text-war-room-300">
                <Shield className="w-4 h-4" />
                Secure Upload
              </Link>
              <Link href="/compare" className="flex items-center gap-1 hover:text-war-room-300">
                <GitCompare className="w-4 h-4" />
                Compare
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
