import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  // Always serve the latest version from main branch
  const scriptUrl = 'https://raw.githubusercontent.com/marcelocra/devmagic/main/setup/devmagic.sh';

  try {
    // Fetch the script from GitHub
    const response = await fetch(scriptUrl);

    if (!response.ok) {
      return new Response('Installation script not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    const script = await response.text();

    // Serve the script as plain text
    return new Response(script, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    return new Response(`Error fetching installation script: ${error instanceof Error ? error.message : 'Unknown error'}`, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
};
