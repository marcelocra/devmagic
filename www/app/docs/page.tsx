import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("docs");
  return {
    title: `${t("title")} - DevMagic`,
    description: t("subtitle"),
  };
}

export default async function DocsPage() {
  const t = await getTranslations("docs");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground mb-12">{t("subtitle")}</p>

        <div className="grid gap-6 mb-8">
          <Link
            href="/getting-started"
            className="block bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{t("gettingStartedCard")}</h2>
            <p className="text-muted-foreground">{t("gettingStartedCardDesc")}</p>
          </Link>

          <Link
            href="/docs/architecture"
            className="block bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{t("architectureCard")}</h2>
            <p className="text-muted-foreground">{t("architectureCardDesc")}</p>
          </Link>

          <Link
            href="/features"
            className="block bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{t("featuresCard")}</h2>
            <p className="text-muted-foreground">{t("featuresCardDesc")}</p>
          </Link>
        </div>

        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="font-semibold mb-3">{t("externalResources")}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/marcelocra/devmagic/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                README.md
              </a>{" "}
              — {t("readmeDesc")}
            </li>
            <li>
              <a
                href="https://github.com/marcelocra/devmagic/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                CONTRIBUTING.md
              </a>{" "}
              — {t("contributingDesc")}
            </li>
            <li>
              <a
                href="https://github.com/marcelocra/devmagic/blob/main/docs/ARCHITECTURE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                docs/ARCHITECTURE.md
              </a>{" "}
              — {t("architectureDesc")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
