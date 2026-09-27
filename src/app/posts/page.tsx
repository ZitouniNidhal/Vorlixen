import Link from "next/link";

interface Post {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

const POSTS: Post[] = [
  {
    title: "How do I start contributing to the linux kernel?",
    date: "12 May, 2025",
    excerpt: "A blog post about how I got started contributing to the linux kernel, this is getting updated overtime, and is more about the journey than the destination",
    slug: "starting-contributing-to-linux-kernel",
  },
  {
    title: "eBPF for Observability: A Practical Introduction",
    date: "21 Jul, 2024",
    excerpt: "Getting started with eBPF-based observability tools - from understanding the basics to deploying in production.",
    slug: "ebpf-observability-intro",
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

export default function PostsPage() {
  return (
    <div className="py-12 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Posts</h1>
        <p className="text-muted-foreground">A collection of my technical notes and thoughts.</p>
      </div>
      
      <div className="grid gap-12">
        {POSTS.map(post => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="group block space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <time className="text-sm text-muted-foreground">{post.date}</time>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
