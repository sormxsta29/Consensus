"use client";
import { useState } from "react";
import { FileText, AlertTriangle, CheckCircle, Clock, Shield } from "lucide-react";

type Contract = {
  id: string;
  name: string;
  status: "pending" | "analyzed" | "registered";
  riskScore: number;
  hash: string;
  uploadedAt: string;
};

const mockContracts: Contract[] = [
  {
    id: "1",
    name: "Vendor Agreement - TechCorp.pdf",
    status: "registered",
    riskScore: 32,
    hash: "0x7a3f9c2e...",
    uploadedAt: "2026-01-17T10:30:00Z",
  },
  {
    id: "2",
    name: "Employment Contract - Jane Doe.pdf",
    status: "analyzed",
    riskScore: 18,
    hash: "0x4b2d8f1a...",
    uploadedAt: "2026-01-17T09:15:00Z",
  },
  {
    id: "3",
    name: "NDA - Project Consensus.pdf",
    status: "pending",
    riskScore: 0,
    hash: "0x9e5c7d3b...",
    uploadedAt: "2026-01-17T08:45:00Z",
  },
];

export default function DashboardPage() {
  const [contracts] = useState<Contract[]>(mockContracts);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "registered":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "analyzed":
        return <Shield className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-emerald-600 bg-emerald-50";
    if (score < 60) return "text-yellow-600 bg-yellow-50";
    return "text-rose-600 bg-rose-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-war-room-900 to-war-room-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
            <Shield className="w-10 h-10 text-blue-400" />
            War Room Dashboard
          </h1>
          <p className="text-war-room-300 text-lg">
            Monitor contract status, risk scores, and blockchain registration
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-war-room-700/50 backdrop-blur-sm border border-war-room-600 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-war-room-300 text-sm mb-1">Total Contracts</p>
                <p className="text-3xl font-bold text-white">{contracts.length}</p>
              </div>
              <FileText className="w-12 h-12 text-blue-400 opacity-50" />
            </div>
          </div>

          <div className="bg-war-room-700/50 backdrop-blur-sm border border-war-room-600 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-war-room-300 text-sm mb-1">Avg Risk Score</p>
                <p className="text-3xl font-bold text-white">
                  {Math.round(contracts.reduce((sum, c) => sum + c.riskScore, 0) / contracts.length)}
                </p>
              </div>
              <AlertTriangle className="w-12 h-12 text-yellow-400 opacity-50" />
            </div>
          </div>

          <div className="bg-war-room-700/50 backdrop-blur-sm border border-war-room-600 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-war-room-300 text-sm mb-1">On Blockchain</p>
                <p className="text-3xl font-bold text-white">
                  {contracts.filter((c) => c.status === "registered").length}
                </p>
              </div>
              <Shield className="w-12 h-12 text-emerald-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* Contracts Table */}
        <div className="bg-war-room-700/50 backdrop-blur-sm border border-war-room-600 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-war-room-600">
            <h2 className="text-xl font-semibold text-white">Contract Registry</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-war-room-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-war-room-300 uppercase tracking-wider">
                    Contract Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-war-room-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-war-room-300 uppercase tracking-wider">
                    Risk Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-war-room-300 uppercase tracking-wider">
                    Hash
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-war-room-300 uppercase tracking-wider">
                    Uploaded
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-war-room-600">
                {contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-war-room-600/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-medium text-white">{contract.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(contract.status)}
                        <span className="text-sm text-war-room-200 capitalize">{contract.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(contract.riskScore)}`}>
                        {contract.riskScore > 0 ? contract.riskScore : "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-xs text-war-room-300 font-mono bg-war-room-800 px-2 py-1 rounded">
                        {contract.hash}
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-war-room-300">
                      {new Date(contract.uploadedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
