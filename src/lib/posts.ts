import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

const postsDirectory = path.join(process.cwd(), "content", "posts");

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
      const { data } = matter(fileContents);

      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? "",
        excerpt: (data.excerpt as string) ?? "",
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
