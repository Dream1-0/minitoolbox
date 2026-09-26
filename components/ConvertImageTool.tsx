"use client";

import { useState } from "react";
import Dropzone from "./Dropzone";
import { downloadBlob, formatBytes } from "@/lib/format";

type Format = "image/jpeg" | "image/png" | "image/webp";

const FORMATS: { value: Format; label: string; ext: string }[] = [
  { value: "image/jpeg", label: "JPG", ext: "jpg" },
  { value: "image/png", label: "PNG", ext: "png" },
  { value: "image/webp", label: "WebP", ext: "webp" },
];

type ResultItem = {
  id: number;
  name: string;
  originalSize: number;
  blob?: Blob;
  size?: number;
  thumbUrl?: string;
  error?: string;
};

export default function ConvertImageTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<Format>("image/jpeg");
  const [quality, setQuality] = useState(0.9);
  const [results, setResults] = useState<ResultItem[] | null>(null);
  const [busy, setBusy] = useState(false);

  function handleFiles(incoming: File[]) {
    const imgs = incoming.filter((f) => f.type.startsWith("image/"));
    if (imgs.length) {
      setFiles((prev) => [...prev, ...imgs]);
      setResults(null);
    }
  }

  function reset() {
    results?.forEach((r) => r.thumbUrl && URL.revokeObjectURL(r.thumbUrl));
    setFiles([]);
    setResults(null);
  }

  async function convertOne(file: File): Promise<Blob> {
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas unsupported");
    if (format === "image/jpeg") {
      // JPEG does not support transparency, fill with white
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(
        resolve,
        format,
        format === "image/png" ? undefined : quality
      )
    );
    if (!blob) throw new Error("convert failed");
    return blob;
  }

  async function convertAll() {
    if (!files.length || busy) return;
    setBusy(true);
    results?.forEach((r) => r.thumbUrl && URL.revokeObjectURL(r.thumbUrl));

    const target = FORMATS.find((f) => f.value === format)!;
    const items: ResultItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const blob = await convertOne(file);
        const base = file.name.replace(/\.[^.]+$/, "");
        items.push({
          id: i,
          name: `${base}.${target.ext}`,
          originalSize: file.size,
          blob,
          size: blob.size,
          thumbUrl: URL.createObjectURL(blob),
        });
      } catch {
        items.push({
          id: i,
          name: file.name,
          originalSize: file.size,
          error: "Failed to convert this file",
        });
      }
    }
    setResults(items);
    setBusy(false);
  }

  async function downloadAll() {
    if (!results) return;
    for (const r of results) {
      if (r.blob) {
        downloadBlob(r.blob, r.name);
        await new Promise((res) => setTimeout(res, 350));
      }
    }
  }

  return (
    <div className="panel">
      <Dropzone
        accept="image/*"
        multiple
        onFiles={handleFiles}
        title="Click or drop images here"
        hint="PNG, JPG, WebP, BMP, GIF — converted locally in your browser"
      />

      <div className="options">
        <span className="opt-label">Convert to</span>
        <div className="chips">
          {FORMATS.map((f) => (
            <label
              key={f.value}
              className={`chip${format === f.value ? " checked" : ""}`}
            >
              <input
                type="radio"
                name="format"
                checked={format === f.value}
                onChange={() => setFormat(f.value)}
              />
              {f.label}
            </label>
          ))}
        </div>
        {format !== "image/png" && (
          <>
            <span className="opt-label">Quality</span>
            <input
              type="range"
              min={0.5}
              max={1}
              step={0.05}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              style={{ width: 130 }}
            />
            <span className="file-meta">{Math.round(quality * 100)}%</span>
          </>
        )}
      </div>

      <div className="options">
        <button
          className="btn btn-primary"
          onClick={convertAll}
          disabled={!files.length || busy}
        >
          {busy
            ? "Converting…"
            : `Convert ${files.length || ""} image${files.length === 1 ? "" : "s"}`}
        </button>
        {files.length > 0 && (
          <button className="btn btn-ghost" onClick={reset} disabled={busy}>
            Clear
          </button>
        )}
        {results && !busy && (
          <button className="btn btn-ghost" onClick={downloadAll}>
            Download all
          </button>
        )}
      </div>

      {results && (
        <div className="file-list">
          {results.map((r) => (
            <div className="file-row" key={r.id}>
              {r.thumbUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="file-thumb" src={r.thumbUrl} alt="" />
              ) : (
                <span className="file-icon">!</span>
              )}
              <div className="file-info">
                <div className="file-name">{r.name}</div>
                {r.error ? (
                  <div className="error-text">{r.error}</div>
                ) : (
                  <div className="file-meta">
                    {formatBytes(r.originalSize)} → {formatBytes(r.size!)}
                  </div>
                )}
              </div>
              {r.blob && !r.error && r.size! < r.originalSize && (
                <span className="badge">
                  −{Math.round((1 - r.size! / r.originalSize) * 100)}%
                </span>
              )}
              <div className="row-actions">
                {r.blob && !r.error && (
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => downloadBlob(r.blob!, r.name)}
                  >
                    Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="note">
        Tip: converting to WebP usually gives the smallest files with high
        quality. JPG output gets a white background where the source image is
        transparent.
      </p>
    </div>
  );
}
