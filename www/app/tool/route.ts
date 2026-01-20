import { NextRequest, NextResponse } from 'next/server'

const TOOL_REPO_PATH: Record<string, string> = {
  tmux: 'shell/tmux.conf',
}

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Extract tool and optional version from path
  const match = pathname.match(/\/tool\/([^@]+)(?:@(.+))?/)
  
  if (!match || !match[1]) {
    return new NextResponse('Tool name is required', {
      status: 400,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  const tool = match[1]
  const ref = match[2] || 'main'
  
  const toolPath = TOOL_REPO_PATH[tool]
  
  if (!toolPath) {
    return new NextResponse(`Unknown tool: '${tool}'`, {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  const toolUrl = `https://raw.githubusercontent.com/marcelocra/dotfiles/${ref}/${toolPath}`

  try {
    const response = await fetch(toolUrl)

    if (!response.ok) {
      return new NextResponse(`'${tool}' not found in version '${ref}'`, {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      })
    }

    const toolText = await response.text()

    return new NextResponse(toolText, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': ref === 'main' ? 'public, max-age=300' : 'public, max-age=31536000',
        'X-DevMagic-Version': ref,
      },
    })
  } catch (error) {
    return new NextResponse(
      `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      {
        status: 500,
        headers: { 'Content-Type': 'text/plain' },
      }
    )
  }
}
