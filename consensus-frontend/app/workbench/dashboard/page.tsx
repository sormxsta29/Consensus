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
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-war-room-500">Total contracts</div>
            <div className="text-2xl font-semibold">{metrics.total}</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-war-room-500">In Review</div>
            <div className="text-2xl font-semibold">{metrics.inReview}</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-war-room-500">AI Alerts</div>
            <div className="text-2xl font-semibold text-red-600">{metrics.alerts}</div>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded shadow mb-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-purple-900">🤖 AI Contract Intelligence Available</h3>
              <p className="text-sm text-purple-700 mt-1">Analyze contracts with AI-powered summarization, clause extraction, and risk detection</p>
            </div>
            <a href="/workbench/ai-analysis" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Open AI Analysis
            </a>
          </div>
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
                <th>AI Alerts</th>
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
                  <td><span className={`px-2 py-1 rounded text-xs ${c.status === 'Review' ? 'bg-yellow-100 text-yellow-800' : c.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{c.status}</span></td>
                  <td>
                    {c.aiAlerts && c.aiAlerts.length > 0 ? (
                      <span className="text-xs text-red-600">⚠️ {c.aiAlerts.length}</span>
                    ) : (
                      <span className="text-xs text-green-600">✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent AI Alerts */}
        <div className="bg-white p-4 rounded shadow mt-6">
          <h3 className="font-semibold mb-3">Recent AI Alerts</h3>
          <div className="space-y-2">
            {mockContracts
              .filter((c) => c.aiAlerts && c.aiAlerts.length > 0)
              .flatMap((c) => c.aiAlerts!.map((alert) => ({ id: c.id, title: c.title, alert })))
              .map((item, i) => (
                <div key={i} className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <div className="text-sm font-medium">{item.id} — {item.title}</div>
                  <div className="text-sm text-war-room-700 mt-1">{item.alert}</div>
                </div>
              ))}
            {mockContracts.filter((c) => c.aiAlerts && c.aiAlerts.length > 0).length === 0 && (
              <div className="text-sm text-war-room-500">No AI alerts at this time</div>
            )}
          </div>
        </div>
      </div>
    </WorkbenchLayout>
  );
}
