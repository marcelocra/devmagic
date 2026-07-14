import { loadInstallScripts, loadInstallTemplates } from "@/lib/install-scripts";
import Link from "next/link";

export default function InstallScriptsPage() {
  const scripts = loadInstallScripts();
  const templates = loadInstallTemplates();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">🚀 DevMagic Installation Scripts</h1>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-3">Main DevMagic Installation</h2>
          <p className="text-muted-foreground mb-4">Install DevMagic dev container to your project:</p>
          <pre className="bg-background border border-border rounded p-4 overflow-x-auto mb-3">
            <code>curl -fsSL https://devmagic.run/install | bash</code>
          </pre>
          <p className="text-sm text-muted-foreground">
            Or view the script:{" "}
            <a
              href="https://devmagic.run/install"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://devmagic.run/install
            </a>{" "}
            (curl/wget only)
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-4">Additional Installation Scripts</h2>
        <p className="text-muted-foreground mb-6">Quick setup scripts for common development tools. Run with curl:</p>

        <div className="space-y-6">
          {scripts.map((script) => (
            <div key={script.id} className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">{script.name}</h3>
              <p className="text-muted-foreground mb-4">{script.description}</p>

              {script.requirements && script.requirements.length > 0 && (
                <div className="bg-muted/50 border-l-4 border-warning rounded p-4 mb-4">
                  <strong className="block mb-2">Requirements:</strong>
                  <ul className="list-disc list-inside space-y-1">
                    {script.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {script.steps && script.steps.length > 0 && (
                <div className="mb-4">
                  <strong className="block mb-2">What it does:</strong>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    {script.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <strong className="block mb-2">Install with pnpm (default):</strong>
                  <pre className="bg-background border border-border rounded p-3 overflow-x-auto">
                    <code>curl -fsSL https://devmagic.run/install/{script.id} | bash</code>
                  </pre>
                </div>

                {script.supportsPackageManagers && (
                  <div>
                    <strong className="block mb-2">Or with another package manager:</strong>
                    <pre className="bg-background border border-border rounded p-3 overflow-x-auto">
                      <code className="text-sm">
                        {`# npm
curl -fsSL https://devmagic.run/install/${script.id}?pm=npm | bash

# yarn
curl -fsSL https://devmagic.run/install/${script.id}?pm=yarn | bash

# bun
curl -fsSL https://devmagic.run/install/${script.id}?pm=bun | bash`}
                      </code>
                    </pre>
                  </div>
                )}

                <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                  View script:{" "}
                  <a
                    href={`https://devmagic.run/install/${script.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://devmagic.run/install/{script.id}
                  </a>{" "}
                  (curl/wget only)
                </p>
              </div>
            </div>
          ))}

          {scripts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No installation scripts available yet.</p>
            </div>
          )}
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-4">Project Templates</h2>
        <p className="text-muted-foreground mb-6">
          Ready-to-use config files for new projects, downloaded into the current directory. Existing files are never
          overwritten unless you add <code>?force=1</code> to the URL.
        </p>

        <div className="space-y-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">{template.name}</h3>
              <p className="text-muted-foreground mb-4">{template.description}</p>

              <div className="mb-4">
                <strong className="block mb-2">Files it creates:</strong>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {template.files.map((file) => (
                    <li key={file.dest}>
                      <code>{file.dest}</code>
                    </li>
                  ))}
                </ul>
              </div>

              {template.notes && template.notes.length > 0 && (
                <div className="bg-muted/50 border-l-4 border-warning rounded p-4 mb-4">
                  <strong className="block mb-2">Notes:</strong>
                  <ul className="list-disc list-inside space-y-1">
                    {template.notes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <strong className="block mb-2">Install:</strong>
                  <pre className="bg-background border border-border rounded p-3 overflow-x-auto">
                    <code>curl -fsSL https://devmagic.run/install/{template.id} | bash</code>
                  </pre>
                </div>

                <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                  View the generated installer:{" "}
                  <a
                    href={`https://devmagic.run/install/${template.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://devmagic.run/install/{template.id}
                  </a>{" "}
                  (curl/wget only)
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 pt-6 border-t border-border text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            ← Back to DevMagic
          </Link>
        </p>
      </div>
    </div>
  );
}
