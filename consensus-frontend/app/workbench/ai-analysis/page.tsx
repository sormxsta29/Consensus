"use client";
import React, { useState } from "react";
import WorkbenchLayout from "../../../components/workbench/WorkbenchLayout";

type Summary = {
  overview: string;
  keyTerms: { term: string; value: string; source: string }[];
  obligations: { party: string; obligation: string; source: string }[];
  risks: { level: string; description: string; source: string }[];
};

type Clause = {
  type: string;
  content: string;
  source: string;
  importance: string;
};

type Risk = {
  severity: string;
  category: string;
  finding: string;
  explanation: string;
  source: string;
  recommendation: string;
  confidence: number;
};

type QAResponse = {
  answer: string;
  sources: { text: string; location: string }[];
  confidence: number;
};

export default function AIAnalysisPage() {
  const [contractText, setContractText] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [question, setQuestion] = useState("");
  const [qaResponse, setQaResponse] = useState<QAResponse | null>(null);

  async function handleSummarize() {
    setLoading("summarize");
    try {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractText })
      });
      const data = await res.json();
      if (data.success) setSummary(data.summary);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  }

  async function handleExtractClauses() {
    setLoading("clauses");
    try {
      const res = await fetch("/api/ai/extract-clauses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractText })
      });
      const data = await res.json();
      if (data.success) setClauses(data.clauses);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  }

  async function handleDetectRisks() {
    setLoading("risks");
    try {
      const res = await fetch("/api/ai/detect-risks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractText })
      });
      const data = await res.json();
      if (data.success) setRisks(data.risks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  }

  async function handleAskQuestion() {
    setLoading("qa");
    try {
      const res = await fetch("/api/ai/contract-qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractText, question })
      });
      const data = await res.json();
      if (data.success) {
        setQaResponse({ answer: data.answer, sources: data.sources, confidence: data.confidence });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  }

  const severityColor = (sev: string) => {
    if (sev === "High") return "bg-red-100 text-red-800";
    if (sev === "Medium") return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };

  return (
    <WorkbenchLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">AI Contract Intelligence</h2>
          <p className="text-sm text-war-room-500">Analyze contracts with AI-powered summarization, clause extraction, risk detection, and Q&amp;A</p>
        </div>

        {/* Contract Input */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <label className="block text-sm font-medium mb-2">Contract Text</label>
          <textarea
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            rows={8}
            className="w-full border rounded p-3 text-sm"
            placeholder="Paste contract text here..."
          />
          <div className="flex gap-2 mt-3">
            <button onClick={handleSummarize} disabled={loading === "summarize"} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
              {loading === "summarize" ? "Summarizing..." : "Summarize"}
            </button>
            <button onClick={handleExtractClauses} disabled={loading === "clauses"} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
              {loading === "clauses" ? "Extracting..." : "Extract Clauses"}
            </button>
            <button onClick={handleDetectRisks} disabled={loading === "risks"} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50">
              {loading === "risks" ? "Analyzing..." : "Detect Risks"}
            </button>
          </div>
        </div>

        {/* Summary Section */}
        {summary && (
          <div className="bg-white p-6 rounded shadow mb-6">
            <h3 className="text-xl font-bold mb-3">📄 Contract Summary</h3>
            <p className="mb-4 text-war-room-700">{summary.overview}</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Key Terms</h4>
              <div className="space-y-2">
                {summary.keyTerms.map((kt, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded">
                    <div className="font-medium">{kt.term}: {kt.value}</div>
                    <div className="text-xs text-war-room-500 mt-1">Source: {kt.source}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Obligations</h4>
              <div className="space-y-2">
                {summary.obligations.map((ob, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded">
                    <div><span className="font-medium">{ob.party}:</span> {ob.obligation}</div>
                    <div className="text-xs text-war-room-500 mt-1">Source: {ob.source}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Summary Risks</h4>
              <div className="space-y-2">
                {summary.risks.map((r, i) => (
                  <div key={i} className={`p-3 rounded ${severityColor(r.level)}`}>
                    <div className="font-medium">[{r.level}] {r.description}</div>
                    <div className="text-xs mt-1">Source: {r.source}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Clauses Section */}
        {clauses.length > 0 && (
          <div className="bg-white p-6 rounded shadow mb-6">
            <h3 className="text-xl font-bold mb-3">📋 Extracted Clauses</h3>
            <div className="space-y-3">
              {clauses.map((c, i) => (
                <div key={i} className="p-4 border rounded">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-lg">{c.type}</div>
                    <span className={`text-xs px-2 py-1 rounded ${c.importance === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {c.importance}
                    </span>
                  </div>
                  <p className="text-war-room-700 mb-2">{c.content}</p>
                  <div className="text-xs text-war-room-500">📍 {c.source}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Risks Section */}
        {risks.length > 0 && (
          <div className="bg-white p-6 rounded shadow mb-6">
            <h3 className="text-xl font-bold mb-3">⚠️ Risk Analysis</h3>
            <div className="space-y-4">
              {risks.map((r, i) => (
                <div key={i} className={`p-4 border-l-4 rounded ${r.severity === 'High' ? 'border-red-500 bg-red-50' : r.severity === 'Medium' ? 'border-yellow-500 bg-yellow-50' : 'border-blue-500 bg-blue-50'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${severityColor(r.severity)}`}>{r.severity}</span>
                      <span className="ml-2 text-sm text-war-room-500">{r.category}</span>
                    </div>
                    <div className="text-xs text-war-room-500">Confidence: {(r.confidence * 100).toFixed(0)}%</div>
                  </div>
                  <div className="font-semibold mb-1">{r.finding}</div>
                  <p className="text-sm text-war-room-700 mb-2">{r.explanation}</p>
                  <div className="text-xs text-war-room-500 mb-2">📍 {r.source}</div>
                  <div className="text-sm bg-white p-2 rounded border">
                    <span className="font-medium">Recommendation:</span> {r.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Q&A Section */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-3">💬 Contract Q&amp;A</h3>
          <div className="flex gap-2 mb-4">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 border rounded px-3 py-2"
              placeholder="Ask a question about the contract..."
              onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
            />
            <button onClick={handleAskQuestion} disabled={loading === "qa"} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50">
              {loading === "qa" ? "Asking..." : "Ask"}
            </button>
          </div>

          {qaResponse && (
            <div className="p-4 bg-slate-50 rounded">
              <div className="font-medium mb-2">Answer:</div>
              <p className="mb-3 text-war-room-700">{qaResponse.answer}</p>
              {qaResponse.sources.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-1">Sources:</div>
                  {qaResponse.sources.map((s, i) => (
                    <div key={i} className="text-sm p-2 bg-white rounded mb-1">
                      <div className="text-war-room-700">"{s.text}"</div>
                      <div className="text-xs text-war-room-500">📍 {s.location}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-xs text-war-room-500 mt-2">Confidence: {(qaResponse.confidence * 100).toFixed(0)}%</div>
            </div>
          )}
        </div>
      </div>
    </WorkbenchLayout>
  );
}
