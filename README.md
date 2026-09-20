# SecuryBlack Agent Homepage Template

Plantilla base oficial y sistema de diseño **Catalyst** para todas las páginas web de los agentes de SecuryBlack (`titan-vault-homepage`, `oxi-pulse-homepage`, `ferro-sentry-homepage`, `cupra-flow-homepage`).

---

## 🎯 Por qué existe este repositorio

Así como todos los agentes en Rust comparten el runtime y los sockets a través de [`sb-agent-core`](https://github.com/securyblack/sb-agent-core), todas las páginas web de los agentes comparten esta **Plantilla Base ("Web Core")**.

### Características del Sistema:
1. **Diseño Catalyst de Alta Precisión:** Basado 100% en la interfaz moderna de la **App de SecuryBlack** (`bg-zinc-950`, micro-bordes `border-zinc-800`, tipografía `Inter` con `cv11`, micro-animaciones con `motion`).
2. **Desacoplamiento Total (Motor vs Contenido):** Todo el código visual, layout, responsive y SEO es compartido. Los textos, colores, métricas y comandos se configuran en **un único archivo**: [`config/agent.config.ts`](config/agent.config.ts).
3. **Simulador de Terminal Interactivo:** Showcase en vivo de la consola o TUI del agente en el navegador sin necesidad de grabaciones o capturas estáticas.
4. **Despliegue Nativo a Cloudflare Pages:** Preparado para compilar con `@opennextjs/cloudflare` mediante `npm run build:cf`.

---

## 🚀 Cómo crear una nueva web de agente a partir de esta plantilla

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/securyblack/sb-agent-homepage-template mi-agente-homepage
cd mi-agente-homepage
npm install
```

### Paso 2: Configurar tu agente en `config/agent.config.ts`
Modifica las variables de identidad:
```ts
export const activeAgentConfig: AgentConfig = {
  id: "mi-agente",
  name: "MiAgente",
  tagline: "El mejor agente de observabilidad",
  theme: {
    primary: "#10B981",       // Color primario
    primaryDark: "#059669",
    primaryLight: "#34D399",
    glow: "rgba(16, 185, 129, 0.15)",
    accentTag: "emerald",
  },
  installCommands: [
    { os: "Linux", cmd: "curl -fsSL https://install.securyblack.dev/mi-agente | sudo bash" }
  ],
  stats: [ ... ],
  features: [ ... ],
  faq: [ ... ],
};
```

### Paso 3: Probar en local y desplegar
```bash
# Desarrollo local
npm run dev

# Compilación para Cloudflare Pages
npm run build:cf
```

---

## 🎨 Paleta Oficial de Agentes SecuryBlack

| Agente | Color Primario | Acento | Propósito |
|---|---|---|---|
| **TitanVault** | **Cyan (`#06B6D4`)** | Sky (`#38BDF8`) | Almacenamiento, backups y disaster recovery |
| **OxiPulse** | **Menta (`#33E1BF`)** | Emerald (`#10B981`) | Métricas, vitales de CPU/RAM, heartbeats |
| **FerroSentry** | **Escarlata (`#F43F5E`)** | Rose (`#FB7185`) | Auditoría de seguridad, EDR, hardening |
| **CupraFlow** | **Cobre (`#F97316`)** | Orange (`#FB923C`) | Networking, balanceo y failover VIP |
| **CromoForge** | **Cobalto (`#6366F1`)** | Violet (`#818CF8`) | CI/CD, despliegues de contenedores Docker |

---

## License

Apache-2.0 License.
