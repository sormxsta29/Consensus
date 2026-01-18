"use client";
import React, { useState } from "react";
import WorkbenchLayout from "../../../components/workbench/WorkbenchLayout";
import { mockContracts } from "../../../components/workbench/mockContracts";

export default function ReviewPage() {
  const [role, setRole] = useState("Creator");
  const [selected, setSelected] = useState(mockContracts[0].id);

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
                {role === 'Reviewer' && <button className="mt-2 px-3 py-1 bg-yellow-600 text-white rounded">Approve / Request Changes</button>}
              </div>

              <div className="p-4 border rounded">
                <div className="font-medium">Step 3 — Approve</div>
                <div className="text-sm text-war-room-500">Approver finalizes the contract.</div>
                {role === 'Approver' && <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded">Approve</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkbenchLayout>
  );
}
