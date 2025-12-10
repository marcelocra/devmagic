import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("architecture");
  return {
    title: `${t("title")} - DevMagic`,
    description: t("description"),
  };
}

export default async function ArchitecturePage() {
  const t = await getTranslations("architecture");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link href="/docs" className="text-primary hover:underline">
            {t("backToDocs")}
          </Link>
        </nav>

        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground mb-12">{t("subtitle")}</p>

        {/* Design Principles */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("designPrinciples")}</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <strong>{t("principleZeroFriction")}</strong> — {t("principleZeroFrictionDesc")}
            </li>
            <li>
              <strong>{t("principleConsistency")}</strong> — {t("principleConsistencyDesc")}
            </li>
            <li>
              <strong>{t("principleModularity")}</strong> — {t("principleModularityDesc")}
            </li>
            <li>
              <strong>{t("principleTransparency")}</strong> — {t("principleTransparencyDesc")}
            </li>
            <li>
              <strong>{t("principlePortability")}</strong> — {t("principlePortabilityDesc")}
            </li>
            <li>
              <strong>{t("principleSeparation")}</strong> — {t("principleSeparationDesc")}
            </li>
          </ul>
        </section>

        {/* Separation of Concerns */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("separationOfConcerns")}</h2>
          <p className="text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: t.raw("separationIntro") }} />

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-primary">{t("containerTitle")}</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• {t("containerSshKeys")}</li>
                <li>• {t("containerAiTools")}</li>
                <li>• {t("containerConfig")}</li>
                <li>• {t("containerBaseEnv")}</li>
              </ul>
            </div>
            <div className="bg-card border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-primary">{t("personalTitle")}</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• {t("personalHomebrew")}</li>
                <li>• {t("personalZsh")}</li>
                <li>• {t("personalVscode")}</li>
                <li>• {t("personalAliases")}</li>
              </ul>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-6">
            <h4 className="font-medium mb-2">{t("whySeparation")}</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li dangerouslySetInnerHTML={{ __html: `✅ ${t.raw("separationYourMachine")}` }} />
              <li dangerouslySetInnerHTML={{ __html: `✅ ${t.raw("separationOthers")}` }} />
              <li dangerouslySetInnerHTML={{ __html: `✅ ${t.raw("separationPortable")}` }} />
              <li dangerouslySetInnerHTML={{ __html: `✅ ${t.raw("separationNoLockIn")}` }} />
            </ul>
          </div>
        </section>

        {/* Installation Flow */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("installationFlow")}</h2>
          <div className="bg-card border border-primary/20 rounded-lg p-6 font-mono text-sm">
            <pre className="whitespace-pre-wrap text-muted-foreground">{t("installationFlowCode")}</pre>
          </div>
        </section>

        {/* Dotfiles Integration */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("dotfilesIntegration")}</h2>
          <p className="text-muted-foreground mb-4">{t("dotfilesIntro")}</p>

          <div className="bg-card border border-primary/20 rounded-lg p-6 mb-4">
            <h4 className="font-medium mb-3">{t("dotfilesConfiguration")}</h4>
            <p
              className="text-sm text-muted-foreground mb-3"
              dangerouslySetInnerHTML={{ __html: t.raw("dotfilesConfigDesc") }}
            />
            <pre className="bg-muted/50 rounded p-3 text-xs mb-3">{t("dotfilesConfigCode")}</pre>
            <p className="text-xs text-muted-foreground mb-3">
              {t.rich("dotfilesHostVars", {
                code: (chunks) => <code className="bg-muted px-1 rounded">{chunks}</code>,
                link: (chunks) => (
                  <a
                    href="https://github.com/devcontainers/spec/issues/565"
                    className="underline hover:text-foreground"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">{t("dotfilesStep1")}</span>
                <p className="mt-1" dangerouslySetInnerHTML={{ __html: t.raw("dotfilesStep1Desc") }} />
              </li>
              <li>
                <span className="font-medium text-foreground">{t("dotfilesStep2")}</span>
                <p className="mt-1">{t("dotfilesStep2Desc")}</p>
              </li>
              <li>
                <span className="font-medium text-foreground">{t("dotfilesStep3")}</span>
                <p className="mt-1" dangerouslySetInnerHTML={{ __html: t.raw("dotfilesStep3Desc") }} />
              </li>
            </ol>
            <p
              className="text-xs text-muted-foreground mt-4"
              dangerouslySetInnerHTML={{ __html: t.raw("dotfilesDisable") }}
            />
          </div>
        </section>

        {/* Technical Decisions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("technicalDecisions")}</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground">{t("decisionHomebrew")}</h4>
              <p className="text-sm">{t("decisionHomebrewDesc")}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">{t("decisionForks")}</h4>
              <p className="text-sm">{t("decisionForksDesc")}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">{t("decisionVscode")}</h4>
              <p className="text-sm">{t("decisionVscodeDesc")}</p>
            </div>
          </div>
        </section>

        {/* GitHub Link */}
        <div className="border-t pt-8">
          <p className="text-muted-foreground text-sm">
            {t.rich("githubLinkText", {
              link: (chunks) => (
                <a
                  href="https://github.com/marcelocra/devmagic/blob/main/docs/ARCHITECTURE.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
