"use client";

import { useState } from "react";
import Dropzone from "./Dropzone";
import { downloadBlob, formatBytes } from "@/lib/format";

type Rot = 90 | 180 | 270;

const ROTATIONS: { value: Rot; label: string }[] = [
  { value: 90, label: "90° clockwise" },
  { value: 180, label: "180°" },
  { value: 270, label: "90° counter-cw" },
];

function parsePages(spec: string, count: number): number[] | null {
  const s = spec.trim();
  if (!s || /^all$/i.test(s)) return Array.from({ length: count }, (_, i) => i);
  const set = new Set<number>();
  for (const part of s.split(/[,，]/)) {
    const p = part.trim();
    if (!p) continue;
    const m = p.match(/^(\d+)\s*[-–]\s*(\d+)$/);
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      if (!a || !b || a < 1 || b > count || a > b) return null;
      for (let i = a; i <= b; i++) set.add(i - 1);
    } else {
      const n = parseInt(p, 10);
      if (!n || n < 1 || n > count) return null;
      set.add(n - 1);
    }
  }
  return set.size ? [...set].sort((a, b) => a - b) : null;
}

export default function RotatePdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [rotation, setRotation] = useState<Rot>(90);
  const [range, setRange] = useState("all");
  const [busy, setBusy] = useState(false);
  const [loadingLib, setLoadingLib] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  function handleFiles(incoming: File[]) {
    const pdf = incoming.find(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    );
    if (!pdf) return;
    setFile(pdf);
    setPageCount(null);
    setError(null);
    setDone(null);
  }

  function reset() {
    setFile(null);
    setPageCount(null);
    setError(null);
    setDone(null);
    setRange("all");
  }

  async function inspectFile(f: File) {
    setLoadingLib(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await f.arrayBuffer(), {
        ignoreEncryption: true,
      });
      setPageCount(doc.getPageCount());
    } catch {
      setError("Could not read this PDF — it may be corrupted or password-protected.");
    } finally {
      setLoadingLib(false);
    }
  }

  // inspect when a file is chosen
  function onFiles(incoming: File[]) {
    handleFiles(incoming);
    const pdf = incoming.find(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    );
    if (pdf) inspectFile(pdf);
  }

  async function apply() {
    if (!file || busy) return;
    setBusy(true);
    setError(null);
    setDone(null);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer(), {
        ignoreEncryption: true,
      });
      const count = doc.getPageCount();
      const targets = parsePages(range, count);
      if (!targets) {
        setError(`Invalid page range — this PDF has ${count} page${count === 1 ? "" : "s"}. Use e.g. "1-3, 5" or "all".`);
        setBusy(false);
        return;
      }
      for (const idx of targets) {
        const page = doc.getPage(idx);
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + rotation) % 360));
      }
      const bytes = await doc.save();
      const base = file.name.replace(/\.pdf$/i, "");
      const outName = `${base}-rotated.pdf`;
      downloadBlob(new Blob([bytes as BlobPart], { type: "application/pdf" }), outName);
      setDone(`${outName} · ${targets.length} of ${count} pages rotated · ${formatBytes(bytes.length)}`);
    } catch {
      setError("Rotation failed — the PDF may be password-protected or corrupted.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel">
      <Dropzone
        accept="application/pdf,.pdf"
        onFiles={onFiles}
        title="Click or drop a PDF here"
        hint="Rotated locally in your browser — the file is never uploaded"
      />

      {file && (
        <div className="options">
          <span className="file-meta">
            {file.name}
            {loadingLib && " — reading pages…"}
            {pageCount !== null && ` — ${pageCount} page${pageCount === 1 ? "" : "s"}`}
          </span>
        </div>
      )}

      <div className="options">
        <span className="opt-label">Rotate</span>
        <div className="chips">
          {ROTATIONS.map((r) => (
            <label
              key={r.value}
              className={`chip${rotation === r.value ? " checked" : ""}`}
            >
              <input
                type="radio"
                name="pdf-rotation"
                checked={rotation === r.value}
                onChange={() => setRotation(r.value)}
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>

      <div className="options">
        <span className="opt-label">Pages</span>
        <input
          className="input"
          type="text"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          placeholder='all  —  or e.g. "1-3, 5"'
          style={{ width: 220 }}
        />
      </div>

      {error && <div className="error-text" style={{ marginTop: 12 }}>{error}</div>}
      {done && (
        <div className="status-line">
          <span className="badge">Done</span> {done}
        </div>
      )}

      <div className="options">
        <button
          className="btn btn-primary"
          onClick={apply}
          disabled={!file || busy || (loadingLib && !pageCount)}
        >
          {busy ? "Rotating…" : "Rotate & download"}
        </button>
        {file && (
          <button className="btn btn-ghost" onClick={reset} disabled={busy}>
            Clear
          </button>
        )}
      </div>

      <p className="note">
        The rotation is saved permanently into the downloaded PDF — every PDF
        reader will show it the new way up. The original file on your device is
        not modified.
      </p>
    </div>
  );
}
