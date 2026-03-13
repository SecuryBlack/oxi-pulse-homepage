import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  tags: string[];
}

export interface Post extends PostMeta {
  content: string;
}

function parsePost(filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    date: data.date,
    author: data.author ?? "SecuryBlack",
    summary: data.summary ?? "",
    tags: data.tags ?? [],
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f));
  return files
    .map((f) => parsePost(f))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(({ content: _, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post {
  const file = fs.readdirSync(BLOG_DIR).find((f) => f.startsWith(slug));
  if (!file) throw new Error(`Post not found: ${slug}`);
  return parsePost(file);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}
