import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { guides, getGuide, renderMarkdown } from "@/lib/guides";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: `Send host metrics to ${guide.name} with OxiPulse`,
    description: `Ship Linux and Windows server metrics (CPU, memory, disk, network) to ${guide.name} over OpenTelemetry. ${guide.summary} Tested end to end in CI.`,
    alternates: { canonical: `/guides/${slug}/` },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const md = await getGuide(slug);
  if (!md) notFound();
  const { title, body } = renderMarkdown(md);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <Link href="/guides/" className="inline-flex items-center gap-x-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6">
          <ArrowLeft className="size-3.5" />
          <span>All backend guides</span>
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">{title}</h1>
        <article className="space-y-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{body}</article>
        <a
          href={`https://github.com/SecuryBlack/oxi-pulse/blob/main/docs/backends/${slug}.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-x-2 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
        >
          <span>Edit this guide on GitHub</span>
          <ExternalLink className="size-3.5" />
        </a>
      </main>
      <Footer />
    </>
  );
}
