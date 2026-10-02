"use client";

import { useState } from "react";
import { activatePro, deactivatePro, usePro } from "@/lib/pro";

export default function ProActivate() {
  const isPro = usePro();
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [justActivated, setJustActivated] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = key.trim();
    if (!trimmed) return;
    if (activatePro(trimmed)) {
      setError(null);
      setKey("");
      setJustActivated(true);
    } else {
      setError(
        "That license key is not valid. Check the email from your purchase and try again — keys look like XXXX-XXXX-XXXX-XXXX."
      );
    }
  }

  function deactivate() {
    deactivatePro();
    setJustActivated(false);
  }

  if (isPro) {
    return (
      <div className="panel pro-active">
        <p className="pro-active-line">
          <span className="badge">Pro is active</span>
          {justActivated && " Thanks for supporting MiniToolbox!"}
        </p>
        <p className="file-meta">
          Ads are hidden everywhere on this browser. Your license is stored
          locally — no account, nothing tracked.
        </p>
        <div className="options">
          <button className="btn btn-ghost" onClick={deactivate}>
            Deactivate on this browser
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      <form onSubmit={submit}>
        <label className="opt-label" htmlFor="pro-key">
          License key
        </label>
        <input
          id="pro-key"
          className="input pro-key-input"
          type="text"
          placeholder="XXXX-XXXX-XXXX-XXXX"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            setError(null);
          }}
          autoComplete="off"
          spellCheck={false}
        />
        {error && <div className="error-text" style={{ marginTop: 10 }}>{error}</div>}
        <div className="options">
          <button className="btn btn-primary" type="submit" disabled={!key.trim()}>
            Activate Pro
          </button>
        </div>
      </form>
      <p className="note">
        Keys are sent by email after purchase. One key works on all your
        devices — activation is stored in this browser only.
      </p>
    </div>
  );
}
