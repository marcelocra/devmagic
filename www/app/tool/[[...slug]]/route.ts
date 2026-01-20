import { NextRequest, NextResponse } from 'next/server'

const TOOL_REPO_PATH: Record<string, string> = {
  init: 'setup/install.bash',
  tmux: 'shell/tmux.conf',
  'zsh-theme': 'shell/marcelocra.zsh-theme',
  zsh: 'shell/init.sh',
  curl: 'shell/.curlrc',
  ec: '.editorconfig',
  aider: 'shell/aider.conf.yml',
  gitc: 'git/.gitconfig',
  gita: '.gitattributes',
}

const ALIASES: Record<string, string> = {
  linux: 'init',
  install: 'init',
  tmx: 'tmux',
  'tmux.conf': 'tmux',
  '.tmux.conf': 'tmux',
  zshrc: 'zsh',
  '.zshrc': 'zsh',
  '.curlrc': 'curl',
  'editorconfig': 'ec',
  '.editorconfig': 'ec',
  'aider.conf': 'aider',
  'gitconfig': 'gitc',
  '.gitconfig': 'gitc',
  'gitattributes': 'gita',
  '.gitattributes': 'gita',
}

function getToolList(): string {
  // Group aliases by tool
  const aliasInfo = Object.entries(ALIASES)
    .reduce((acc, [alias, tool]) => {
      acc[tool] = acc[tool] || []
      acc[tool].push(alias)
      return acc
    }, {} as Record<string, string[]>)

  const toolList = Object.keys(TOOL_REPO_PATH)
    .map(tool => {
      const aliases = aliasInfo[tool]
      const aliasList = aliases ? ` (aliases: ${aliases.join(', ')})` : ''
      return `- ${tool}${aliasList}: /tool/${tool}`
    })
    .join('\n')

  return `Available tools:\n\n${toolList}\n\nUsage: /tool/{name} or /tool/{name}@{version}`
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug: slugArray } = await params
  const slug = slugArray?.[0]
  
  if (!slug) {
    return new NextResponse(getToolList(), {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const [toolName, version] = slug.split('@')
  const ref = version || 'main'
  
  // Resolve alias to actual tool name
  const tool = ALIASES[toolName] || toolName
  
  const toolPath = TOOL_REPO_PATH[tool]
  
  if (!toolPath) {
    return new NextResponse(`Unknown tool: '${toolName}'`, {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  const toolUrl = `https://raw.githubusercontent.com/marcelocra/dotfiles/${ref}/${toolPath}`

  try {
    const response = await fetch(toolUrl)

    if (!response.ok) {
      return new NextResponse(`'${toolName}' not found in version '${ref}'`, {
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
