"use client";
import React, { useState } from "react";
import WorkbenchLayout from "../../../components/workbench/WorkbenchLayout";
import { mockContracts } from "../../../components/workbench/mockContracts";

function diffLines(a: string, b: string) {
  const aLines = a.split('\n');
  const bLines = b.split('\n');
  const max = Math.max(aLines.length, bLines.length);
  const rows = [] as { left: string; right: string; changed: boolean }[];
  for (let i = 0; i < max; i++) {
    const l = aLines[i] ?? "";
    const r = bLines[i] ?? "";
    rows.push({ left: l, right: r, changed: l !== r });
  }
  return rows;
}

export default function ComparePage() {
  const c = mockContracts[0];
  const v1 = c.versions[0].text;
  const v2 = c.versions[1]?.text ?? v1;
  const rows = diffLines(v1, v2);

  return (
    <WorkbenchLayout>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Contract Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <div className="font-semibold mb-2">Version 1</div>
            <pre className="text-sm whitespace-pre-wrap">{v1}</pre>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="font-semibold mb-2">Version 2</div>
            <pre className="text-sm whitespace-pre-wrap">{v2}</pre>
          </div>
        </div>

        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Line-level diff (AI-identified changes highlighted)</h3>
          <table className="w-full">
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={r.changed ? 'bg-yellow-50' : ''}>
                  <td className="w-1/2 p-2 text-sm align-top border-r">{r.left || <span className="text-war-room-400">—</span>}</td>
                  <td className="w-1/2 p-2 text-sm align-top">{r.right || <span className="text-war-room-400">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </WorkbenchLayout>
  );
}
