import { NextRequest, NextResponse } from 'next/server'

const TOOL_REPO_PATH: Record<string, string> = {
  tmux: 'shell/tmux.conf',
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug: slugArray } = await params
  const slug = slugArray?.[0]
  
  // If no slug, return list of available tools
  if (!slug) {
    const toolList = Object.keys(TOOL_REPO_PATH)
      .map(tool => `- ${tool}: /tool/${tool}`)
      .join('\n')
    
    return new NextResponse(
      `Available tools:\n\n${toolList}\n\nUsage: /tool/{name} or /tool/{name}@{version}`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }
    )
  }

  // Extract tool and version from slug (e.g., "tmux@v0.1.0")
  const [tool, version] = slug.split('@')
  const ref = version || 'main'
  
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
