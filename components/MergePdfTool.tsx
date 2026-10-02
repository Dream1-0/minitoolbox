"use client";

import { useState } from "react";
import Dropzone from "./Dropzone";
import { downloadBlob, formatBytes } from "@/lib/format";

type Item = { id: number; file: File };

export default function MergePdfTool() {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(
    null
  );

  function handleFiles(incoming: File[]) {
    const pdfs = incoming.filter(
      (f) => f.type === "application/pdf" || /\.pdf$/i.test(f.name)
    );
    if (pdfs.length) {
      setItems((prev) => [
        ...prev,
        ...pdfs.map((file) => ({ id: Date.now() + Math.random(), file })),
      ]);
      setResult(null);
      setError(null);
    }
  }

  function move(index: number, dir: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function remove(id: number) {
    setItems((prev) => prev.filter((it) => it.id !== id));
    setResult(null);
  }

  async function merge() {
    if (!items.length || busy) return;
    setBusy(true);
    setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (const it of items) {
        const src = await PDFDocument.load(await it.file.arrayBuffer(), {
          ignoreEncryption: true,
        });
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      const bytes = await out.save();
      setResult({
        blob: new Blob([bytes as BlobPart], { type: "application/pdf" }),
        name: "merged.pdf",
      });
    } catch {
      setError(
        "Could not read one of the files. Encrypted or corrupted PDFs may not be supported."
      );
    }
    setBusy(false);
  }

  return (
    <div className="panel">
      <Dropzone
        accept="application/pdf,.pdf"
        multiple
        onFiles={handleFiles}
        title="Click or drop PDF files here"
        hint="Add two or more PDFs — they will be merged in the order listed below"
      />

      {items.length > 0 && (
        <div className="file-list">
          {items.map((it, i) => (
            <div className="file-row" key={it.id}>
              <span className="file-icon">PDF</span>
              <div className="file-info">
                <div className="file-name">{it.file.name}</div>
                <div className="file-meta">
                  {formatBytes(it.file.size)} · position {i + 1}
                </div>
              </div>
              <div className="row-actions">
                <button
                  className="order-btn"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  className="order-btn"
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  className="order-btn"
                  onClick={() => remove(it.id)}
                  aria-label="Remove"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="options">
        <button
          className="btn btn-primary"
          onClick={merge}
          disabled={items.length < 2 || busy}
        >
          {busy
            ? "Merging…"
            : `Merge ${items.length >= 2 ? items.length : ""} PDF${items.length === 1 ? "" : "s"}`}
        </button>
        {items.length > 0 && (
          <button
            className="btn btn-ghost"
            onClick={() => {
              setItems([]);
              setResult(null);
              setError(null);
            }}
            disabled={busy}
          >
            Clear
          </button>
        )}
      </div>

      {error && <p className="error-text" style={{ marginTop: 12 }}>{error}</p>}

      {result && (
        <div className="file-list">
          <div className="file-row">
            <span className="file-icon">PDF</span>
            <div className="file-info">
              <div className="file-name">{result.name}</div>
              <div className="file-meta">{formatBytes(result.blob.size)} · ready</div>
            </div>
            <span className="badge">Done</span>
            <div className="row-actions">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => downloadBlob(result.blob, result.name)}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="note">
        Use the ↑ ↓ buttons to reorder files before merging. Pages from each
        PDF are appended in sequence — files never leave your device.
      </p>
    </div>
  );
}
