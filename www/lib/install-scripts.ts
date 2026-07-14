import { readFileSync } from "fs";
import { join } from "path";
import yaml from "js-yaml";

export interface InstallScript {
  id: string;
  name: string;
  description: string;
  scriptPath: string;
  supportsPackageManagers?: boolean;
  steps?: string[];
  requirements?: string[];
}

export interface TemplateFile {
  src: string;
  dest: string;
}

export interface InstallTemplate {
  id: string;
  name: string;
  description: string;
  files: TemplateFile[];
  notes?: string[];
}

interface InstallRegistryData {
  scripts?: InstallScript[];
  templates?: InstallTemplate[];
}

function loadRegistry(): InstallRegistryData {
  const installScriptsPath = join(process.cwd(), "data", "install-scripts.yml");

  try {
    const content = readFileSync(installScriptsPath, "utf-8");
    return (yaml.load(content, { schema: yaml.FAILSAFE_SCHEMA }) as InstallRegistryData) ?? {};
  } catch {
    return {};
  }
}

/**
 * Load bash-script installers from www/data/install-scripts.yml
 */
export function loadInstallScripts(): InstallScript[] {
  return loadRegistry().scripts ?? [];
}

/**
 * Load template file groups from www/data/install-scripts.yml
 */
export function loadInstallTemplates(): InstallTemplate[] {
  return loadRegistry().templates ?? [];
}

/**
 * Get a specific install script by ID
 */
export function getInstallScript(id: string): InstallScript | undefined {
  return loadInstallScripts().find((script) => script.id === id);
}

/**
 * Get a specific install template by ID
 */
export function getInstallTemplate(id: string): InstallTemplate | undefined {
  return loadInstallTemplates().find((template) => template.id === id);
}
