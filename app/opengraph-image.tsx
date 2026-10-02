import { ImageResponse } from "next/og";

export const alt = "MiniToolbox — Free Online Image & PDF Tools, No Uploads";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TOOLS = [
  "Compress Image",
  "Convert Image",
  "HEIC to JPG",
  "Merge PDF",
  "Split PDF",
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #312e81 55%, #6d28d9 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
          padding: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 60,
            }}
          >
            ⚡
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, display: "flex" }}>
            MiniToolbox
          </div>
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 38,
            color: "#c7d2fe",
            display: "flex",
          }}
        >
          Free image &amp; PDF tools — fast, private, no uploads
        </div>

        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
          }}
        >
          {TOOLS.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "12px 26px",
                borderRadius: 999,
                border: "2px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.08)",
                fontSize: 26,
                color: "#e0e7ff",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
