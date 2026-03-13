import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/blog";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.summary,
  };
}

const mdxComponents = {
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  code: ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    const language = className?.replace("language-", "") ?? "bash";
    const code = String(children ?? "").replace(/\n$/, "");
    if (code.includes("\n")) {
      return <CodeBlock code={code} language={language} />;
    }
    return (
      <code className="font-mono text-[var(--color-primary)] bg-[var(--color-surface-2)] px-1.5 py-0.5 rounded-sm text-sm">
        {children}
      </code>
    );
  },
  Callout,
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          All posts
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <time className="text-sm text-[var(--color-muted)]">{formatDate(post.date)}</time>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="neutral" className="text-[10px]">{tag}</Badge>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] leading-tight mb-3">
            {post.title}
          </h1>
          <p className="text-[var(--color-muted)]">By {post.author}</p>
        </header>

        {/* MDX content */}
        <article
          className={[
            "max-w-none",
            "[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[var(--color-text)] [&_h2]:mt-10 [&_h2]:mb-4",
            "[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--color-text)] [&_h3]:mt-8 [&_h3]:mb-3",
            "[&_p]:text-[var(--color-muted)] [&_p]:leading-relaxed [&_p]:mb-4",
            "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5",
            "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-1.5",
            "[&_li]:text-[var(--color-muted)] [&_li]:leading-relaxed",
            "[&_a]:text-[var(--color-primary)] [&_a]:underline-offset-4 [&_a:hover]:underline",
            "[&_strong]:text-[var(--color-text)] [&_strong]:font-semibold",
            "[&_hr]:border-[var(--color-border)] [&_hr]:my-8",
            "[&_pre]:mb-4 [&_pre]:rounded-[var(--radius-lg)]",
          ].join(" ")}
        >
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>
      </div>
    </Layout>
  );
}
