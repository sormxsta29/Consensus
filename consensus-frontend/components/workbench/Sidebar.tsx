"use client"
import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-war-room-900">Contract Workbench</h2>
        <p className="text-sm text-war-room-500 mt-1">Manage contracts & approvals</p>
      </div>
      <nav className="p-4 space-y-2">
        <Link className="block px-3 py-2 rounded hover:bg-slate-100" href="/workbench/dashboard">Dashboard</Link>
        <Link className="block px-3 py-2 rounded hover:bg-slate-100" href="/workbench/create">Create / Upload</Link>
        <Link className="block px-3 py-2 rounded hover:bg-slate-100" href="/workbench/review">Review & Approval</Link>
        <Link className="block px-3 py-2 rounded hover:bg-slate-100 font-medium text-purple-600" href="/workbench/ai-analysis">🤖 AI Analysis</Link>
        <Link className="block px-3 py-2 rounded hover:bg-slate-100" href="/workbench/compare">Compare</Link>
        <Link className="block px-3 py-2 rounded hover:bg-slate-100" href="/workbench/audit">Audit & History</Link>
        <Link className="block px-3 py-2 rounded hover:bg-slate-100 font-medium text-blue-600" href="/workbench/blockchain">⛓️ Blockchain</Link>
      </nav>
    </aside>
  );
}
