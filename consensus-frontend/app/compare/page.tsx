"use client";
import { useState } from "react";
import { GitCompare, Plus, Minus, Upload } from "lucide-react";

export default function ComparePage() {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [diffView, setDiffView] = useState<"side-by-side" | "unified">("side-by-side");

  const handleLeftFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/plain") {
      const text = await file.text();
      setLeftText(text);
    }
  };

  const handleRightFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/plain") {
      const text = await file.text();
      setRightText(text);
    }
  };

  // Simple diff highlighting (character-level)
  const getDiff = () => {
    if (!leftText || !rightText) return null;
    
    const leftLines = leftText.split("\n");
    const rightLines = rightText.split("\n");
    const maxLines = Math.max(leftLines.length, rightLines.length);
    
    const diffs = [];
    for (let i = 0; i < maxLines; i++) {
      const left = leftLines[i] || "";
      const right = rightLines[i] || "";
      
      if (left === right) {
        diffs.push({ type: "equal", left, right, lineNum: i + 1 });
      } else if (!left) {
        diffs.push({ type: "added", left: "", right, lineNum: i + 1 });
      } else if (!right) {
        diffs.push({ type: "removed", left, right: "", lineNum: i + 1 });
      } else {
        diffs.push({ type: "modified", left, right, lineNum: i + 1 });
      }
    }
    
    return diffs;
  };

  const diffs = getDiff();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-war-room-900 mb-2 flex items-center gap-2">
            <GitCompare className="w-8 h-8 text-purple-600" />
            Contract Comparison
          </h1>
          <p className="text-war-room-600">
            Upload two contract versions to see differences side-by-side
          </p>
        </div>

        {/* Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors w-fit">
              <Upload className="w-4 h-4" />
              Upload Version A
              <input type="file" accept=".txt" onChange={handleLeftFile} className="hidden" />
            </label>
            <p className="text-xs text-war-room-500 mt-2">Original version of the contract</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded cursor-pointer hover:bg-emerald-700 transition-colors w-fit">
              <Upload className="w-4 h-4" />
              Upload Version B
              <input type="file" accept=".txt" onChange={handleRightFile} className="hidden" />
            </label>
            <p className="text-xs text-war-room-500 mt-2">Modified version of the contract</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setDiffView("side-by-side")}
            className={`px-4 py-2 rounded ${
              diffView === "side-by-side"
                ? "bg-purple-600 text-white"
                : "bg-white text-war-room-700 border border-war-room-300"
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setDiffView("unified")}
            className={`px-4 py-2 rounded ${
              diffView === "unified"
                ? "bg-purple-600 text-white"
                : "bg-white text-war-room-700 border border-war-room-300"
            }`}
          >
            Unified View
          </button>
        </div>

        {/* Diff Display */}
        {diffs ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {diffView === "side-by-side" ? (
              <div className="grid grid-cols-2 divide-x divide-slate-200">
                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-war-room-900">Version A</h3>
                  <div className="font-mono text-xs space-y-0.5">
                    {diffs.map((diff, idx) => (
                      <div
                        key={idx}
                        className={`px-2 py-1 ${
                          diff.type === "removed"
                            ? "bg-rose-100 text-rose-800"
                            : diff.type === "modified"
                            ? "bg-yellow-100 text-yellow-800"
                            : "text-war-room-700"
                        }`}
                      >
                        <span className="text-war-room-400 mr-2">{diff.lineNum}</span>
                        {diff.left || <span className="text-war-room-300 italic">(empty)</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-war-room-900">Version B</h3>
                  <div className="font-mono text-xs space-y-0.5">
                    {diffs.map((diff, idx) => (
                      <div
                        key={idx}
                        className={`px-2 py-1 ${
                          diff.type === "added"
                            ? "bg-emerald-100 text-emerald-800"
                            : diff.type === "modified"
                            ? "bg-yellow-100 text-yellow-800"
                            : "text-war-room-700"
                        }`}
                      >
                        <span className="text-war-room-400 mr-2">{diff.lineNum}</span>
                        {diff.right || <span className="text-war-room-300 italic">(empty)</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-war-room-900">Unified Diff</h3>
                <div className="font-mono text-xs space-y-0.5">
                  {diffs.map((diff, idx) => (
                    <div key={idx}>
                      {diff.type === "removed" && (
                        <div className="bg-rose-100 text-rose-800 px-2 py-1 flex items-center gap-2">
                          <Minus className="w-3 h-3" />
                          <span className="text-war-room-400">{diff.lineNum}</span>
                          {diff.left}
                        </div>
                      )}
                      {diff.type === "added" && (
                        <div className="bg-emerald-100 text-emerald-800 px-2 py-1 flex items-center gap-2">
                          <Plus className="w-3 h-3" />
                          <span className="text-war-room-400">{diff.lineNum}</span>
                          {diff.right}
                        </div>
                      )}
                      {diff.type === "modified" && (
                        <>
                          <div className="bg-rose-100 text-rose-800 px-2 py-1 flex items-center gap-2">
                            <Minus className="w-3 h-3" />
                            <span className="text-war-room-400">{diff.lineNum}</span>
                            {diff.left}
                          </div>
                          <div className="bg-emerald-100 text-emerald-800 px-2 py-1 flex items-center gap-2">
                            <Plus className="w-3 h-3" />
                            <span className="text-war-room-400">{diff.lineNum}</span>
                            {diff.right}
                          </div>
                        </>
                      )}
                      {diff.type === "equal" && (
                        <div className="text-war-room-700 px-2 py-1">
                          <span className="text-war-room-400 mr-2">{diff.lineNum}</span>
                          {diff.left}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center text-war-room-500">
            <GitCompare className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Upload two contracts to compare</p>
          </div>
        )}
      </div>
    </div>
  );
}
