import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostSlugs, calculateReadingTime } from "@/lib/posts";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  Tag,
  GitBranch,
  BookOpen,
} from "lucide-react";

interface PostProps {
  params: Promise<{ slug: string }>;
}

const postsDirectory = path.join(process.cwd(), "content", "posts");

async function getPost(slug: string) {
  if (!/^[A-Za-z0-9_-]+$/.test(slug)) {
    return null;
  }

  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Strip duplicate leading H1 from markdown body if present
    const bodyContent = content.replace(/^#\s+[^\n]+\n+/, "");

    const processedContent = await remark()
      .use(html, { sanitize: true })
      .process(bodyContent);

    const rawTags = Array.isArray(data.tags) ? data.tags : [];
    const tags = rawTags.map((t: unknown) => String(t).trim()).filter(Boolean);

    return {
      metadata: {
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? "",
        excerpt: (data.excerpt as string) ?? "",
        tags,
        readingTimeMinutes: calculateReadingTime(content),
      },
      content: processedContent.toString(),
      slug,
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found | NexaForge" };
  }

  return {
    title: `${post.metadata.title} | NexaForge`,
    description: post.metadata.excerpt || `Read ${post.metadata.title} on NexaForge`,
  };
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const { title, date, excerpt, tags, readingTimeMinutes } = post.metadata;

  return (
    <div className="gitea-surface min-h-screen px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-[#161b22] px-3.5 py-1.5 text-xs font-medium text-cyan-400 hover:border-cyan-500/40 hover:text-cyan-300 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Workflows
          </Link>

          <div className="text-xs text-muted-foreground font-mono flex items-center gap-2">
            <span className="hidden sm:inline">docs / workflows /</span>
            <span className="text-slate-300 font-semibold">{slug}</span>
          </div>
        </div>

        {/* Hero Header Card */}
        <header className="gitea-panel rounded-2xl p-6 sm:p-10 border border-border/80 shadow-2xl relative overflow-hidden space-y-6">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Primary Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
              <BookOpen className="h-3.5 w-3.5" />
              Production Runbook
            </div>
            {tags.length > 0 && (
              <span className="rounded-full bg-[#0d1117] border border-border/70 px-3 py-1 text-[11px] font-mono text-muted-foreground">
                #{tags[0]}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
            {title}
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {excerpt}
            </p>
          )}

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-border/60 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-1.5 text-slate-300">
              <div className="h-5 w-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                N
              </div>
              <span>NexaForge Core Team</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <time dateTime={date}>{date}</time>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-purple-400" />
              <span>{readingTimeMinutes} min read</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>CI Verified</span>
            </div>
          </div>

          {/* Tag cloud */}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <Tag className="h-3 w-3 text-muted-foreground mr-1" />
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href="/posts"
                  className="rounded bg-[#0d1117] border border-border/60 px-2 py-0.5 text-[11px] font-mono text-muted-foreground hover:text-cyan-300 hover:border-cyan-500/40 transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Reader Prose Card */}
        <article className="gitea-panel rounded-2xl p-6 sm:p-12 border border-border/80 shadow-2xl">
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Post Footer & Contribution */}
        <div className="gitea-panel rounded-2xl p-6 border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#0d1117] border border-border flex items-center justify-center text-cyan-400">
              <GitBranch className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Open Source Runbook</div>
              <p className="text-xs text-muted-foreground">
                Notice an issue or want to update this workflow? Contributions are welcome.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/posts"
              className="gitea-button inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Workflows
            </Link>
            <a
              href="https://github.com/ZitouniNidhal/nexaforge"
              target="_blank"
              rel="noopener noreferrer"
              className="gitea-button-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium"
            >
              Contribute on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
