import type { Metadata } from "next";
import { activeAgentConfig } from "@/config/agent.config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${activeAgentConfig.name} — ${activeAgentConfig.tagline}`,
  description: activeAgentConfig.description,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          id="theme-script"
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                const stored = localStorage.getItem('theme');
                const isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --agent-primary: ${activeAgentConfig.theme.primary};
                --agent-primary-dark: ${activeAgentConfig.theme.primaryDark};
                --agent-primary-light: ${activeAgentConfig.theme.primaryLight};
                --agent-glow: ${activeAgentConfig.theme.glow};
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100 flex flex-col justify-between selection:bg-[var(--agent-primary)] selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
