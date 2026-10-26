import type { Metadata } from "next";
import Link from "next/link";
import WordCounterTool from "@/components/WordCounterTool";

export const metadata: Metadata = {
  title: "Word Counter — Count Words & Characters Free",
  description:
    "Count words, characters, sentences and paragraphs in real time, with reading and speaking time. Free and 100% private — text never leaves your device.",
  keywords: [
    "word counter",
    "character counter",
    "word count tool",
    "count characters online",
    "letter counter",
    "reading time calculator",
  ],
  alternates: { canonical: "/word-counter" },
  openGraph: {
    title: "Word Counter — Count Words & Characters Free",
    description:
      "Count words, characters, sentences and paragraphs in real time, with reading and speaking time. Free and 100% private — text never leaves your device.",
    url: "/word-counter",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Counter — Count Words & Characters Free",
    description:
      "Count words and characters in real time. Free, private, nothing saved.",
  },
};

const faqs = [
  {
    q: "How are words counted?",
    a: "Words are counted by splitting the text on whitespace — spaces, tabs and line breaks. This matches the way word processors like Microsoft Word and Google Docs count words.",
  },
  {
    q: "Is my text saved or sent anywhere?",
    a: "No. The counter runs entirely in your browser and nothing is transmitted, logged or stored. Close the tab and the text is gone.",
  },
  {
    q: "How is reading time calculated?",
    a: "Reading time assumes an average silent reading speed of 200 words per minute; speaking time assumes about 130 words per minute, the pace of a typical presentation or speech.",
  },
  {
    q: "Does it work for languages without spaces, like Chinese or Japanese?",
    a: "Word-based counting is designed for space-separated languages. For CJK text, use the character counts (with and without spaces) instead — those are accurate for any language.",
  },
  {
    q: "Can I check an essay with a 500-word limit?",
    a: "Yes — paste the essay and the word count updates instantly as you edit, so you can trim or expand until you hit the limit. It also works offline once the page has loaded.",
  },
  {
    q: "How are hyphenated words and numbers counted?",
    a: "Counting is based on whitespace, so “state-of-the-art” is one word and “2026” is one word. Numbers are counted as words, which matches how most word processors report a count.",
  },
];

export default function WordCounterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container tool-head">
        <h1>Word Counter</h1>
        <p className="sub">
          Count words, characters, sentences and paragraphs in real time — free,
          instant and 100% private. Nothing is saved or sent.
        </p>
      </div>

      <div className="container">
        <WordCounterTool />
      </div>

      <div className="container prose">
        <h2>What this word counter shows</h2>
        <p>
          As you type, the tool updates live: <strong>words</strong>,{" "}
          <strong>characters</strong> (with and without spaces),{" "}
          <strong>sentences</strong>, <strong>paragraphs</strong>, plus{" "}
          <strong>reading time</strong> and <strong>speaking time</strong>{" "}
          estimates. Everything is calculated locally in your browser.
        </p>

        <h2>Common character and word limits</h2>
        <ul>
          <li>
            <strong>Essays and assignments:</strong> 250, 500 or 1,000 words are
            the classic limits — paste your draft and trim until you fit.
          </li>
          <li>
            <strong>Meta descriptions:</strong> aim for about 155–160
            characters; longer ones get cut off in search results.
          </li>
          <li>
            <strong>Social posts:</strong> X/Twitter allows 280 characters,
            LinkedIn posts up to 3,000, and Instagram captions 2,200.
          </li>
          <li>
            <strong>Speeches:</strong> at a natural speaking pace of ~130 words
            per minute, a 10-minute talk is roughly 1,300 words.
          </li>
        </ul>

        <h2>Who uses a word counter?</h2>
        <p>
          Students checking essay limits, writers keeping daily word goals,
          marketers fitting ad copy into strict character limits, translators
          quoting per-word prices, and speakers timing a script. Because the
          text never leaves your browser, it is safe even for confidential
          drafts.
        </p>

        <h2>How each number is calculated</h2>
        <ul>
          <li>
            <strong>Words:</strong> the text is split on whitespace — spaces,
            tabs and line breaks — and every non-empty piece counts as one
            word.
          </li>
          <li>
            <strong>Characters:</strong> the raw length of the text. The
            without-spaces figure removes spaces and line breaks, which is the
            number most character limits refer to.
          </li>
          <li>
            <strong>Sentences:</strong> counted by splitting on full stops,
            exclamation marks and question marks.
          </li>
          <li>
            <strong>Paragraphs:</strong> blocks separated by a blank line, the
            same convention word processors use.
          </li>
        </ul>

        <h2>Word limits worth remembering</h2>
        <ul>
          <li>
            <strong>Common App essay:</strong> 650 words maximum.
          </li>
          <li>
            <strong>University of California PIQ:</strong> 350 words per
            response.
          </li>
          <li>
            <strong>IELTS Writing:</strong> 150 words for Task 1 and 250 for
            Task 2, as minimums.
          </li>
          <li>
            <strong>Conference abstracts:</strong> commonly 150–250 words, so
            check the call for papers.
          </li>
          <li>
            <strong>Meta descriptions:</strong> about 155–160 characters before
            search results truncate them.
          </li>
        </ul>
        <p>
          Limits are often strict rather than advisory: application systems can
          reject an over-length essay outright, and examiners may ignore
          everything beyond the word limit. Paste the draft here and watch the
          count as you cut.
        </p>

        <h2>Reading time vs speaking time</h2>
        <p>
          Reading time assumes 200 words per minute, a comfortable silent
          reading pace. Speaking time assumes 130 words per minute, which fits a
          steady presentation or a clear voice-over. Real speeches run slower
          once you add pauses, emphasis and audience reactions, so treat the
          speaking figure as a minimum and rehearse with a timer for anything
          important.
        </p>

        <h2>Why local counting matters</h2>
        <p>
          Confidential drafts, unpublished manuscripts and internal documents
          should not be pasted into a random website. Here the counting happens
          in the browser: no text is transmitted, logged or stored, and closing
          the tab removes it. That makes it safe for work that is not ready to
          be shared.
        </p>

        <h2>More free tools</h2>
        <ul>
          <li>
            <Link href="/qr-code-generator">QR Code Generator</Link> — free
            PNG and SVG download
          </li>
          <li>
            <Link href="/resize-image">Image Resizer</Link> — resize by pixels
            or percentage
          </li>
          <li>
            <Link href="/compress-image">Compress image to target size</Link> —
            hit exact KB requirements
          </li>
          <li>
            <Link href="/merge-pdf">Merge PDF</Link> — combine PDFs into one
          </li>
        </ul>

        <h2>Frequently asked questions</h2>
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
