"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  lang?: string;
  showCopy?: boolean;
  className?: string;
  alternatives?: Array<{ label: string; code: string }>;
  /** Replaces the alternatives buttons in the header row with custom content (e.g. unrelated tabs). */
  headerLeft?: React.ReactNode;
  /** Where the alternatives switcher renders: the header row (default) or a right-aligned row below the code. */
  alternativesPosition?: "header" | "footer";
}

export function CodeBlock({
  code,
  lang = "bash",
  showCopy = true,
  className = "",
  alternatives,
  headerLeft,
  alternativesPosition = "header",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentCode = alternatives ? alternatives[selectedIndex].code : code;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <div className="flex items-center justify-between mb-2">
        {headerLeft
          ? headerLeft
          : alternativesPosition === "header" &&
            alternatives &&
            alternatives.length > 1 && (
              <div className="flex gap-2">
                {alternatives.map((alt, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                      selectedIndex === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {alt.label}
                  </button>
                ))}
              </div>
            )}
        {showCopy && (
          <button
            onClick={handleCopy}
            className="ml-auto p-2 rounded-lg bg-background/80 hover:bg-background border border-border/50 transition-all hover:scale-105"
            aria-label="Copy code"
          >
            {copied ? (
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
            <span className="sr-only">Copy code</span>
          </button>
        )}
      </div>
      <div className="relative overflow-hidden rounded-xl">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-accent/20 rounded-xl" />
        <pre className="relative m-[1px] bg-muted/80 backdrop-blur-sm rounded-xl p-4 overflow-x-auto font-mono text-sm">
          <code className={`language-${lang}`}>{currentCode}</code>
        </pre>
      </div>
      {alternativesPosition === "footer" && alternatives && alternatives.length > 1 && (
        <div className="flex justify-end gap-2 mt-2">
          {alternatives.map((alt, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                selectedIndex === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {alt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
