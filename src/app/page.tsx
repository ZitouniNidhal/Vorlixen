import Link from "next/link";

interface Post {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  featured?: boolean;
}

const POSTS: Post[] = [
  {
    title: "How do I start contributing to the linux kernel?",
    date: "12 May, 2025",
    excerpt: "A blog post about how I got started contributing to the linux kernel, this is getting updated overtime, and is more about the journey than the destination",
    slug: "starting-contributing-to-linux-kernel",
    featured: true,
  },
  {
    title: "eBPF for Observability: A Practical Introduction",
    date: "21 Jul, 2024",
    excerpt: "Getting started with eBPF-based observability tools - from understanding the basics to deploying in production.",
    slug: "ebpf-observability-intro",
    featured: true,
  },
  {
    title: "Building a Homelab Kubernetes Cluster",
    date: "9 Apr, 2024",
    excerpt: "Documenting my homelab k8s setup - hardware choices, networking, and lessons learned from running production-style infrastructure at home.",
    slug: "homelab-k8s-setup",
  },
  {
    title: "Rust Error Handling: Beyond Result and Option",
    date: "7 Feb, 2024",
    excerpt: "Practical patterns for error handling in Rust applications, from simple CLI tools to complex services.",
    slug: "rust-error-handling-patterns",
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
    <div className="py-12 space-y-12">
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Featured Posts</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {featuredPosts.map(post => (
            <Link 
              key={post.slug} 
              href={`/posts/${post.slug}`}
              className="group p-6 rounded-2xl border bg-card hover:border-primary transition-colors"
            >
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-4 text-xs text-muted-foreground">
                {post.date}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Recent Posts</h2>
        <div className="flex flex-col gap-6">
          {recentPosts.map(post => (
            <Link 
              key={post.slug} 
              href={`/posts/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1">
                <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {post.excerpt}
                </p>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {post.date}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
