import { NextRequest, NextResponse } from "next/server";

// Query param validation. These values are injected into a bash script that
// users pipe straight into `bash`, so the allowed character sets are strict
// on purpose — never widen them to include quotes, spaces, `$`, backticks or
// any other shell metacharacters.
const VALID_NAME = /^[A-Za-z0-9._-]{1,64}$/;
const VALID_USER = /^[a-z_][a-z0-9_-]{0,31}$/;

export async function GET(request: NextRequest) {
  // Extract version from URL path if present (e.g., /install@v0.1.0)
  const pathname = request.nextUrl.pathname;
  let ref = "main";

  // Check if the path contains @version syntax
  const match = pathname.match(/\/install@(.+)/);
  if (match && match[1]) {
    ref = match[1];
  }

  // Optional overrides for the generated files (see setup/devmagic.sh):
  //   ?name=<project-name>  → DEVMAGIC_PROJECT_NAME
  //   ?user=<container-user> → DEVMAGIC_USER
  const name = request.nextUrl.searchParams.get("name");
  const user = request.nextUrl.searchParams.get("user");

  if (name && !VALID_NAME.test(name)) {
    return new NextResponse(
      `Invalid project name: only letters, digits, dots, dashes and underscores are allowed (max 64 chars).`,
      { status: 400, headers: { "Content-Type": "text/plain" } },
    );
  }
  if (user && !VALID_USER.test(user)) {
    return new NextResponse(
      `Invalid container user: must start with a lowercase letter or underscore, followed by lowercase letters, digits, dashes or underscores (max 32 chars).`,
      { status: 400, headers: { "Content-Type": "text/plain" } },
    );
  }

  // Construct the GitHub raw URL
  const scriptUrl = `https://raw.githubusercontent.com/marcelocra/devmagic/${ref}/setup/devmagic.sh`;

  try {
    // Fetch the script from GitHub
    const response = await fetch(scriptUrl);

    if (!response.ok) {
      return new NextResponse(`Installation script not found for version: ${ref}`, {
        status: 404,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    let script = await response.text();

    // Inject the overrides as env vars right after the shebang; the script
    // reads DEVMAGIC_PROJECT_NAME / DEVMAGIC_USER as defaults.
    if (name || user) {
      const exportsBlock: string[] = [];
      if (name) exportsBlock.push(`export DEVMAGIC_PROJECT_NAME="${name}"`);
      if (user) exportsBlock.push(`export DEVMAGIC_USER="${user}"`);
      const lines = script.split("\n");
      const insertAt = lines[0]?.startsWith("#!") ? 1 : 0;
      lines.splice(insertAt, 0, ...exportsBlock);
      script = lines.join("\n");
    }

    // Serve the script as plain text
    return new NextResponse(script, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        // Personalized responses shouldn't be cached broadly.
        "Cache-Control":
          name || user ? "no-store" : ref === "main" ? "public, max-age=300" : "public, max-age=31536000",
        "X-DevMagic-Version": ref,
        ...(name ? { "X-DevMagic-Name": name } : {}),
        ...(user ? { "X-DevMagic-User": user } : {}),
      },
    });
  } catch (error) {
    return new NextResponse(
      `Error fetching installation script: ${error instanceof Error ? error.message : "Unknown error"}`,
      {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      },
    );
  }
}
