#!/usr/bin/env node

/**
 * Script para instanciar o sincronizar una web de agente a partir de este template.
 * Uso: node scripts/export-agent.mjs <directorio_destino> <nombre_preset>
 * Ejemplo: node scripts/export-agent.mjs ../oxi-pulse-homepage oxi-pulse
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const targetDir = process.argv[2];
const preset = process.argv[3] || "titan-vault";

if (!targetDir) {
  console.error("Error: Debes especificar un directorio de destino.");
  console.error("Uso: node scripts/export-agent.mjs <directorio_destino> [preset]");
  process.exit(1);
}

const resolvedTarget = path.resolve(process.cwd(), targetDir);
console.log(`🚀 Exportando plantilla para '${preset}' hacia: ${resolvedTarget}...`);

// Exclusiones al copiar
const IGNORE = [
  "node_modules",
  ".next",
  ".open-next",
  "build",
  "out",
  ".git",
  ".DS_Store",
  ".npmrc",
];

// Si el destino ya existe, limpiamos carpetas de código de la app anterior (para evitar colisiones de rutas legadas)
const DIRS_TO_CLEAN = ["app", "components", "config", "content", "lib", "styles"];
if (fs.existsSync(resolvedTarget)) {
  for (const dir of DIRS_TO_CLEAN) {
    const p = path.join(resolvedTarget, dir);
    if (fs.existsSync(p)) {
      fs.rmSync(p, { recursive: true, force: true });
    }
  }
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORE.includes(entry.name)) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(rootDir, resolvedTarget);

// Preset config mapping
const PRESET_MAP = {
  "oxi-pulse": "oxiPulseConfig",
  "oxipulse": "oxiPulseConfig",
  "ferro-sentry": "ferroSentryConfig",
  "ferrosentry": "ferroSentryConfig",
  "cupra-flow": "cupraFlowConfig",
  "cupraflow": "cupraFlowConfig",
  "cromo-forge": "cromoForgeConfig",
  "cromoforge": "cromoForgeConfig",
  "titan-vault": "titanVaultConfig",
  "titanvault": "titanVaultConfig",
};

const configVar = PRESET_MAP[preset.toLowerCase()] || "titanVaultConfig";

// 1. Actualizar config/agent.config.ts en el destino para que exporte activeAgentConfig con el preset elegido
const agentConfigPath = path.join(resolvedTarget, "config", "agent.config.ts");
if (fs.existsSync(agentConfigPath)) {
  let content = fs.readFileSync(agentConfigPath, "utf-8");
  content = content.replace(
    /export const activeAgentConfig: AgentConfig = [^;]+;/,
    `export const activeAgentConfig: AgentConfig = ${configVar};`
  );
  fs.writeFileSync(agentConfigPath, content);
  console.log(`✨ Configurado activeAgentConfig = ${configVar}`);
}

// 2. Actualizar package.json en el destino
const pkgPath = path.join(resolvedTarget, "package.json");
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.name = `${preset}-homepage`;
  pkg.description = `Official landing page for ${preset} (SecuryBlack)`;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

// 3. Actualizar wrangler.toml en el destino
const wranglerPath = path.join(resolvedTarget, "wrangler.toml");
if (fs.existsSync(wranglerPath)) {
  let wrangler = fs.readFileSync(wranglerPath, "utf-8");
  wrangler = wrangler.replace(/name = "[^"]+"/, `name = "${preset}-homepage"`);
  fs.writeFileSync(wranglerPath, wrangler);
}

// 4. Escribir Favicons e iconos SVG a medida para el agente
const FAVICONS = {
  "oxi-pulse": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="8" fill="#09090b" stroke="#33E1BF" stroke-width="1.5" stroke-opacity="0.4" />
  <path d="M4 16h4.5l3-8 4.8 17 4-12 2.5 6.5 2.5-3.5h5" fill="none" stroke="#33E1BF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="16.3" cy="16" r="1.5" fill="#5EECD2" />
</svg>`,
  "ferro-sentry": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="8" fill="#09090b" stroke="#F43F5E" stroke-width="1.5" stroke-opacity="0.4" />
  <path d="M16 4.5L6 9.2v6.8c0 6.8 4.2 13 10 14.5 5.8-1.5 10-7.7 10-14.5V9.2L16 4.5z" fill="none" stroke="#F43F5E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="16" cy="15.5" r="3.5" fill="none" stroke="#FB7185" stroke-width="2" />
  <path d="M16 9v3M16 19v3M9.5 15.5h3M19.5 15.5h3" stroke="#F43F5E" stroke-width="2" stroke-linecap="round" />
</svg>`,
  "cupra-flow": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="8" fill="#09090b" stroke="#F97316" stroke-width="1.5" stroke-opacity="0.4" />
  <circle cx="9" cy="9" r="3" fill="#FB923C" fill-opacity="0.25" stroke="#F97316" stroke-width="2" />
  <circle cx="23" cy="9" r="3" fill="#FB923C" fill-opacity="0.25" stroke="#F97316" stroke-width="2" />
  <circle cx="16" cy="23" r="3" fill="#FB923C" fill-opacity="0.25" stroke="#F97316" stroke-width="2" />
  <path d="M12 9h8" stroke="#F97316" stroke-width="2.2" stroke-linecap="round" />
  <path d="M10.8 11.5l3.8 9" stroke="#F97316" stroke-width="2.2" stroke-linecap="round" />
  <path d="M21.2 11.5l-3.8 9" stroke="#F97316" stroke-width="2.2" stroke-linecap="round" />
  <circle cx="16" cy="14" r="1.5" fill="#FB923C" />
</svg>`,
  "titan-vault": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="8" fill="#09090b" stroke="#06B6D4" stroke-width="1.5" stroke-opacity="0.4" />
  <rect x="6" y="6" width="20" height="20" rx="3.5" fill="none" stroke="#06B6D4" stroke-width="2" />
  <circle cx="16" cy="16" r="4" fill="none" stroke="#06B6D4" stroke-width="1.8" />
  <path d="M16 12v8M12 16h8" stroke="#06B6D4" stroke-width="1.8" stroke-linecap="round" />
  <circle cx="16" cy="16" r="1.5" fill="#38BDF8" />
  <circle cx="9.5" cy="9.5" r="0.8" fill="#06B6D4" />
  <circle cx="22.5" cy="9.5" r="0.8" fill="#06B6D4" />
  <circle cx="9.5" cy="22.5" r="0.8" fill="#06B6D4" />
  <circle cx="22.5" cy="22.5" r="0.8" fill="#06B6D4" />
</svg>`,
  "cromo-forge": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="8" fill="#09090b" stroke="#6366F1" stroke-width="1.5" stroke-opacity="0.4" />
  <path d="M16 4.5L5 10.5v11l11 6 11-6v-11L16 4.5z" fill="none" stroke="#6366F1" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M16 16.5l11-6M16 16.5v11M16 16.5L5 10.5" fill="none" stroke="#818CF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="16" cy="16.5" r="2" fill="#A5B4FC" />
</svg>`,
};

const normPreset = preset.toLowerCase().replace(/_/g, "-");
const faviconContent = FAVICONS[normPreset] || FAVICONS["titan-vault"];

// Escribir en app/icon.svg
const appIconPath = path.join(resolvedTarget, "app", "icon.svg");
fs.writeFileSync(appIconPath, faviconContent);

// Escribir en public/icon.svg
const pubDir = path.join(resolvedTarget, "public");
if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true });
fs.writeFileSync(path.join(pubDir, "icon.svg"), faviconContent);

// 5. Write agent-specific README.md
const AGENT_NAMES = {
  "oxi-pulse": "OxiPulse",
  "oxipulse": "OxiPulse",
  "ferro-sentry": "FerroSentry",
  "ferrosentry": "FerroSentry",
  "cupra-flow": "CupraFlow",
  "cupraflow": "CupraFlow",
  "titan-vault": "TitanVault",
  "titanvault": "TitanVault",
  "cromo-forge": "CromoForge",
  "cromoforge": "CromoForge",
};
const agentDisplayName = AGENT_NAMES[normPreset] || preset;
const agentReadmeContent = `# ${agentDisplayName} Homepage

Official landing page and website for [${agentDisplayName}](https://github.com/securyblack/${normPreset}).

Part of the **SecuryBlack Agent Ecosystem**. Built with Next.js, React 19, Tailwind CSS, Motion, and OpenNext for Cloudflare Pages.

## 🚀 Development

\`\`\`bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build for Cloudflare Pages
npm run build:cf
\`\`\`

## 🛠️ Configuration

Agent copy, metrics, and terminal simulation settings are configured in \`config/agent.config.ts\`.

## 📄 License

Apache-2.0 License.
`;

fs.writeFileSync(path.join(resolvedTarget, "README.md"), agentReadmeContent);

console.log(`🎨 Iconos y Favicons SVG generados para ${preset}!`);
console.log(`📝 README.md en inglés generado para ${preset}!`);
console.log(`✅ ¡Web de ${preset} sincronizada con éxito en ${resolvedTarget}!`);

