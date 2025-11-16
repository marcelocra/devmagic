import type { APIRoute, GetStaticPaths } from 'astro';

export const getStaticPaths: GetStaticPaths = () => {
  // Pre-generate routes for common versions
  // Note: For versioned routes (@v0.1.0, etc.), those need to be added here
  return [
    { params: { ref: undefined as any } }, // Base /setup route
    { params: { ref: 'main' } }, // /setup/main
    { params: { ref: '@v0.1.0' } } // /setup/@v0.1.0
  ];
};

export const GET: APIRoute = async ({ params }) => {
  // Extract the ref parameter (version tag, commit hash, or branch)
  const ref = params.ref?.replace('@', '') || 'main';

  // Construct the GitHub raw URL
  const scriptUrl = `https://raw.githubusercontent.com/marcelocra/devmagic/${ref}/setup/devcontainer-setup.sh`;

  try {
    // Fetch the script from GitHub
    const response = await fetch(scriptUrl);

    if (!response.ok) {
      return new Response(`Script not found for version: ${ref}`, {
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
        'Cache-Control': ref === 'main' ? 'public, max-age=300' : 'public, max-age=31536000',
        'X-DevMagic-Version': ref,
      },
    });
  } catch (error) {
    return new Response(`Error fetching script: ${error instanceof Error ? error.message : 'Unknown error'}`, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
};
