"use client";

import { useState } from "react";
import Dropzone from "./Dropzone";
import { downloadBlob, formatBytes } from "@/lib/format";

type Mode = "px" | "percent";
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
  dims: string;
  blob?: Blob;
  size?: number;
  thumbUrl?: string;
  error?: string;
};

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("decode failed"));
    };
    img.src = url;
  });
}

export default function ResizeImageTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<Mode>("px");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepAspect, setKeepAspect] = useState(true);
  const [percent, setPercent] = useState(50);
  const [format, setFormat] = useState<Format>("image/jpeg");
  const [quality, setQuality] = useState(0.92);
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

  async function convertAll() {
    if (!files.length || busy) return;
    setBusy(true);
    results?.forEach((r) => r.thumbUrl && URL.revokeObjectURL(r.thumbUrl));

    const target = FORMATS.find((f) => f.value === format)!;
    const items: ResultItem[] = [];
    const w = parseInt(width, 10);
    const h = parseInt(height, 10);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const img = await loadImage(file);
        let tw: number;
        let th: number;
        if (mode === "percent") {
          tw = Math.max(1, Math.round((img.naturalWidth * percent) / 100));
          th = Math.max(1, Math.round((img.naturalHeight * percent) / 100));
        } else if (keepAspect) {
          if (!w || w < 1) throw new Error("width");
          tw = w;
          th = Math.max(1, Math.round((w * img.naturalHeight) / img.naturalWidth));
        } else {
          if (!w || w < 1 || !h || h < 1) throw new Error("width");
          tw = w;
          th = h;
        }

        const canvas = document.createElement("canvas");
        canvas.width = tw;
        canvas.height = th;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("canvas");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, tw, th);

        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(
            resolve,
            format,
            format === "image/png" ? undefined : quality
          )
        );
        if (!blob) throw new Error("encode");

        const base = file.name.replace(/\.[^.]+$/, "");
        items.push({
          id: i,
          name: `${base}-resized.${target.ext}`,
          originalSize: file.size,
          dims: `${img.naturalWidth}×${img.naturalHeight} → ${tw}×${th}`,
          blob,
          size: blob.size,
          thumbUrl: URL.createObjectURL(blob),
        });
      } catch {
        items.push({
          id: i,
          name: file.name,
          originalSize: file.size,
          dims: "",
          error:
            "Could not resize — enter a valid width (and height) or the file may not be a supported image",
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
        hint="JPG, PNG, WebP or BMP — resized locally in your browser, never uploaded"
      />

      <div className="options">
        <span className="opt-label">Resize by</span>
        <div className="chips">
          <label className={`chip${mode === "px" ? " checked" : ""}`}>
            <input
              type="radio"
              name="resize-mode"
              checked={mode === "px"}
              onChange={() => setMode("px")}
            />
            Size (px)
          </label>
          <label className={`chip${mode === "percent" ? " checked" : ""}`}>
            <input
              type="radio"
              name="resize-mode"
              checked={mode === "percent"}
              onChange={() => setMode("percent")}
            />
            Percentage
          </label>
        </div>
      </div>

      {mode === "px" ? (
        <div className="options">
          <span className="opt-label">Width</span>
          <input
            className="input"
            type="number"
            min={1}
            placeholder="e.g. 800"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            style={{ width: 110 }}
          />
          <span className="opt-label">Height</span>
          <input
            className="input"
            type="number"
            min={1}
            placeholder="auto"
            value={keepAspect ? "" : height}
            disabled={keepAspect}
            onChange={(e) => setHeight(e.target.value)}
            style={{ width: 110 }}
          />
          <label className={`chip${keepAspect ? " checked" : ""}`} style={{ cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={keepAspect}
              onChange={(e) => setKeepAspect(e.target.checked)}
            />
            Keep aspect ratio
          </label>
        </div>
      ) : (
        <div className="options">
          <span className="opt-label">Scale to</span>
          <input
            className="input"
            type="number"
            min={1}
            value={percent}
            onChange={(e) => setPercent(Number(e.target.value))}
            style={{ width: 90 }}
          />
          <span className="opt-label">% of original</span>
        </div>
      )}

      <div className="options">
        <span className="opt-label">Output format</span>
        <div className="chips">
          {FORMATS.map((f) => (
            <label
              key={f.value}
              className={`chip${format === f.value ? " checked" : ""}`}
            >
              <input
                type="radio"
                name="resize-format"
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
            ? "Resizing…"
            : `Resize ${files.length || ""} image${files.length === 1 ? "" : "s"}`}
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
                    {r.dims} · {formatBytes(r.originalSize)} →{" "}
                    {formatBytes(r.size!)}
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
        Tip: resizing smaller than the original always looks clean. For photos
        you want to enlarge, start from the highest-quality source you have.
      </p>
    </div>
  );
}
