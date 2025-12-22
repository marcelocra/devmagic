import { NextRequest, NextResponse } from 'next/server'
import { loadInstallScripts } from '@/lib/install-scripts'

export async function GET(request: NextRequest) {
  // Check if this is being accessed from a browser (HTML request)
  const acceptHeader = request.headers.get('accept') || ''
  const userAgent = request.headers.get('user-agent') || ''
  
  // If the request accepts HTML and is from a browser, show the listing
  const isBrowser = acceptHeader.includes('text/html') && !userAgent.includes('curl') && !userAgent.includes('wget')
  
  if (isBrowser) {
    // Redirect to a listing page or serve HTML with the list of scripts
    const scripts = loadInstallScripts()
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevMagic Installation Scripts</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 1.6;
      background: #0a0a0a;
      color: #e0e0e0;
    }
    h1 {
      color: #9333ea;
      border-bottom: 2px solid #9333ea;
      padding-bottom: 0.5rem;
    }
    h2 {
      color: #a855f7;
      margin-top: 2rem;
    }
    .main-install {
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    .script {
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .script h3 {
      margin-top: 0;
      color: #c084fc;
    }
    code {
      background: #0a0a0a;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
      color: #60a5fa;
    }
    pre {
      background: #0a0a0a;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
      border: 1px solid #444;
    }
    pre code {
      background: none;
      padding: 0;
      color: #a5f3fc;
    }
    ul, ol {
      color: #d1d5db;
    }
    a {
      color: #60a5fa;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .requirements {
      background: #0f172a;
      padding: 1rem;
      border-radius: 6px;
      border-left: 3px solid #f59e0b;
      margin: 1rem 0;
    }
  </style>
</head>
<body>
  <h1>🚀 DevMagic Installation Scripts</h1>
  
  <div class="main-install">
    <h2>Main DevMagic Installation</h2>
    <p>Install DevMagic dev container to your project:</p>
    <pre><code>curl -fsSL https://devmagic.run/install | bash</code></pre>
    <p>Or view the script: <a href="https://devmagic.run/install" target="_blank">https://devmagic.run/install</a> (curl/wget only)</p>
  </div>

  <h2>Additional Installation Scripts</h2>
  <p>Quick setup scripts for common development tools. Run with curl:</p>
  
  ${scripts
    .map(
      (script) => `
  <div class="script">
    <h3>${script.name}</h3>
    <p>${script.description}</p>
    
    ${
      script.requirements && script.requirements.length > 0
        ? `
    <div class="requirements">
      <strong>Requirements:</strong>
      <ul>
        ${script.requirements.map((req) => `<li>${req}</li>`).join('')}
      </ul>
    </div>
    `
        : ''
    }
    
    ${
      script.steps && script.steps.length > 0
        ? `
    <strong>What it does:</strong>
    <ol>
      ${script.steps.map((step) => `<li>${step}</li>`).join('')}
    </ol>
    `
        : ''
    }
    
    <strong>Install with pnpm (default):</strong>
    <pre><code>curl -fsSL https://devmagic.run/install/${script.id} | bash</code></pre>
    
    ${
      script.supportsPackageManagers
        ? `
    <strong>Or with another package manager:</strong>
    <pre><code># npm
curl -fsSL https://devmagic.run/install/${script.id}?pm=npm | bash

# yarn
curl -fsSL https://devmagic.run/install/${script.id}?pm=yarn | bash

# bun
curl -fsSL https://devmagic.run/install/${script.id}?pm=bun | bash</code></pre>
    `
        : ''
    }
    
    <p>View script: <a href="https://devmagic.run/install/${script.id}" target="_blank">https://devmagic.run/install/${script.id}</a> (curl/wget only)</p>
  </div>
  `
    )
    .join('')}
  
  <p style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #333; color: #9ca3af;">
    <a href="/">← Back to DevMagic</a>
  </p>
</body>
</html>`
    
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    })
  }

  // Otherwise, serve the main installation script
  // Extract version from URL path if present (e.g., /install@v0.1.0)
  const pathname = request.nextUrl.pathname
  let ref = 'main'

  // Check if the path contains @version syntax
  const match = pathname.match(/\/install@(.+)/)
  if (match && match[1]) {
    ref = match[1]
  }

  // Construct the GitHub raw URL
  const scriptUrl = `https://raw.githubusercontent.com/marcelocra/devmagic/${ref}/setup/devmagic.sh`

  try {
    // Fetch the script from GitHub
    const response = await fetch(scriptUrl)

    if (!response.ok) {
      return new NextResponse(`Installation script not found for version: ${ref}`, {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    }

    const script = await response.text()

    // Serve the script as plain text
    return new NextResponse(script, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': ref === 'main' ? 'public, max-age=300' : 'public, max-age=31536000',
        'X-DevMagic-Version': ref,
      },
    })
  } catch (error) {
    return new NextResponse(
      `Error fetching installation script: ${error instanceof Error ? error.message : 'Unknown error'}`,
      {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    )
  }
}
