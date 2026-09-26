"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import Dropzone from "./Dropzone";
import { downloadBlob, formatBytes } from "@/lib/format";

const PRESETS = [20, 50, 100, 200, 500];

type ResultItem = {
  id: number;
  name: string;
  originalSize: number;
  blob?: Blob;
  size?: number;
  thumbUrl?: string;
  error?: string;
  closest?: boolean;
};

function extFor(type: string) {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

function outputName(original: string, ext: string) {
  const base = original.replace(/\.[^.]+$/, "");
  return `${base}-compressed.${ext}`;
}

export default function CompressImageTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [targetKB, setTargetKB] = useState<number>(100);
  const [customKB, setCustomKB] = useState<string>("");
  const [maxDim, setMaxDim] = useState<string>("");
  const [results, setResults] = useState<ResultItem[] | null>(null);
  const [busy, setBusy] = useState(false);

  const effectiveKB =
    customKB.trim() !== "" && Number(customKB) > 0 ? Number(customKB) : targetKB;

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

  async function compressAll() {
    if (!files.length || busy) return;
    setBusy(true);
    results?.forEach((r) => r.thumbUrl && URL.revokeObjectURL(r.thumbUrl));

    const targetBytes = effectiveKB * 1024;
    const dim = maxDim.trim() ? parseInt(maxDim, 10) : undefined;
    const items: ResultItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        // PNG/BMP/GIF 转 JPEG 以获得更好的压缩率
        const outType = /png|bmp|gif/i.test(file.type)
          ? "image/jpeg"
          : file.type.startsWith("image/")
            ? file.type
            : "image/jpeg";

        const mkOpts = (d?: number) => ({
          maxSizeMB: targetBytes / (1024 * 1024),
          useWebWorker: true,
          initialQuality: 0.9,
          fileType: outType,
          ...(d ? { maxWidthOrHeight: d } : {}),
        });

        let out = await imageCompression(file, mkOpts(dim));
        let d = dim;
        let rounds = 0;
        while (out.size > targetBytes && rounds < 5) {
          const bitmap = await createImageBitmap(out);
          const cur = Math.max(bitmap.width, bitmap.height);
          bitmap.close();
          const next = Math.floor(cur * 0.8);
          if (next < 32) break;
          d = next;
          out = await imageCompression(file, mkOpts(d));
          rounds++;
        }

        items.push({
          id: i,
          name: outputName(file.name, extFor(outType)),
          originalSize: file.size,
          blob: out,
          size: out.size,
          thumbUrl: URL.createObjectURL(out),
          closest: out.size > targetBytes,
        });
      } catch {
        items.push({
          id: i,
          name: file.name,
          originalSize: file.size,
          error: "Failed to process this file",
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
        hint="JPG, PNG, WebP, BMP, GIF — files never leave your device"
      />

      <div className="options">
        <span className="opt-label">Target size</span>
        <div className="chips">
          {PRESETS.map((k) => (
            <label
              key={k}
              className={`chip${effectiveKB === k && customKB.trim() === "" ? " checked" : ""}`}
            >
              <input
                type="radio"
                name="target"
                checked={effectiveKB === k && customKB.trim() === ""}
                onChange={() => {
                  setCustomKB("");
                  setTargetKB(k);
                }}
              />
              {k}KB
            </label>
          ))}
        </div>
        <input
          className="input"
          type="number"
          min={5}
          placeholder="Custom KB"
          style={{ width: 120 }}
          value={customKB}
          onChange={(e) => setCustomKB(e.target.value)}
        />
        <input
          className="input"
          type="number"
          min={32}
          placeholder="Max width/height px (optional)"
          style={{ width: 210 }}
          value={maxDim}
          onChange={(e) => setMaxDim(e.target.value)}
        />
      </div>

      <div className="options">
        <button
          className="btn btn-primary"
          onClick={compressAll}
          disabled={!files.length || busy}
        >
          {busy ? "Compressing…" : `Compress ${files.length || ""} image${files.length === 1 ? "" : "s"}`}
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
                    {r.closest && " (closest possible size)"}
                  </div>
                )}
              </div>
              {r.blob && !r.error && (
                <span className="badge">
                  −{Math.max(0, Math.round((1 - r.size! / r.originalSize) * 100))}%
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
        Tip: PNG files are converted to JPG for maximum compression. If a tiny
        image cannot reach your target size, we keep the closest possible
        result.
      </p>
    </div>
  );
}
