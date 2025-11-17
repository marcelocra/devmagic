import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Always serve the latest version from main branch
  const scriptUrl = 'https://raw.githubusercontent.com/marcelocra/devmagic/main/setup/devmagic.sh'

  try {
    // Fetch the script from GitHub
    const response = await fetch(scriptUrl)

    if (!response.ok) {
      return new NextResponse('Installation script not found', {
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
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
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
