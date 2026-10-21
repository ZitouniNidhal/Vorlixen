"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Clock,
  Tag,
  Search,
  X,
  Calendar,
  ArrowRight,
  SlidersHorizontal,
  BookOpen,
} from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface PostListProps {
  initialPosts: PostMeta[];
}

type SortOrder = "newest" | "oldest" | "quickest" | "longest";

export default function PostList({ initialPosts }: PostListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

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

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = initialPosts;

    if (selectedTag) {
      result = result.filter((p) => p.tags.includes(selectedTag));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    const sorted = [...result];
    switch (sortOrder) {
      case "newest":
        sorted.sort((a, b) => (a.date > b.date ? -1 : 1));
        break;
      case "oldest":
        sorted.sort((a, b) => (a.date > b.date ? 1 : -1));
        break;
      case "quickest":
        sorted.sort((a, b) => a.readingTimeMinutes - b.readingTimeMinutes);
        break;
      case "longest":
        sorted.sort((a, b) => b.readingTimeMinutes - a.readingTimeMinutes);
        break;
    }

    return sorted;
  }, [initialPosts, selectedTag, searchQuery, sortOrder]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTag(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar: Search & Sort */}
      <div className="gitea-panel rounded-2xl p-4 sm:p-5 border border-border/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            id="workflow-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search runbooks by title, keyword, or technology (eBPF, Rust, K8s)..."
            className="w-full rounded-xl border border-border/80 bg-[#0d1117] pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-white transition"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-order-select" className="text-xs text-muted-foreground font-mono flex items-center gap-1.5 whitespace-nowrap">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Sort:</span>
          </label>
          <select
            id="sort-order-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="rounded-xl border border-border/80 bg-[#0d1117] px-3 py-2 text-xs font-medium text-foreground focus:border-cyan-500 focus:outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="quickest">Quickest read</option>
            <option value="longest">In-depth first</option>
          </select>
        </div>
      </div>

      {/* Tag Filter Chips Bar */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            id="tag-filter-all"
            onClick={() => setSelectedTag(null)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              selectedTag === null
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10"
                : "bg-[#161b22] text-muted-foreground border border-border/80 hover:text-white hover:border-border"
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
                id={`tag-filter-${tag.toLowerCase()}`}
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  isSelected
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10"
                    : "bg-[#161b22] text-muted-foreground border border-border/80 hover:text-white hover:border-border"
                }`}
              >
                <Tag className="h-3 w-3" />
                {tag}
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}

          {(selectedTag !== null || searchQuery !== "") && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-rose-400 hover:text-rose-300 underline underline-offset-4 ml-auto"
            >
              Reset filters
            </button>
          )}
        </div>
      )}

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono px-1">
        <span>
          Showing {filteredPosts.length} of {initialPosts.length} workflow
          {initialPosts.length === 1 ? "" : "s"}
        </span>
        {selectedTag && <span>Filter: #{selectedTag}</span>}
      </div>

      {/* Posts Cards Grid */}
      <div className="grid gap-5">
        {filteredPosts.length === 0 ? (
          <div className="gitea-panel rounded-2xl p-12 text-center border border-border/80 space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">No workflows found</h3>
              <p className="text-sm text-muted-foreground">
                No articles matched your current query or tag filters.
              </p>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="gitea-button inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium"
            >
              Reset search &amp; filters
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group block rounded-2xl border border-border/80 bg-[#161b22]/70 p-6 sm:p-7 backdrop-blur-md transition-all duration-200 hover:border-cyan-500/50 hover:bg-[#161b22] hover:shadow-xl hover:shadow-cyan-950/20 space-y-4 relative overflow-hidden"
            >
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {post.tags[0] && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[11px] font-mono font-medium text-cyan-300">
                      {post.tags[0]}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                  <Clock className="h-3.5 w-3.5 text-purple-400" />
                  <span>{post.readingTimeMinutes} min read</span>
                </div>
              </div>

              {/* Title & Chevron */}
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {post.title}
                </h2>
                <div className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0d1117] border border-border/80 text-muted-foreground group-hover:border-cyan-500/40 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Excerpt */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {post.excerpt}
              </p>

              {/* Bottom Tags & CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-[#0d1117] border border-border/70 px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 group-hover:text-cyan-300">
                  Read Runbook
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
