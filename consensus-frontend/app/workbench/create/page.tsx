"use client";
import React, { useState } from "react";
import WorkbenchLayout from "../../../components/workbench/WorkbenchLayout";
import { mockContracts } from "../../../components/workbench/mockContracts";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("Blank");

  const templates = ["Blank", "NDA", "SaaS Agreement"];

  function handleCreate() {
    // Mock creation - in real app post to API
    alert("Created mock contract: " + title + " (template: " + selectedTemplate + ")");
    setTitle("");
    setText("");
  }

  return (
    <WorkbenchLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Create / Upload Contract</h2>
        <p className="text-sm text-war-room-500 mb-4">Upload .txt files or create from templates. Versioning UI appears after creation.</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-2 py-2 rounded" />

            <label className="block text-sm mt-3 mb-1">Template</label>
            <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} className="w-full border px-2 py-2 rounded">
              {templates.map((t) => <option key={t}>{t}</option>)}
            </select>

            <div className="mt-4">
              <label className="block text-sm mb-1">Upload (.txt)</label>
              <input type="file" accept=".txt" onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) setText(await f.text());
              }} />
            </div>

            <button onClick={handleCreate} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Create</button>
          </div>

          <div>
            <label className="block text-sm mb-1">Contract Text / Editor</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={12} className="w-full border rounded p-2 text-sm" />
          </div>
        </div>

        <div className="mt-6 text-sm text-war-room-500">Version history appears here after creation (mocked in demo).</div>
      </div>
    </WorkbenchLayout>
  );
}
