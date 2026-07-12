import { Button } from "@/components/button";
import { CodeBlock } from "@/components/code-block";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <>
      {/* Hero Section with animated gradient background */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated background elements - optimized with reduced blur for performance */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs with CSS custom properties for animation delays */}
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/30 rounded-full blur-[60px] animate-float" />
          <div className="absolute top-40 right-[15%] w-96 h-96 bg-accent/20 rounded-full blur-[80px] animate-float [animation-delay:2s]" />
          <div className="absolute bottom-20 left-[30%] w-80 h-80 bg-purple-500/20 rounded-full blur-[60px] animate-float [animation-delay:4s]" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8 animate-float">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t("badge")}
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="block">{t("heroTitle1")}</span>
              <span className="block gradient-text">{t("heroTitle2")}</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("heroSubtitle")}
              <span className="block mt-2 text-foreground/80">{t("heroSubtitle2")}</span>
            </p>

            <div className="mb-10">
              <CodeBlock
                code="curl -fsSL https://devmagic.run/install | bash"
                className="max-w-2xl mx-auto"
                alternatives={[
                  { label: t("curlLabel"), code: "curl -fsSL https://devmagic.run/install | bash" },
                  { label: t("wgetLabel"), code: "wget -qO- https://devmagic.run/install | bash" },
                ]}
              />
              <p className="text-sm text-muted-foreground mt-3">
                {t("inspectScript")}{" "}
                <Link href="/install" className="text-primary hover:underline transition-colors">
                  {t("inspectScriptLink")}
                </Link>{" "}
                {t("inspectScriptEnd")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/getting-started" variant="primary" size="lg">
                {t("getStarted")}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button
                href="https://github.com/marcelocra/devmagic"
                variant="outline"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("viewOnGitHub")}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Key Benefits */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("whyDevMagic")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("whyDevMagicSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("zeroFriction")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("zeroFrictionDesc")}</p>
            </div>

            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("trulyPortable")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("trulyPortableDesc")}</p>
            </div>

            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("startMinimal")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("startMinimalDesc")}</p>
            </div>

            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("battleTested")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("battleTestedDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Modes */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("howToUse")}</h2>
            <p className="text-muted-foreground text-lg">{t("howToUseSubtitle")}</p>
          </div>

          <div className="space-y-6">
            <div className="gradient-border rounded-2xl overflow-hidden">
              <div className="bg-card p-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold flex-shrink-0 text-lg">
                    ★
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t("addToProject")}</h3>
                    <p className="text-muted-foreground mb-4">{t("addToProjectDesc")}</p>
                    <code className="inline-block text-sm bg-muted px-3 py-1.5 rounded-lg font-mono">
                      curl -fsSL https://devmagic.run/install | bash
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <details className="group glass rounded-2xl overflow-hidden">
              <summary className="p-6 cursor-pointer hover:bg-muted/50 transition-colors flex items-center justify-between">
                <span className="text-lg font-semibold">{t("otherWays")}</span>
                <svg
                  className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-border p-6 space-y-6 bg-muted/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted text-foreground rounded-xl flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t("standaloneEnv")}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{t("standaloneEnvDesc")}</p>
                    <code className="text-xs bg-muted px-3 py-1.5 rounded-lg font-mono">{t("standaloneEnvCode")}</code>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted text-foreground rounded-xl flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t("contributeToDevMagic")}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{t("contributeToDevMagicDesc")}</p>
                    <code className="text-xs bg-muted px-3 py-1.5 rounded-lg font-mono">
                      {t("contributeToDevMagicCode")}
                    </code>
                  </div>
                </div>
              </div>
            </details>
          </div>

          <div className="text-center mt-10">
            <Button href="/getting-started" variant="primary" size="lg">
              {t("getStarted")}
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("quickStart")}</h2>
              <p className="text-muted-foreground text-lg">{t("quickStartSubtitle")}</p>
            </div>

            <div className="glass rounded-2xl p-8 md:p-10">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {t("prerequisites")}
              </h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span>
                    {t("containerRuntime")}
                    <a
                      href="https://www.docker.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Docker
                    </a>
                    {t("containerRuntimeOr")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span>
                    <a
                      href="https://code.visualstudio.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visual Studio Code
                    </a>
                    {t("editorReq")}
                  </span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                {t("installation")}
              </h3>
              <CodeBlock
                code="curl -fsSL https://devmagic.run/install | bash"
                className="mb-6"
                alternatives={[
                  { label: t("curlLabel"), code: "curl -fsSL https://devmagic.run/install | bash" },
                  { label: t("wgetLabel"), code: "wget -qO- https://devmagic.run/install | bash" },
                ]}
              />

              <p className="text-muted-foreground text-center">{t("installationSuccess")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
