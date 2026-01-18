"use client";
import React from "react";
import WorkbenchLayout from "../../../components/workbench/WorkbenchLayout";
import { mockContracts } from "../../../components/workbench/mockContracts";

export default function AuditPage() {
  const events = mockContracts.flatMap((c) => (
    (c.chainEvents || []).map((e) => ({ id: c.id, title: c.title, ...e }))
  ));

  return (
    <WorkbenchLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Audit & History</h2>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Unified Timeline</h3>
          <ul className="space-y-3">
            {events.map((ev, i) => (
              <li key={i} className="p-3 border rounded">
                <div className="text-sm text-war-room-500">{ev.ts}</div>
                <div className="font-medium">{ev.id} — {ev.title}</div>
                <div className="text-sm">{ev.action}</div>
              </li>
            ))}
            {events.length === 0 && <li className="text-sm text-war-room-500">No chain events available (mock data).</li>}
          </ul>
        </div>
      </div>
    </WorkbenchLayout>
  );
}
