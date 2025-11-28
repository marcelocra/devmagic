import { readFileSync } from "fs";
import { join } from "path";
import yaml from "js-yaml";

export interface ShowcaseProject {
  name: string;
  url: string;
  description?: string;
  author: string;
}

interface ShowcaseData {
  projects: ShowcaseProject[];
}

/**
 * Load showcase projects from www/data/showcase.yml
 */
export function loadShowcaseProjects(): ShowcaseProject[] {
  const showcasePath = join(process.cwd(), "data", "showcase.yml");

  try {
    const content = readFileSync(showcasePath, "utf-8");
    const data = yaml.load(content) as ShowcaseData;
    return data?.projects ?? [];
  } catch {
    return [];
  }
}
