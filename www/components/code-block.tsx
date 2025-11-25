'use client'

import { useState } from 'react'

interface CodeBlockProps {
  code: string
  lang?: string
  showCopy?: boolean
  className?: string
}

export function CodeBlock({ code, lang = 'bash', showCopy = true, className = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className={`relative group ${className}`}>
      {showCopy && (
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 p-2 rounded-lg bg-background/80 hover:bg-background border border-border/50 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-105"
          aria-label="Copy code"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
          <span className="sr-only">Copy code</span>
        </button>
      )}
      <div className="relative overflow-hidden rounded-xl">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-accent/20 rounded-xl" />
        <pre className="relative m-[1px] bg-muted/80 backdrop-blur-sm rounded-xl p-4 overflow-x-auto font-mono text-sm">
          <code className={`language-${lang}`}>{code}</code>
        </pre>
      </div>
    </div>
  )
}
