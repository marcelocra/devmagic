export { renderers } from '../../renderers.mjs';

const getStaticPaths = () => {
  return [
    { params: { ref: void 0 } },
    // Base /setup route
    { params: { ref: "main" } },
    // /setup/main
    { params: { ref: "@v0.1.0" } }
    // /setup/@v0.1.0
  ];
};
const GET = async ({ params }) => {
  const ref = params.ref?.replace("@", "") || "main";
  const scriptUrl = `https://raw.githubusercontent.com/marcelocra/devmagic/${ref}/setup/devcontainer-setup.sh`;
  try {
    const response = await fetch(scriptUrl);
    if (!response.ok) {
      return new Response(`Script not found for version: ${ref}`, {
        status: 404,
        headers: {
          "Content-Type": "text/plain"
        }
      });
    }
    const script = await response.text();
    return new Response(script, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": ref === "main" ? "public, max-age=300" : "public, max-age=31536000",
        "X-DevMagic-Version": ref
      }
    });
  } catch (error) {
    return new Response(`Error fetching script: ${error instanceof Error ? error.message : "Unknown error"}`, {
      status: 500,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  getStaticPaths
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
