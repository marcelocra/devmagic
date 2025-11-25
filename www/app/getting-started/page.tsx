"use client";

import { useState } from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

type TabType = "consumer" | "standalone" | "maintainer";

export default function GettingStartedPage() {
  const [activeTab, setActiveTab] = useState<TabType>("consumer");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Add DevMagic to your project in seconds, or explore other ways to use it.
        </p>

        {/* Prerequisites */}
        <section className="mb-12 bg-muted/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-primary mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <strong>Container Runtime:</strong> Install{" "}
                <a
                  href="https://podman-desktop.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Podman Desktop
                </a>{" "}
                or Docker
              </div>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-primary mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <strong>Editor:</strong> Install{" "}
                <a
                  href="https://code.visualstudio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visual Studio Code
                </a>{" "}
                (or any Dev Container compatible editor)
              </div>
            </li>
          </ul>
        </section>

        {/* Mode Selection */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-2 mb-8 border-b border-border">
            <button
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === "consumer"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("consumer")}
            >
              Add to Your Project
            </button>
            <button
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === "standalone"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("standalone")}
            >
              Standalone Environment
            </button>
            <button
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === "maintainer"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("maintainer")}
            >
              Contribute to DevMagic
            </button>
          </div>

          {/* Consumer Tab - Add to Your Project */}
          {activeTab === "consumer" && (
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-3">Add DevMagic to Your Project</h2>
                <p className="text-lg text-muted-foreground">
                  One command to provide instant, consistent development environments for all contributors.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 1: Run the Installer</h3>
                  <p className="mb-2">From your project root, run the DevMagic installer:</p>
                  <CodeBlock code="curl -fsSL https://devmagic.run/install | bash" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    💡 Always review scripts before running: <code>curl -fsSL https://devmagic.run/install</code>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 2: Project Structure</h3>
                  <p className="mb-2">
                    The installer creates a <code>.devcontainer/</code> directory with:
                  </p>
                  <CodeBlock
                    code={`your-project/
├── .devcontainer/
│   ├── devcontainer.json
│   └── docker-compose.yml
├── src/
└── ...`}
                    lang="plaintext"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 3: Commit to Your Repository</h3>
                  <p className="mb-2">Add the dev container configuration to version control:</p>
                  <CodeBlock
                    code={`git add .devcontainer/
git commit -m "feat: add DevMagic development environment"
git push`}
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 4: Contributors Get Started Instantly</h3>
                  <p className="mb-2">
                    When contributors clone your project and open it in VS Code, they just select{" "}
                    <strong>&quot;Reopen in Container&quot;</strong> when prompted. Everyone gets the same environment
                    with:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mt-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      Node.js, pnpm, Git, GitHub CLI
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      Docker-in-Docker for containerized apps
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      Zsh with Oh My Zsh
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      AI CLI tools (aider, GitHub Copilot CLI, etc.)
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold mb-2">Customization</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Customize <code>.devcontainer/devcontainer.json</code> for your project&apos;s needs:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Add project-specific VS Code extensions</li>
                    <li>• Configure environment variables</li>
                    <li>• Enable auxiliary services (PostgreSQL, Redis, etc.)</li>
                    <li>• Adjust the base image or features</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Standalone Tab */}
          {activeTab === "standalone" && (
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-3">Standalone Environment</h2>
                <p className="text-lg text-muted-foreground">
                  Use DevMagic directly as a portable development environment. Perfect for:
                </p>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Fresh OS installations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Temporary/throw-away workspaces
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Not wanting to install dev tools on your host
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 1: Clone the Repository</h3>
                  <CodeBlock
                    code={`git clone https://github.com/marcelocra/devmagic.git
cd devmagic`}
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    💡 Don&apos;t have git installed? Download as a ZIP from GitHub - the environment provides Git.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 2: Open in VS Code</h3>
                  <p className="mb-2">
                    Open the folder in VS Code and choose <strong>&quot;Reopen in Container&quot;</strong> when
                    prompted.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You now have a fully featured dev environment without installing anything else on the host system.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 3: Use as Your Dev Terminal</h3>
                  <p className="mb-2">
                    Use this repo as a personal dev terminal/workstation. When you need to work on another project:
                  </p>
                  <CodeBlock
                    code={`git clone https://github.com/other/repo.git
cd repo
code .`}
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Each cloned repo automatically uses the same dev container setup, making DevMagic a portable coding
                    box you can carry between machines.
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold mb-2">Important Note</h4>
                  <p className="text-sm text-muted-foreground">
                    Each image might have a different default user. Check the <code>remoteUser</code> setting in{" "}
                    <code>.devcontainer/devcontainer.json</code> and adjust any paths that depend on the user (like
                    volume mounts).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Maintainer Tab */}
          {activeTab === "maintainer" && (
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-3">Maintainer Mode</h2>
                <p className="text-lg text-muted-foreground">
                  Develop DevMagic itself (including this website in the <code>www/</code> folder) using its own Dev
                  Container. Self-hosting at its finest!
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 1: Clone for Development</h3>
                  <CodeBlock
                    code={`git clone https://github.com/marcelocra/devmagic.git
cd devmagic`}
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 2: Reopen in Container</h3>
                  <p className="mb-2">
                    A wrapper <code>.devcontainer/devcontainer.json</code> file is included at the root level. VS Code
                    will detect it and allow you to <strong>&quot;Reopen in Container&quot;</strong>.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 3: Start Developing</h3>
                  <p className="mb-2">
                    This setup ensures maintainers can work on DevMagic itself (including this website) in a self-hosted
                    Dev Container with all necessary tools pre-configured.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Working on the Website</h3>
                  <p className="mb-2">To develop the website (this site you&apos;re viewing):</p>
                  <CodeBlock
                    code={`cd www
npm install
npm run dev`}
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    The site will be available at <code>http://localhost:4321</code>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <section className="mt-12 bg-primary/5 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/docs" className="text-primary hover:underline font-medium">
                Read the documentation →
              </Link>
              <p className="text-sm text-muted-foreground">
                Learn about auxiliary services, customization, and how it all works
              </p>
            </li>
            <li>
              <Link href="/features" className="text-primary hover:underline font-medium">
                Explore features →
              </Link>
              <p className="text-sm text-muted-foreground">See what makes DevMagic powerful and flexible</p>
            </li>
            <li>
              <a
                href="https://github.com/marcelocra/devmagic/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Get help or contribute →
              </a>
              <p className="text-sm text-muted-foreground">
                Join the community, report issues, or contribute improvements
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
