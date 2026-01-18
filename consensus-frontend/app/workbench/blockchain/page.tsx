"use client";
import React, { useState } from "react";
import WorkbenchLayout from "../../../components/workbench/WorkbenchLayout";

export default function BlockchainPage() {
  const [hash, setHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [contractId, setContractId] = useState("C-1001");
  const [auditTrail, setAuditTrail] = useState<any[]>([]);
  const [loadingAudit, setLoadingAudit] = useState(false);

  async function handleVerifyHash() {
    if (!hash) return;
    setLoading(true);
    try {
      const res = await fetch("/api/blockchain/verify-hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hash })
      });
      const data = await res.json();
      setVerifyResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleGetAuditTrail() {
    setLoadingAudit(true);
    try {
      const res = await fetch(`/api/blockchain/audit-trail?contractId=${contractId}`);
      const data = await res.json();
      if (data.success) {
        setAuditTrail(data.auditTrail);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAudit(false);
    }
  }

  const formatTimestamp = (ts: number) => new Date(ts).toLocaleString();

  return (
    <WorkbenchLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">⛓️ Blockchain Verification & Audit</h2>
          <p className="text-sm text-war-room-500">Trust and auditability through immutable blockchain records</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Hash Verification */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-3">🔍 Public Hash Verification</h3>
            <p className="text-sm text-war-room-600 mb-4">
              Verify contract integrity without accessing content. Third parties can confirm a document hasn't been altered.
            </p>
            
            <label className="block text-sm font-medium mb-2">Contract Hash</label>
            <input
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              placeholder="0xabc123... or enter any hash"
              className="w-full border rounded px-3 py-2 text-sm mb-3"
            />
            
            <button
              onClick={handleVerifyHash}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify on Blockchain"}
            </button>

            {verifyResult && (
              <div className={`mt-4 p-4 rounded border ${verifyResult.verified ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                {verifyResult.verified ? (
                  <>
                    <div className="font-semibold text-green-800 mb-2">✅ Hash Verified</div>
                    <div className="text-sm space-y-1">
                      <div><span className="font-medium">Contract ID:</span> {verifyResult.contractId}</div>
                      <div><span className="font-medium">Registered:</span> {formatTimestamp(verifyResult.timestamp)}</div>
                      <div><span className="font-medium">Block:</span> #{verifyResult.blockNumber}</div>
                    </div>
                  </>
                ) : (
                  <div className="font-semibold text-red-800">❌ Hash Not Found</div>
                )}
                <div className="text-xs text-war-room-500 mt-2">{verifyResult.message}</div>
              </div>
            )}
          </div>

          {/* Contract Info */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-3">📄 Contract Integrity Status</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">Version 2.0</span>
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Finalized</span>
                </div>
                <div className="text-xs text-war-room-600">Hash: 0xdef456...789</div>
                <div className="text-xs text-war-room-500">Block #5278901 • 1 day ago</div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">Version 1.0</span>
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Archived</span>
                </div>
                <div className="text-xs text-war-room-600">Hash: 0xabc123...456</div>
                <div className="text-xs text-war-room-500">Block #5234567 • 5 days ago</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded">
              <div className="font-semibold text-purple-800 mb-1">Blockchain Network</div>
              <div className="text-sm">Polygon Amoy Testnet</div>
              <div className="text-xs text-war-room-500 mt-1">All records are immutable and publicly verifiable</div>
            </div>
          </div>
        </div>

        {/* Audit Trail */}
        <div className="bg-white p-6 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">📜 Blockchain Audit Trail</h3>
            <div className="flex gap-2 items-center">
              <input
                value={contractId}
                onChange={(e) => setContractId(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
                placeholder="Contract ID"
              />
              <button
                onClick={handleGetAuditTrail}
                disabled={loadingAudit}
                className="px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm disabled:opacity-50"
              >
                {loadingAudit ? "Loading..." : "Load Trail"}
              </button>
            </div>
          </div>

          {auditTrail.length > 0 ? (
            <div className="space-y-3">
              {auditTrail.map((event, i) => (
                <div key={i} className="p-4 border-l-4 border-blue-500 bg-slate-50 rounded">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          event.eventType === 'finalized' ? 'bg-green-100 text-green-800' :
                          event.eventType === 'approved' ? 'bg-blue-100 text-blue-800' :
                          event.eventType === 'created' ? 'bg-purple-100 text-purple-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.eventType.toUpperCase()}
                        </span>
                        <span className="text-sm font-medium">{event.actorName}</span>
                      </div>
                      <div className="text-sm text-war-room-700">{event.details}</div>
                      <div className="flex gap-4 mt-2 text-xs text-war-room-500">
                        <div>🕒 {formatTimestamp(event.timestamp)}</div>
                        <div>📦 Block #{event.blockNumber}</div>
                        <div title={event.transactionHash}>🔗 Tx: {event.transactionHash.substring(0, 10)}...</div>
                      </div>
                    </div>
                    <div className="text-xs text-war-room-400 font-mono">{event.versionHash}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-war-room-500 py-8">
              Enter a contract ID and click "Load Trail" to view blockchain audit events
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded shadow border border-blue-200">
          <h3 className="font-bold mb-2">ℹ️ About Blockchain Integration</h3>
          <div className="text-sm text-war-room-700 space-y-2">
            <p><strong>On-Chain:</strong> Contract hashes, version numbers, approval signatures, timestamps, and audit events</p>
            <p><strong>Off-Chain:</strong> Full contract text, PII, and sensitive business terms (stored encrypted or sanitized)</p>
            <p><strong>Benefits:</strong> Tamper-proof audit trail, public verifiability, trustless dispute resolution</p>
            <p><strong>Privacy:</strong> Only cryptographic hashes go on-chain - no sensitive data exposed publicly</p>
          </div>
        </div>
      </div>
    </WorkbenchLayout>
  );
}
