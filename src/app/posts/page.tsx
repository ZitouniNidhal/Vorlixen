import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";
import { BookOpen, Layers, Clock, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Workflows & Engineering Notes | NexaForge",
  description: "A curated collection of production engineering workflows, eBPF observability runbooks, and distributed systems architecture notes.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  // Aggregate stats
  const totalPosts = posts.length;
  const uniqueTags = new Set(posts.flatMap((p) => p.tags)).size;
  const avgReadTime = totalPosts > 0
    ? Math.round(posts.reduce((acc, p) => acc + p.readingTimeMinutes, 0) / totalPosts)
    : 1;

  return (
    <div className="gitea-surface min-h-screen px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Hero Section */}
        <section className="gitea-panel rounded-2xl p-6 sm:p-10 border border-border/80 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              NexaForge Knowledge Hub
            </div>

            <div className="space-y-3 max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Production Workflows &amp; Architecture Runbooks
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Curated technical postmortems, zero-overhead eBPF observability guides, and
                systems engineering patterns verified for mission-critical deployments.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-2">
              <div className="rounded-xl border border-border/60 bg-[#0d1117]/70 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <BookOpen className="h-4 w-4 text-cyan-400" />
                  <span>Runbooks</span>
                </div>
                <div className="mt-2 text-2xl font-bold text-white">{totalPosts}</div>
                <p className="text-[11px] text-muted-foreground">Published guides</p>
              </div>

              <div className="rounded-xl border border-border/60 bg-[#0d1117]/70 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <Layers className="h-4 w-4 text-emerald-400" />
                  <span>Topics</span>
                </div>
                <div className="mt-2 text-2xl font-bold text-white">{uniqueTags}</div>
                <p className="text-[11px] text-muted-foreground">Domain categories</p>
              </div>

              <div className="rounded-xl border border-border/60 bg-[#0d1117]/70 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span>Avg. Read</span>
                </div>
                <div className="mt-2 text-2xl font-bold text-white">{avgReadTime} min</div>
                <p className="text-[11px] text-muted-foreground">Focused &amp; actionable</p>
              </div>

              <div className="rounded-xl border border-border/60 bg-[#0d1117]/70 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <ShieldCheck className="h-4 w-4 text-blue-400" />
                  <span>Verification</span>
                </div>
                <div className="mt-2 text-2xl font-bold text-emerald-400">CI Tested</div>
                <p className="text-[11px] text-muted-foreground">Automated checks</p>
              </div>
            </div>
          </div>
        </section>

        {/* Post Explorer Component */}
        <PostList initialPosts={posts} />
      </div>
    </div>
  );
}
