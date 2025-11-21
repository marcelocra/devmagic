import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Extract version from URL path if present (e.g., /setup@v0.1.0)
  const pathname = request.nextUrl.pathname
  let ref = 'main'

  // Check if the path contains @version syntax
  const match = pathname.match(/\/setup@(.+)/)
  if (match && match[1]) {
    ref = match[1]
  }

  // Construct the GitHub raw URL for container setup script
  const scriptUrl = `https://raw.githubusercontent.com/marcelocra/devmagic/${ref}/setup/container-setup.sh`

  try {
    // Fetch the script from GitHub
    const response = await fetch(scriptUrl)

    if (!response.ok) {
      return new NextResponse(`Setup script not found for version: ${ref}`, {
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
      `Error fetching setup script: ${error instanceof Error ? error.message : 'Unknown error'}`,
      {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    )
  }
}
