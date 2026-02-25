"use client";

import { useState } from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { useTranslations } from "next-intl";

type TabType = "consumer" | "standalone" | "maintainer";

export default function GettingStartedPage() {
  const [activeTab, setActiveTab] = useState<TabType>("consumer");
  const t = useTranslations("gettingStarted");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground mb-8">{t("subtitle")}</p>

        {/* Prerequisites */}
        <section className="mb-12 bg-muted/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{t("prerequisites")}</h2>
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
                <strong>{t("containerRuntime")}</strong> {t("install")}{" "}
                <a
                  href="https://podman-desktop.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Podman Desktop
                </a>{" "}
                {t("orDocker")}
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
                <strong>{t("editor")}</strong> {t("install")}{" "}
                <a
                  href="https://code.visualstudio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visual Studio Code
                </a>{" "}
                {t("orAnyDevContainer")}
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
              {t("addToYourProject")}
            </button>
            <button
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === "standalone"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("standalone")}
            >
              {t("standaloneEnvironment")}
            </button>
            <button
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === "maintainer"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("maintainer")}
            >
              {t("contributeToDevMagic")}
            </button>
          </div>

          {/* Consumer Tab - Add to Your Project */}
          {activeTab === "consumer" && (
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-3">{t("consumerTitle")}</h2>
                <p className="text-lg text-muted-foreground">{t("consumerSubtitle")}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">{t("step1")}</h3>
                  <p className="mb-2">{t("step1Desc")}</p>
                  <CodeBlock code="curl -fsSL https://devmagic.run/install | bash" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("step1Tip")} <code>curl -fsSL https://devmagic.run/install</code>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">{t("step2")}</h3>
                  <p className="mb-2">
                    {t("step2Desc")} <code>.devcontainer/</code> {t("step2DescEnd")}
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
                  <h3 className="text-xl font-semibold mb-3">{t("step3")}</h3>
                  <p className="mb-2">{t("step3Desc")}</p>
                  <CodeBlock
                    code={`git add .devcontainer/
git commit -m "feat: add DevMagic development environment"
git push`}
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">{t("step4")}</h3>
                  <p className="mb-2">
                    {t("step4Desc")} <strong>{t("step4DescBold")}</strong> {t("step4DescEnd")}
                  </p>
                  <ul className="space-y-2 text-muted-foreground mt-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      {t("step4Item1")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      {t("step4Item2")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      {t("step4Item3")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      {t("step4Item4")}
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold mb-2">{t("customization")}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t("customizationDesc")} <code>.devcontainer/devcontainer.json</code> {t("customizationDescEnd")}
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t("customizationItem1")}</li>
                    <li>• {t("customizationItem2")}</li>
                    <li>• {t("customizationItem3")}</li>
                    <li>• {t("customizationItem4")}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Standalone Tab */}
          {activeTab === "standalone" && (
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-3">{t("standaloneTitle")}</h2>
                <p className="text-lg text-muted-foreground">{t("standaloneSubtitle")}</p>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {t("standaloneItem1")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {t("standaloneItem2")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {t("standaloneItem3")}
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">{t("standaloneStep1")}</h3>
                  <CodeBlock
                    code={`git clone https://github.com/marcelocra/devmagic.git
cd devmagic`}
                  />
                  <p className="mt-2 text-sm text-muted-foreground">{t("standaloneStep1Tip")}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">{t("standaloneStep2")}</h3>
                  <p className="mb-2">
                    {t("standaloneStep2Desc")} <strong>{t("standaloneStep2DescBold")}</strong>{" "}
                    {t("standaloneStep2DescEnd")}
                  </p>
                  <p className="text-sm text-muted-foreground">{t("standaloneStep2Tip")}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">{t("standaloneStep3")}</h3>
                  <p className="mb-2">{t("standaloneStep3Desc")}</p>
                  <CodeBlock
                    code={`git clone https://github.com/other/repo.git
cd repo
code .`}
                  />
                  <p className="mt-2 text-sm text-muted-foreground">{t("standaloneStep3Tip")}</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold mb-2">{t("importantNote")}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t("importantNoteDesc")} <code>remoteUser</code> {t("importantNoteDescEnd")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Maintainer Tab */}
          {activeTab === "maintainer" && (
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-3">{t("maintainerTitle")}</h2>
                <p className="text-lg text-muted-foreground">
                  {t("maintainerSubtitle")} <code>www/</code> {t("maintainerSubtitleEnd")}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">{t("maintainerStep1")}</h3>
                  <CodeBlock
                    code={`git clone https://github.com/marcelocra/devmagic.git
cd devmagic`}
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">{t("maintainerStep2")}</h3>
                  <p className="mb-2">
                    {t("maintainerStep2Desc")} <code>.devcontainer/devcontainer.json</code>{" "}
                    {t("maintainerStep2DescEnd")} <strong>{t("maintainerStep2DescBold")}</strong>.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">{t("maintainerStep3")}</h3>
                  <p className="mb-2">{t("maintainerStep3Desc")}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">{t("maintainerStep4")}</h3>
                  <p className="mb-2">{t("maintainerStep4Desc")}</p>
                  <CodeBlock
                    code={`cd www
npm install
npm run dev`}
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("maintainerStep4Tip")} <code>http://localhost:4321</code>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <section className="mt-12 bg-primary/5 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{t("nextSteps")}</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/docs" className="text-primary hover:underline font-medium">
                {t("readDocs")}
              </Link>
              <p className="text-sm text-muted-foreground">{t("readDocsDesc")}</p>
            </li>
            <li>
              <Link href="/features" className="text-primary hover:underline font-medium">
                {t("exploreFeatures")}
              </Link>
              <p className="text-sm text-muted-foreground">{t("exploreFeaturesDesc")}</p>
            </li>
            <li>
              <a
                href="https://github.com/marcelocra/devmagic/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                {t("getHelp")}
              </a>
              <p className="text-sm text-muted-foreground">{t("getHelpDesc")}</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
