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
          className="absolute right-2 top-2 p-2 rounded-md bg-muted hover:bg-accent transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
          <span className="sr-only">Copy code</span>
        </button>
      )}
      <pre className="bg-muted rounded-lg p-4 overflow-x-auto font-mono">
        <code className={`language-${lang}`}>{code}</code>
      </pre>
    </div>
  )
}
