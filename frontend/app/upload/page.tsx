"use client";
import React, { useState, useRef } from "react";
import { sanitizePII, rehydrate } from "../../lib/regex-sanitizer";

export default function UploadPage() {
  const [rawText, setRawText] = useState<string>("");
  const [sanitized, setSanitized] = useState<string>("");
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string>("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("Processing...");
    try {
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        const text = await file.text();
        setRawText(text);
        const res = sanitizePII(text);
        setSanitized(res.sanitized);
        setMapping(res.mapping);
      } else if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        try {
          const pdfjs = await import("pdfjs-dist/build/pdf");
          // @ts-ignore
          pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${(pdfjs as any).version}/pdf.worker.min.js`;
          const array = await file.arrayBuffer();
          // @ts-ignore
          const doc = await (pdfjs as any).getDocument({ data: array }).promise;
          let txt = "";
          for (let i = 1; i <= doc.numPages; i++) {
            // @ts-ignore
            const page = await doc.getPage(i);
            const content = await page.getTextContent();
            const strs = content.items.map((s: any) => s.str).join(" ");
            txt += strs + "\n";
          }
          setRawText(txt);
          const res = sanitizePII(txt);
          setSanitized(res.sanitized);
          setMapping(res.mapping);
        } catch (err) {
          setRawText("");
          setSanitized("");
          setMapping({});
          setStatus("PDF text extraction failed in-browser. Please use server extraction or upload a .txt file.");
        }
      } else {
        setStatus("Unsupported file type — upload .txt or .pdf");
      }
    } catch (err) {
      setStatus("Error processing file");
    } finally {
      setStatus("");
    }
  };

  const handleCopySanitized = async () => {
    await navigator.clipboard.writeText(sanitized || "");
    setStatus("Sanitized text copied to clipboard");
    setTimeout(() => setStatus(""), 2000);
  };

  const handleRehydrate = () => {
    const original = rehydrate(sanitized, mapping);
    setRawText(original);
    setStatus("Rehydrated preview loaded");
    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Secure Upload — Split Preview</h1>
        <div className="mb-4">
          <input ref={fileRef} type="file" accept=".txt,.pdf" onChange={handleFile} />
          <div className="text-sm text-slate-600 mt-2">Upload a contract PDF or text file. PII will be masked locally.</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow-sm h-[60vh] overflow-auto">
            <h2 className="font-medium mb-2">Raw Document</h2>
            {rawText ? (
              <pre className="whitespace-pre-wrap text-sm font-mono">{rawText}</pre>
            ) : (
              <div className="text-sm text-slate-500">No document loaded.</div>
            )}
          </div>

          <div className="bg-white p-4 rounded shadow-sm h-[60vh] overflow-auto">
            <h2 className="font-medium mb-2">Sanitized Preview</h2>
            {sanitized ? (
              <>
                <pre className="whitespace-pre-wrap text-sm font-mono">{sanitized}</pre>
                <div className="mt-3 flex gap-2">
                  <button onClick={handleCopySanitized} className="px-3 py-1 bg-sky-600 text-white rounded">Copy</button>
                  <button onClick={handleRehydrate} className="px-3 py-1 bg-emerald-600 text-white rounded">Rehydrate Locally</button>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-1">Mapping</h3>
                  <ul className="text-xs text-slate-700">
                    {Object.entries(mapping).map(([k, v]) => (
                      <li key={k} className="mb-1"><strong>{k}</strong>: {v}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-sm text-slate-500">Sanitized preview will appear here.</div>
            )}
          </div>
        </div>

        {status && <div className="mt-4 text-sm text-rose-600">{status}</div>}
      </div>
    </div>
  );
}
