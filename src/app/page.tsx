import Image from "next/image";
import Link from "next/link";
import { Rss } from "lucide-react";

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
    <div className="flex flex-col gap-12 py-10">
      {/* Hero Section */}
      <section className="space-y-4 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          AI Research & <span className="text-indigo-600 dark:text-indigo-400">MLOps Engineering</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Bridging the gap between cutting-edge AI research and production-ready systems. 
          Exploring the intersection of scalability, efficiency, and intelligence.
        </p>
      </section>

      {/* Featured Posts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Featured Insights</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/posts/${post.slug}`}
              className="group relative p-6 rounded-2xl border border-border bg-card hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Featured</span>
                <h3 className="text-xl font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {post.excerpt}
                </p>
                <div className="mt-4 text-xs text-muted-foreground">
                  {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Recent Writings</h2>
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
              <div className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                {post.date}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
