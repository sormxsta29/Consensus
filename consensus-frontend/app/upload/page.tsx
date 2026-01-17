"use client";
import React, { useState, useRef } from "react";
import { sanitizePII, rehydrate, simpleHash } from "../../lib/regex-sanitizer";
import { Upload, Copy, RefreshCw, FileText, AlertTriangle } from "lucide-react";

export default function UploadPage() {
  const [rawText, setRawText] = useState<string>("");
  const [sanitized, setSanitized] = useState<string>("");
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [contractHash, setContractHash] = useState<string>("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setStatus("Processing document...");
    
    try {
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        const text = await file.text();
        processText(text);
      } else if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        try {
          // Dynamic import of PDF.js
          const pdfjs = await import("pdfjs-dist/build/pdf");
          // Set worker path to CDN
          (pdfjs as any).GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${(pdfjs as any).version}/pdf.worker.min.js`;
          
          const array = await file.arrayBuffer();
          const doc = await (pdfjs as any).getDocument({ data: array }).promise;
          let txt = "";
          
          for (let i = 1; i <= doc.numPages; i++) {
            const page = await doc.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map((item: any) => item.str).join(" ");
            txt += pageText + "\n";
          }
          
          processText(txt);
        } catch (err) {
          console.error("PDF extraction error:", err);
          setStatus("⚠️ PDF text extraction failed. Try uploading a .txt file or use server-side extraction.");
        }
      } else {
        setStatus("❌ Unsupported file type. Please upload .txt or .pdf");
      }
    } catch (err) {
      console.error("File processing error:", err);
      setStatus("❌ Error processing file");
    }
  };

  const processText = (text: string) => {
    setRawText(text);
    const res = sanitizePII(text);
    setSanitized(res.sanitized);
    setMapping(res.mapping);
    const hash = simpleHash(text);
    setContractHash(hash);
    setStatus("✅ Document processed successfully");
    setTimeout(() => setStatus(""), 3000);
  };

  const handleCopySanitized = async () => {
    if (!sanitized) return;
    await navigator.clipboard.writeText(sanitized);
    setStatus("📋 Sanitized text copied to clipboard");
    setTimeout(() => setStatus(""), 2000);
  };

  const handleRehydrate = () => {
    if (!sanitized || !mapping) return;
    const original = rehydrate(sanitized, mapping);
    setRawText(original);
    setStatus("🔄 Preview rehydrated with original PII");
    setTimeout(() => setStatus(""), 2000);
  };

  const maskingCount = Object.keys(mapping).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-war-room-900 mb-2 flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            Secure Upload - Split Preview
          </h1>
          <p className="text-war-room-600">
            Upload contracts with client-side PII sanitization. Your sensitive data never touches the server.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <input
              ref={fileRef}
              type="file"
              accept=".txt,.pdf"
              onChange={handleFile}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <Upload className="w-5 h-5" />
              Choose File
            </label>
            {fileName && (
              <div className="flex items-center gap-2 text-sm text-war-room-700">
                <FileText className="w-4 h-4" />
                <span className="font-medium">{fileName}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-war-room-500 mt-3">
            📄 Supported formats: .txt, .pdf (client-side extraction)
          </p>
          {maskingCount > 0 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-4 py-2 rounded">
              <AlertTriangle className="w-4 h-4" />
              <span>
                <strong>{maskingCount} PII elements</strong> sanitized | Hash: <code className="font-mono bg-white px-2 py-1 rounded">{contractHash}</code>
              </span>
            </div>
          )}
        </div>

        {/* Split Screen Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Raw Document */}
          <div className="bg-white rounded-lg shadow-md h-[65vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="font-semibold text-lg text-war-room-900">Raw Document</h2>
              <p className="text-sm text-war-room-600">Original contract text with PII intact</p>
            </div>
            <div className="flex-1 overflow-auto p-6">
              {rawText ? (
                <pre className="whitespace-pre-wrap text-sm font-mono text-war-room-800 leading-relaxed">
                  {rawText}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-war-room-400">
                  <FileText className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-center">No document loaded yet.<br />Upload a file to begin.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sanitized Preview */}
          <div className="bg-white rounded-lg shadow-md h-[65vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg text-war-room-900">Sanitized Preview</h2>
                <p className="text-sm text-war-room-600">PII masked with placeholder tokens</p>
              </div>
              {sanitized && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopySanitized}
                    className="flex items-center gap-1 px-3 py-1.5 bg-sky-600 text-white text-sm rounded hover:bg-sky-700 transition-colors"
                    title="Copy sanitized text"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={handleRehydrate}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors"
                    title="Restore original PII locally"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Rehydrate
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-auto p-6">
              {sanitized ? (
                <>
                  <pre className="whitespace-pre-wrap text-sm font-mono text-war-room-800 leading-relaxed">
                    {sanitized}
                  </pre>
                  
                  {/* Mapping Details */}
                  {Object.keys(mapping).length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <h3 className="text-sm font-semibold mb-3 text-war-room-900">PII Mapping (Secure - Client Only)</h3>
                      <div className="space-y-1.5 max-h-48 overflow-auto bg-slate-50 p-3 rounded">
                        {Object.entries(mapping).map(([key, value]) => (
                          <div key={key} className="text-xs font-mono flex gap-2">
                            <span className="text-blue-600 font-semibold">{key}</span>
                            <span className="text-war-room-400">→</span>
                            <span className="text-war-room-700">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-war-room-400">
                  <AlertTriangle className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-center">Sanitized preview will appear here.<br />Safe to send to AI for analysis.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        {status && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg px-6 py-3 text-sm text-blue-800">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
