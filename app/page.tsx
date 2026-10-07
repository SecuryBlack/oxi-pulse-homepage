import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { BentoGrid } from "@/components/marketing/BentoGrid";
import { ArchitectureFlow } from "@/components/marketing/ArchitectureFlow";
import { ComparisonTable } from "@/components/marketing/ComparisonTable";
import { FAQ } from "@/components/marketing/FAQ";
import { CTASection } from "@/components/marketing/CTASection";
import { Footer } from "@/components/marketing/Footer";
import { activeAgentConfig } from "@/config/agent.config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: activeAgentConfig.name,
  description: activeAgentConfig.description,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux, Windows",
  softwareVersion: activeAgentConfig.version.replace(/^v/, ""),
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  url: "https://oxipulse.dev/",
  downloadUrl: "https://github.com/securyblack/oxi-pulse/releases/latest",
  codeRepository: activeAgentConfig.githubUrl,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "SecuryBlack", url: "https://securyblack.com" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BentoGrid />
        <ArchitectureFlow />
        <ComparisonTable />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
