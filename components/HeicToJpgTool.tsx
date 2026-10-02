"use client";

import { useState } from "react";
import Dropzone from "./Dropzone";
import { downloadBlob, formatBytes } from "@/lib/format";

type Format = "image/jpeg" | "image/png";

const FORMATS: { value: Format; label: string; ext: string }[] = [
  { value: "image/jpeg", label: "JPG", ext: "jpg" },
  { value: "image/png", label: "PNG", ext: "png" },
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

function isHeic(file: File) {
  const name = file.name.toLowerCase();
  return (
    name.endsWith(".heic") ||
    name.endsWith(".heif") ||
    /image\/hei[cf]/.test(file.type)
  );
}

export default function HeicToJpgTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<Format>("image/jpeg");
  const [quality, setQuality] = useState(0.92);
  const [results, setResults] = useState<ResultItem[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [loadingLib, setLoadingLib] = useState(false);

  function handleFiles(incoming: File[]) {
    const heics = incoming.filter(isHeic);
    if (heics.length) {
      setFiles((prev) => [...prev, ...heics]);
      setResults(null);
    }
  }

  function reset() {
    results?.forEach((r) => r.thumbUrl && URL.revokeObjectURL(r.thumbUrl));
    setFiles([]);
    setResults(null);
  }

  async function convertAll() {
    if (!files.length || busy) return;
    setBusy(true);
    setLoadingLib(true);
    results?.forEach((r) => r.thumbUrl && URL.revokeObjectURL(r.thumbUrl));

    const target = FORMATS.find((f) => f.value === format)!;
    const items: ResultItem[] = [];

    try {
      // heic2any wraps a ~2MB WebAssembly build of libheif, so load it lazily
      const heic2any = (await import("heic2any")).default;
      setLoadingLib(false);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const out = await heic2any({
            blob: file,
            toType: format,
            quality: format === "image/png" ? undefined : quality,
          });
          const blobs = Array.isArray(out) ? out : [out];
          const base = file.name.replace(/\.[^.]+$/, "");
          for (let j = 0; j < blobs.length; j++) {
            items.push({
              id: i * 100 + j,
              name: `${base}${blobs.length > 1 ? `-${j + 1}` : ""}.${target.ext}`,
              originalSize: file.size,
              blob: blobs[j],
              size: blobs[j].size,
              thumbUrl: URL.createObjectURL(blobs[j]),
            });
          }
        } catch {
          items.push({
            id: i,
            name: file.name,
            originalSize: file.size,
            error:
              "Could not convert — the file may be corrupted or not a real HEIC photo",
          });
        }
      }
    } catch {
      files.forEach((file, i) =>
        items.push({
          id: i,
          name: file.name,
          originalSize: file.size,
          error:
            "Converter failed to load — check your connection and try again",
        })
      );
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
        accept="image/*,.heic,.heif"
        multiple
        onFiles={handleFiles}
        title="Click or drop HEIC photos here"
        hint="HEIC / HEIF photos from iPhone, iPad or Mac — converted locally in your browser"
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
                name="heic-format"
                checked={format === f.value}
                onChange={() => setFormat(f.value)}
              />
              {f.label}
            </label>
          ))}
        </div>
        {format === "image/jpeg" && (
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
            ? loadingLib
              ? "Loading converter…"
              : "Converting…"
            : `Convert ${files.length || ""} photo${files.length === 1 ? "" : "s"}`}
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
        Tip: to take future iPhone photos as JPG instead of HEIC, go to
        Settings → Camera → Formats → “Most Compatible”.
      </p>
    </div>
  );
}
