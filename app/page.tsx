import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { BentoGrid } from "@/components/marketing/BentoGrid";
import { ArchitectureFlow } from "@/components/marketing/ArchitectureFlow";
import { ComparisonTable } from "@/components/marketing/ComparisonTable";
import { FAQ } from "@/components/marketing/FAQ";
import { CTASection } from "@/components/marketing/CTASection";
import { Footer } from "@/components/marketing/Footer";

export default function Home() {
  return (
    <>
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
