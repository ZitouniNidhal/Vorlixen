"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, Tag } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface PostListProps {
  initialPosts: PostMeta[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags across posts
  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const post of initialPosts) {
      for (const t of post.tags) {
        set.add(t);
      }
    }
    return Array.from(set).sort();
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return initialPosts;
    return initialPosts.filter((p) => p.tags.includes(selectedTag));
  }, [initialPosts, selectedTag]);

  return (
    <div className="space-y-8">
      {/* Tag Filter Chips */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-4">
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              selectedTag === null
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-[#161b22] text-muted-foreground border border-border hover:text-white"
            }`}
          >
            All Workflows ({initialPosts.length})
          </button>
          {allTags.map((tag) => {
            const count = initialPosts.filter((p) => p.tags.includes(tag)).length;
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition ${
                  isSelected
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "bg-[#161b22] text-muted-foreground border border-border hover:text-white"
                }`}
              >
                <Tag className="h-3 w-3" />
                {tag}
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid gap-8">
        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No workflows found matching the selected tag.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group block rounded-2xl border border-border/80 bg-[#161b22]/50 p-6 transition hover:border-border hover:bg-[#161b22] space-y-3"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                  <time>{post.date}</time>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTimeMinutes} min read
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-[#0d1117] border border-border px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
