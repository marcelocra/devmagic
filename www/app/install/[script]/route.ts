import { NextRequest, NextResponse } from 'next/server'
import { getInstallScript } from '@/lib/install-scripts'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ script: string }> }
) {
  const { script: scriptId } = await params
  
  // Extract version from URL if present (e.g., /install/prettier@v1.0.0)
  let ref = 'main'
  let actualScriptId = scriptId
  
  const match = scriptId.match(/^(.+)@(.+)$/)
  if (match && match[1] && match[2]) {
    actualScriptId = match[1]
    ref = match[2]
  }

  // Get script metadata
  const scriptMeta = getInstallScript(actualScriptId)
  if (!scriptMeta) {
    return new NextResponse(`Install script not found: ${actualScriptId}`, {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  // Extract package manager from query params
  const packageManager = request.nextUrl.searchParams.get('pm') || 'pnpm'
  
  // Validate package manager
  const validPackageManagers = ['pnpm', 'npm', 'yarn', 'bun']
  if (!validPackageManagers.includes(packageManager)) {
    return new NextResponse(
      `Invalid package manager: ${packageManager}. Supported: ${validPackageManagers.join(', ')}`,
      {
        status: 400,
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    )
  }

  // Construct the GitHub raw URL
  const scriptUrl = `https://raw.githubusercontent.com/marcelocra/devmagic/${ref}/${scriptMeta.scriptPath}`

  try {
    // Fetch the script from GitHub
    const response = await fetch(scriptUrl)

    if (!response.ok) {
      return new NextResponse(
        `Installation script not found for version: ${ref}\nScript: ${scriptMeta.name}`,
        {
          status: 404,
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      )
    }

    let script = await response.text()

    // If the script supports package managers, inject the PACKAGE_MANAGER variable
    if (scriptMeta.supportsPackageManagers && packageManager !== 'pnpm') {
      // Add the package manager as an environment variable at the top of the script
      // Find the first non-shebang, non-comment line
      const lines = script.split('\n')
      let insertIndex = 0
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (line && !line.startsWith('#')) {
          insertIndex = i
          break
        }
        if (i > 0 && !line.startsWith('#')) {
          insertIndex = i
          break
        }
      }
      
      // Insert the environment variable
      lines.splice(insertIndex, 0, `export PACKAGE_MANAGER="${packageManager}"`)
      script = lines.join('\n')
    }

    // Serve the script as plain text
    return new NextResponse(script, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': ref === 'main' ? 'public, max-age=300' : 'public, max-age=31536000',
        'X-DevMagic-Version': ref,
        'X-DevMagic-Script': actualScriptId,
        'X-DevMagic-PackageManager': packageManager,
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
