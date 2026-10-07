import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="2" />
    <circle cx="4" cy="5" r="2" />
  </svg>
);

interface Post {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  featured?: boolean;
}

const POSTS: Post[] = [
  {
    title: "Building Scalable ML Pipelines with MLOps",
    date: "12 May, 2025",
    excerpt: "Exploring the intersection of AI research and production engineering to build robust, scalable machine learning systems.",
    slug: "scalable-ml-pipelines-mlops",
    featured: true,
  },
  {
    title: "AI Research to Production: The Gap",
    date: "21 Jul, 2024",
    excerpt: "Analyzing the challenges of deploying state-of-the-art AI research models into real-world production environments.",
    slug: "ai-research-to-production",
    featured: true,
  },
  {
    title: "Optimizing Model Inference for Edge Devices",
    date: "9 Apr, 2024",
    excerpt: "Techniques for quantizing and optimizing large models to run efficiently on resource-constrained hardware.",
    slug: "optimizing-model-inference",
  },
  {
    title: "The Future of LLM Orchestration",
    date: "7 Feb, 2024",
    excerpt: "A deep dive into the evolving landscape of LLM agents and orchestration frameworks.",
    slug: "future-llm-orchestration",
  },
  {
    title: "Hello World",
    date: "14 Jun, 2023",
    excerpt: "The obligatory first post - why I'm starting this blog and what to expect.",
    slug: "hello-world",
  },
];

export default function Home() {
  const featuredPosts = POSTS.filter(p => p.featured);
  const recentPosts = POSTS.filter(p => !p.featured);

  return (
    <div className="flex flex-col gap-14 py-10">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-500/20">
            NZ
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Nidhal Zitouni</h2>
            <p className="text-xs text-muted-foreground font-medium">AI Research & MLOps Engineer</p>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-tight">
            Bridging AI Research & <span className="text-indigo-600 dark:text-indigo-400">MLOps Engineering</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Building robust, scalable machine learning infrastructure and deploying state-of-the-art AI models to production environments.
          </p>
        </div>

        {/* Quick Social & Contact links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-md shadow-indigo-600/20"
          >
            About & Experience
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="https://github.com/ZitouniNidhal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-accent text-sm font-medium transition-colors"
          >
            <GithubIcon />
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/zitouninidhal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-accent text-sm font-medium transition-colors"
          >
            <LinkedinIcon />
            LinkedIn
          </Link>
        </div>
      </section>

      {/* Featured Insights */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-bold tracking-tight">Featured Insights</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/posts/${post.slug}`}
              className="group relative p-6 rounded-2xl border border-border bg-card hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Featured</span>
                <h3 className="text-xl font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {post.excerpt}
                </p>
                <div className="mt-4 text-xs text-muted-foreground font-medium">
                  {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Recent Writings</h2>
          <Link href="/posts" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {recentPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/posts/${post.slug}`}
              className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all"
            >
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {post.excerpt}
                </p>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap ml-4 font-medium">
                {post.date}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
