import { readFileSync } from "fs";
import { join } from "path";
import yaml from "js-yaml";

export interface InstallScript {
  id: string;
  name: string;
  description: string;
  scriptPath: string;
  supportsPackageManagers?: boolean;
  steps: string[];
  requirements?: string[];
}

interface InstallScriptsData {
  scripts: InstallScript[];
}

/**
 * Load install scripts from www/data/install-scripts.yml
 */
export function loadInstallScripts(): InstallScript[] {
  const installScriptsPath = join(process.cwd(), "data", "install-scripts.yml");

  try {
    const content = readFileSync(installScriptsPath, "utf-8");
    const data = yaml.load(content, { schema: yaml.FAILSAFE_SCHEMA }) as InstallScriptsData;
    return data?.scripts ?? [];
  } catch {
    return [];
  }
}

/**
 * Get a specific install script by ID
 */
export function getInstallScript(id: string): InstallScript | undefined {
  const scripts = loadInstallScripts();
  return scripts.find((script) => script.id === id);
}
