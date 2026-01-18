"use client";
import React, { useMemo, useState } from "react";
import WorkbenchLayout from "../../../components/workbench/WorkbenchLayout";
import { mockContracts, Contract } from "../../../components/workbench/mockContracts";

export default function DashboardPage() {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [ownerFilter, setOwnerFilter] = useState<string>("All");

  const owners = useMemo(() => Array.from(new Set(mockContracts.map((c) => c.owner))), []);

  const filtered = mockContracts.filter((c) => {
    if (statusFilter !== "All" && c.status !== statusFilter) return false;
    if (ownerFilter !== "All" && c.owner !== ownerFilter) return false;
    return true;
  });

  const metrics = {
    total: mockContracts.length,
    inReview: mockContracts.filter((c) => c.status === "Review").length,
    alerts: mockContracts.reduce((s, c) => s + (c.aiAlerts?.length || 0), 0)
  };

  return (
    <WorkbenchLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Contract Dashboard</h2>
          <p className="text-sm text-war-room-500">Overview of contracts, metrics and alerts</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">Total contracts<div className="text-2xl font-semibold">{metrics.total}</div></div>
          <div className="bg-white p-4 rounded shadow">In Review<div className="text-2xl font-semibold">{metrics.inReview}</div></div>
          <div className="bg-white p-4 rounded shadow">AI Alerts<div className="text-2xl font-semibold">{metrics.alerts}</div></div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded px-2 py-1">
                <option>All</option>
                <option>Draft</option>
                <option>Review</option>
                <option>Approved</option>
                <option>Expired</option>
              </select>
              <select value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value)} className="border rounded px-2 py-1">
                <option>All</option>
                {owners.map((o) => (<option key={o}>{o}</option>))}
              </select>
            </div>
            <div className="text-sm text-war-room-500">Filters</div>
          </div>

          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-war-room-600">
                <th className="py-2">ID</th>
                <th>Title</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Expiry</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c: Contract) => (
                <tr key={c.id} className="border-t">
                  <td className="py-3 font-medium">{c.id}</td>
                  <td>{c.title}</td>
                  <td>{c.owner}</td>
                  <td>{c.type}</td>
                  <td>{c.expiry}</td>
                  <td>{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </WorkbenchLayout>
  );
}
