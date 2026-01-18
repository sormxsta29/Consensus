"use client";
import React, { useState } from "react";
import WorkbenchLayout from "../../../components/workbench/WorkbenchLayout";
import { mockContracts } from "../../../components/workbench/mockContracts";

export default function ReviewPage() {
  const [role, setRole] = useState("Creator");
  const [selected, setSelected] = useState(mockContracts[0].id);
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleApprove() {
    // Mock blockchain approval recording
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // In production: call /api/blockchain/record-approval
    /*
    const res = await fetch("/api/blockchain/record-approval", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contractId: selected,
        versionNumber: 2,
        role,
        comment: "Approved",
        signature: "0x..."
      })
    });
    */
  }

  return (
    <WorkbenchLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Review & Approval</h2>
          <div>
            <label className="text-sm mr-2">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="border rounded px-2 py-1">
              <option>Creator</option>
              <option>Reviewer</option>
              <option>Approver</option>
            </select>
          </div>
        </div>

        {showSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-500 rounded">
            <div className="font-semibold text-green-800">✅ Approval recorded on blockchain</div>
            <div className="text-sm text-green-700">Transaction: 0x7f3a...9f0 • Block #5289012</div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <h3 className="font-semibold mb-2">Contracts</h3>
            <ul>
              {mockContracts.map((c) => (
                <li key={c.id} className={`py-2 cursor-pointer ${selected === c.id ? 'bg-slate-100' : ''}`} onClick={() => setSelected(c.id)}>
                  <div className="font-medium">{c.id} — {c.title}</div>
                  <div className="text-sm text-war-room-500">{c.status}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2">
            <h3 className="font-semibold mb-2">Approval Flow</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded">
                <div className="font-medium">Step 1 — Draft</div>
                <div className="text-sm text-war-room-500">Creator provides initial draft.</div>
                {role === 'Creator' && <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">Submit for review</button>}
              </div>

              <div className="p-4 border rounded">
                <div className="font-medium">Step 2 — Review</div>
                <div className="text-sm text-war-room-500">Reviewers annotate and comment.</div>
                {role === 'Reviewer' && (
                  <button onClick={handleApprove} className="mt-2 px-3 py-1 bg-yellow-600 text-white rounded">
                    Approve / Request Changes
                  </button>
                )}
              </div>

              <div className="p-4 border rounded">
                <div className="font-medium">Step 3 — Approve</div>
                <div className="text-sm text-war-room-500">Approver finalizes the contract.</div>
                {role === 'Approver' && (
                  <button onClick={handleApprove} className="mt-2 px-3 py-1 bg-green-600 text-white rounded">
                    Approve
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="font-semibold text-blue-800 mb-1">⛓️ Blockchain Integration</div>
              <div className="text-sm text-blue-700">
                All approval actions are recorded immutably on-chain with timestamp, role, and signature.
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkbenchLayout>
  );
}
