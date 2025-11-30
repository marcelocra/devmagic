import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("features");
  return {
    title: `${t("title")} - DevMagic`,
    description: t("subtitle"),
  };
}

export default async function FeaturesPage() {
  const t = await getTranslations("features");

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="gradient-text">{t("title")}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Core Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("coreFeatures")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("zeroHostInstallation")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("zeroHostInstallationDesc")}</p>
            </div>

            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("crossPlatform")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("crossPlatformDesc")}</p>
            </div>

            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("onDemandServices")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("onDemandServicesDesc")}</p>
            </div>

            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("persistentConfiguration")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("persistentConfigurationDesc")}</p>
            </div>

            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("preConfiguredExtensions")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("preConfiguredExtensionsDesc")}</p>
            </div>

            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("fastSetup")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("fastSetupDesc")}</p>
            </div>
          </div>
        </section>

        {/* Available Services */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-4 text-center">{t("auxiliaryServices")}</h2>
          <p className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto">{t("auxiliaryServicesSubtitle")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t("postgresql")}</h3>
                  <p className="text-sm text-muted-foreground">{t("postgresqlDesc")}</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t("redis")}</h3>
                  <p className="text-sm text-muted-foreground">{t("redisDesc")}</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t("mongodb")}</h3>
                  <p className="text-sm text-muted-foreground">{t("mongodbDesc")}</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t("minio")}</h3>
                  <p className="text-sm text-muted-foreground">{t("minioDesc")}</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t("ollama")}</h3>
                  <p className="text-sm text-muted-foreground">{t("ollamaDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flexibility */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("flexibility")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="gradient-border rounded-2xl overflow-hidden">
              <div className="bg-card p-6 h-full">
                <h3 className="text-xl font-semibold mb-3">{t("multipleUsageModes")}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{t("multipleUsageModesDesc")}</p>
                <Link
                  href="/getting-started"
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  {t("learnAboutUsageModes")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="gradient-border rounded-2xl overflow-hidden">
              <div className="bg-card p-6 h-full">
                <h3 className="text-xl font-semibold mb-3">{t("fullyCustomizable")}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{t("fullyCustomizableDesc")}</p>
                <Link href="/docs" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                  {t("viewDocumentation")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="gradient-border rounded-2xl overflow-hidden">
              <div className="bg-card p-6 h-full">
                <h3 className="text-xl font-semibold mb-3">{t("openSource")}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{t("openSourceDesc")}</p>
                <a
                  href="https://github.com/marcelocra/devmagic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  {t("viewSourceCode")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="gradient-border rounded-2xl overflow-hidden">
              <div className="bg-card p-6 h-full">
                <h3 className="text-xl font-semibold mb-3">{t("versionPinning")}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{t("versionPinningDesc")}</p>
                <Link href="/docs" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                  {t("learnAboutVersioning")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="glass rounded-2xl p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("readyToGetStarted")}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{t("readyToGetStartedDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/getting-started" variant="primary" size="lg">
              {t("getStarted")}
            </Button>
            <Button href="/docs" variant="outline" size="lg">
              {t("readTheDocs")}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
