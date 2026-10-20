import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Archives | NexaForge",
  description: "Browse all posts by year.",
};

function extractYear(dateStr: string): string {
  const match = dateStr.match(/\b(20\d{2}|19\d{2})\b/);
  return match ? match[1] : dateStr.split("-")[0] || "Other";
}

export default function ArchivesPage() {
  const posts = getAllPosts();

  // Group posts by year safely
  const years = Array.from(new Set(posts.map((p) => extractYear(p.date)))).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <div className="py-12 space-y-12 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight">Archives</h1>

      <div className="space-y-12">
        {years.map((year) => (
          <div key={year} className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">{year}</h2>
            <ul className="space-y-3">
              {posts
                .filter((p) => extractYear(p.date) === year)
                .map((post) => (
                  <li key={post.slug} className="flex items-center justify-between group">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      {post.title}
                    </Link>
                    <time className="text-sm text-muted-foreground">{post.date}</time>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
