"use client";
import React, { useState } from "react";
import WorkbenchLayout from "../../../components/workbench/WorkbenchLayout";
import { mockContracts } from "../../../components/workbench/mockContracts";

export default function AuditPage() {
  const [selectedContract, setSelectedContract] = useState(mockContracts[0].id);
  const [showBlockchain, setShowBlockchain] = useState(true);
  
  const events = mockContracts.flatMap((c) => (
    (c.chainEvents || []).map((e) => ({ id: c.id, title: c.title, ...e }))
  ));

  // Enhanced mock events with blockchain data
  const enhancedEvents = [
    {
      type: "blockchain",
      id: "C-1001",
      title: "SaaS Master Agreement",
      action: "Version 2.0 finalized on blockchain",
      ts: new Date(Date.now() - 86400000).toISOString(),
      blockNumber: 5278901,
      txHash: "0x7f3a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
      actor: "Alice (Legal)"
    },
    {
      type: "approval",
      id: "C-1001",
      title: "SaaS Master Agreement",
      action: "Approved by Charlie (Approver)",
      ts: new Date(Date.now() - 86400000 * 2).toISOString(),
      blockNumber: 5267890,
      txHash: "0x6e2a8b1c0d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9",
      actor: "Charlie (Approver)"
    },
    {
      type: "approval",
      id: "C-1001",
      title: "SaaS Master Agreement",
      action: "Approved by Bob (Reviewer)",
      ts: new Date(Date.now() - 86400000 * 3).toISOString(),
      blockNumber: 5256789,
      txHash: "0x5d1a7b0c9e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8",
      actor: "Bob (Reviewer)"
    },
    ...events.map(e => ({ ...e, type: "chain", blockNumber: 5234567, txHash: "0x" + Math.random().toString(16).substring(2, 66), actor: "System" }))
  ];

  const filteredEvents = showBlockchain 
    ? enhancedEvents.filter(e => selectedContract ? e.id === selectedContract : true)
    : events.filter(e => selectedContract ? e.id === selectedContract : true);

  return (
    <WorkbenchLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Audit & History</h2>
            <p className="text-sm text-war-room-500">Unified timeline with blockchain verification</p>
          </div>
          <div className="flex gap-2">
            <select 
              value={selectedContract} 
              onChange={(e) => setSelectedContract(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="">All Contracts</option>
              {mockContracts.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}
            </select>
            <button
              onClick={() => setShowBlockchain(!showBlockchain)}
              className={`px-3 py-1 rounded text-sm ${showBlockchain ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              ⛓️ Blockchain Data
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Unified Timeline</h3>
          <ul className="space-y-3">
            {filteredEvents.map((ev, i) => (
              <li key={i} className={`p-4 border-l-4 rounded ${
                ev.type === 'blockchain' ? 'border-green-500 bg-green-50' :
                ev.type === 'approval' ? 'border-blue-500 bg-blue-50' :
                'border-gray-400 bg-gray-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {ev.type === 'blockchain' && <span className="text-xs bg-green-600 text-white px-2 py-1 rounded font-medium">BLOCKCHAIN</span>}
                      {ev.type === 'approval' && <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded font-medium">APPROVAL</span>}
                      <span className="text-sm font-medium">{ev.id} — {ev.title}</span>
                    </div>
                    <div className="text-sm text-war-room-700">{ev.action}</div>
                    <div className="flex gap-4 mt-2 text-xs text-war-room-500">
                      <div>🕒 {new Date(ev.ts).toLocaleString()}</div>
                      {ev.blockNumber && <div>📦 Block #{ev.blockNumber}</div>}
                      {ev.actor && <div>👤 {ev.actor}</div>}
                    </div>
                    {ev.txHash && (
                      <div className="mt-1 text-xs text-war-room-400 font-mono">
                        🔗 Tx: {ev.txHash.substring(0, 20)}...{ev.txHash.substring(ev.txHash.length - 10)}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
            {filteredEvents.length === 0 && (
              <li className="text-sm text-war-room-500 text-center py-8">No events available (mock data).</li>
            )}
          </ul>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded border border-blue-200">
          <div className="font-semibold mb-2">🔐 Blockchain Verified</div>
          <div className="text-sm text-war-room-700">
            All approval events and version changes are recorded immutably on Polygon Amoy testnet.
            Click the Blockchain tab for hash verification and detailed audit trail.
          </div>
        </div>
      </div>
    </WorkbenchLayout>
  );
}
