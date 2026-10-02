"use client";

import { useMemo, useState } from "react";

function formatTime(words: number, wpm: number): string {
  if (!words) return "—";
  const seconds = (words / wpm) * 60;
  if (seconds < 60) return `${Math.max(1, Math.round(seconds))} sec`;
  return `${Math.ceil(seconds / 60)} min`;
}

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed
      ? trimmed.split(/[.!?]+/).filter((s) => s.trim()).length
      : 0;
    const paragraphs = trimmed
      ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length
      : 0;
    return { words, characters, charactersNoSpaces, sentences, paragraphs };
  }, [text]);

  return (
    <div className="panel">
      <label className="opt-label" htmlFor="wc-text">
        Type or paste your text
      </label>
      <textarea
        id="wc-text"
        className="textarea"
        rows={10}
        placeholder="Start typing or paste text here — counts update as you write…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-num">{stats.words}</span>
          <span className="stat-label">Words</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{stats.characters}</span>
          <span className="stat-label">Characters</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{stats.charactersNoSpaces}</span>
          <span className="stat-label">Chars (no spaces)</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{stats.sentences}</span>
          <span className="stat-label">Sentences</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{stats.paragraphs}</span>
          <span className="stat-label">Paragraphs</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{formatTime(stats.words, 200)}</span>
          <span className="stat-label">Reading time</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{formatTime(stats.words, 130)}</span>
          <span className="stat-label">Speaking time</span>
        </div>
      </div>

      {text && (
        <div className="options">
          <button className="btn btn-ghost" onClick={() => setText("")}>
            Clear text
          </button>
        </div>
      )}

      <p className="note">
        Everything runs locally in your browser — nothing you type is sent
        anywhere or saved. Close the tab and it is gone.
      </p>
    </div>
  );
}
