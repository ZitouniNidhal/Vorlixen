import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags: string[];
  readingTimeMinutes: number;
}

const postsDirectory = path.join(process.cwd(), "content", "posts");

/**
 * Calculate estimated reading time based on standard 200 words-per-minute heuristic.
 */
export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Read all markdown posts from the content directory.
 * Returns posts sorted by date (newest first).
 */
export function getAllPosts(): PostMeta[] {
  let fileNames: string[];

  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch {
    return [];
  }

  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const rawTags = Array.isArray(data.tags) ? data.tags : [];
      const tags = rawTags.map((t: unknown) => String(t).trim()).filter(Boolean);

      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? "",
        excerpt: (data.excerpt as string) ?? "",
        tags,
        readingTimeMinutes: calculateReadingTime(content),
      };
    });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Return all available post slugs (for generateStaticParams).
 */
export function getPostSlugs(): string[] {
  try {
    return fs
      .readdirSync(postsDirectory)
      .filter((name) => name.endsWith(".md"))
      .map((name) => name.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}
