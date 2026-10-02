"use client";

import { useState } from "react";
import Dropzone from "./Dropzone";
import { downloadBlob, formatBytes } from "@/lib/format";

type SplitResult = { name: string; blob: Blob; size: number };

export default function SplitPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [mode, setMode] = useState<"range" | "every">("range");
  const [rangeStr, setRangeStr] = useState("");
  const [results, setResults] = useState<SplitResult[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(incoming: File[]) {
    const pdf = incoming.find(
      (f) => f.type === "application/pdf" || /\.pdf$/i.test(f.name)
    );
    if (!pdf) return;
    setResults(null);
    setError(null);
    setRangeStr("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await pdf.arrayBuffer(), {
        ignoreEncryption: true,
      });
      setFile(pdf);
      setPageCount(doc.getPageCount());
    } catch {
      setFile(null);
      setPageCount(0);
      setError(
        "Could not read this PDF. Encrypted or corrupted files may not be supported."
      );
    }
  }

  function parseRange(s: string, count: number): number[] | null {
    const indices = new Set<number>();
    for (const partRaw of s.split(",")) {
      const part = partRaw.trim();
      if (!part) continue;
      const m = part.match(/^(\d+)\s*-\s*(\d+)$/);
      if (m) {
        const a = parseInt(m[1], 10);
        const b = parseInt(m[2], 10);
        if (a < 1 || b > count || a > b) return null;
        for (let i = a; i <= b; i++) indices.add(i - 1);
      } else if (/^\d+$/.test(part)) {
        const n = parseInt(part, 10);
        if (n < 1 || n > count) return null;
        indices.add(n - 1);
      } else {
        return null;
      }
    }
    if (!indices.size) return null;
    return [...indices].sort((x, y) => x - y);
  }

  async function split() {
    if (!file || busy) return;
    setBusy(true);
    setError(null);
    setResults(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await file.arrayBuffer(), {
        ignoreEncryption: true,
      });
      const base = file.name.replace(/\.pdf$/i, "");
      const out: SplitResult[] = [];

      if (mode === "range") {
        const indices = parseRange(rangeStr, src.getPageCount());
        if (!indices) {
          setError(
            `Invalid page range. This PDF has ${src.getPageCount()} page${src.getPageCount() === 1 ? "" : "s"}. Example: 1-3, 5`
          );
          setBusy(false);
          return;
        }
        const doc = await PDFDocument.create();
        const pages = await doc.copyPages(src, indices);
        pages.forEach((p) => doc.addPage(p));
        const bytes = await doc.save();
        out.push({
          name: `${base}-pages.pdf`,
          blob: new Blob([bytes as BlobPart], { type: "application/pdf" }),
          size: bytes.length,
        });
      } else {
        for (let i = 0; i < src.getPageCount(); i++) {
          const doc = await PDFDocument.create();
          const [p] = await doc.copyPages(src, [i]);
          doc.addPage(p);
          const bytes = await doc.save();
          out.push({
            name: `${base}-page-${i + 1}.pdf`,
            blob: new Blob([bytes as BlobPart], { type: "application/pdf" }),
            size: bytes.length,
          });
        }
      }
      setResults(out);
    } catch {
      setError(
        "Splitting failed. Encrypted or corrupted PDFs may not be supported."
      );
    }
    setBusy(false);
  }

  return (
    <div className="panel">
      <Dropzone
        accept="application/pdf,.pdf"
        onFiles={handleFiles}
        title="Click or drop a PDF file here"
        hint="Extract specific pages or split every page into its own PDF"
      />

      {file && pageCount > 0 && (
        <div className="file-list">
          <div className="file-row">
            <span className="file-icon">PDF</span>
            <div className="file-info">
              <div className="file-name">{file.name}</div>
              <div className="file-meta">
                {pageCount} page{pageCount === 1 ? "" : "s"} ·{" "}
                {formatBytes(file.size)}
              </div>
            </div>
          </div>
        </div>
      )}

      {file && (
        <div className="options">
          <span className="opt-label">Mode</span>
          <div className="chips">
            <label className={`chip${mode === "range" ? " checked" : ""}`}>
              <input
                type="radio"
                name="mode"
                checked={mode === "range"}
                onChange={() => setMode("range")}
              />
              Extract pages to one PDF
            </label>
            <label className={`chip${mode === "every" ? " checked" : ""}`}>
              <input
                type="radio"
                name="mode"
                checked={mode === "every"}
                onChange={() => setMode("every")}
              />
              Split into single pages
            </label>
          </div>
          {mode === "range" && (
            <input
              className="input"
              type="text"
              placeholder={`e.g. 1-3, 5  (this file: 1-${pageCount})`}
              value={rangeStr}
              onChange={(e) => setRangeStr(e.target.value)}
              style={{ width: 240 }}
            />
          )}
        </div>
      )}

      <div className="options">
        <button
          className="btn btn-primary"
          onClick={split}
          disabled={!file || busy || (mode === "range" && !rangeStr.trim())}
        >
          {busy ? "Splitting…" : "Split PDF"}
        </button>
        {file && (
          <button
            className="btn btn-ghost"
            onClick={() => {
              setFile(null);
              setPageCount(0);
              setResults(null);
              setError(null);
            }}
            disabled={busy}
          >
            Clear
          </button>
        )}
        {results && results.length > 1 && !busy && (
          <button
            className="btn btn-ghost"
            onClick={async () => {
              for (const r of results) {
                downloadBlob(r.blob, r.name);
                await new Promise((res) => setTimeout(res, 350));
              }
            }}
          >
            Download all ({results.length})
          </button>
        )}
      </div>

      {error && <p className="error-text" style={{ marginTop: 12 }}>{error}</p>}

      {results && (
        <div className="file-list">
          {results.map((r) => (
            <div className="file-row" key={r.name}>
              <span className="file-icon">PDF</span>
              <div className="file-info">
                <div className="file-name">{r.name}</div>
                <div className="file-meta">{formatBytes(r.size)}</div>
              </div>
              <span className="badge">Done</span>
              <div className="row-actions">
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => downloadBlob(r.blob, r.name)}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="note">
        “Extract pages” keeps the selected pages in one new PDF. “Split into
        single pages” creates one PDF per page — useful for scans and
        certificates. Everything runs locally in your browser.
      </p>
    </div>
  );
}
