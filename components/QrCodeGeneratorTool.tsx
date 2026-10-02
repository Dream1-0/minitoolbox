"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { downloadBlob, formatBytes } from "@/lib/format";

type Ecc = "L" | "M" | "Q" | "H";

const ECC_OPTIONS: { value: Ecc; label: string }[] = [
  { value: "L", label: "L — small" },
  { value: "M", label: "M — standard" },
  { value: "Q", label: "Q — high" },
  { value: "H", label: "H — max" },
];

export default function QrCodeGeneratorTool() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(512);
  const [ecc, setEcc] = useState<Ecc>("M");
  const [png, setPng] = useState<{ blob: Blob; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const seqRef = useRef(0);

  const generate = useCallback(async () => {
    const seq = ++seqRef.current;
    setPng(null);
    setError(null);

    if (!text.trim()) return;

    setBusy(true);
    try {
      const QRCode = (await import("qrcode")).default;
      const canvas = canvasRef.current;
      if (!canvas) return;
      await QRCode.toCanvas(canvas, text, {
        width: size,
        margin: 2,
        errorCorrectionLevel: ecc,
        color: { dark: "#000000", light: "#ffffff" },
      });
      // only the newest generation may touch state
      if (seq !== seqRef.current) return;
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      if (!blob) throw new Error("encode");
      setPng({ blob, url: URL.createObjectURL(blob) });
    } catch {
      if (seq === seqRef.current) {
        setError(
          "Could not generate the QR code — the text may be too long. Try shortening it."
        );
      }
    } finally {
      if (seq === seqRef.current) setBusy(false);
    }
  }, [text, size, ecc]);

  useEffect(() => {
    const t = setTimeout(generate, 350);
    return () => clearTimeout(t);
  }, [generate]);

  useEffect(() => {
    return () => {
      if (png) URL.revokeObjectURL(png.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function downloadSvg() {
    try {
      const QRCode = (await import("qrcode")).default;
      const svg = await QRCode.toString(text, {
        type: "svg",
        width: size,
        margin: 2,
        errorCorrectionLevel: ecc,
        color: { dark: "#000000", light: "#ffffff" },
      });
      downloadBlob(
        new Blob([svg], { type: "image/svg+xml" }),
        "qr-code.svg"
      );
    } catch {
      setError("Could not export the SVG — try shortening the text.");
    }
  }

  return (
    <div className="panel">
      <label className="opt-label" htmlFor="qr-text">
        Text or URL to encode
      </label>
      <textarea
        id="qr-text"
        className="textarea"
        placeholder={"https://example.com\nor any text, Wi-Fi credentials, phone number…"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
      />

      <div className="options">
        <span className="opt-label">Size</span>
        <input
          type="range"
          min={128}
          max={1024}
          step={64}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          style={{ width: 140 }}
        />
        <span className="file-meta">{size}px</span>

        <span className="opt-label">Error correction</span>
        <div className="chips">
          {ECC_OPTIONS.map((o) => (
            <label
              key={o.value}
              className={`chip${ecc === o.value ? " checked" : ""}`}
            >
              <input
                type="radio"
                name="qr-ecc"
                checked={ecc === o.value}
                onChange={() => setEcc(o.value)}
              />
              {o.label}
            </label>
          ))}
        </div>
      </div>

      {error && <div className="error-text" style={{ marginTop: 12 }}>{error}</div>}

      {text.trim() && (
        <div className="qr-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <canvas ref={canvasRef} aria-label="QR code preview" />
          {busy && <span className="file-meta">Generating…</span>}
        </div>
      )}

      <div className="options">
        <button
          className="btn btn-primary"
          disabled={!png}
          onClick={() =>
            png &&
            downloadBlob(png.blob, "qr-code.png")
          }
        >
          Download PNG{png ? ` (${formatBytes(png.blob.size)})` : ""}
        </button>
        <button
          className="btn btn-ghost"
          disabled={!text.trim() || busy || !!error}
          onClick={downloadSvg}
        >
          Download SVG (vector)
        </button>
        {text && (
          <button
            className="btn btn-ghost"
            onClick={() => {
              setText("");
              setPng(null);
              setError(null);
            }}
          >
            Clear
          </button>
        )}
      </div>

      <p className="note">
        Tip: the QR code is generated entirely in your browser and never
        expires — it is just an image. Higher error correction lets scanners
        read it even if part is covered or damaged.
      </p>
    </div>
  );
}
