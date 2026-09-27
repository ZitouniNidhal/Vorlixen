import Link from "next/link";

interface Post {
  title: string;
  date: string;
  slug: string;
}

const POSTS: Post[] = [
  { title: "How do I start contributing to the linux kernel?", date: "2025-05-12", slug: "starting-contributing-to-linux-kernel" },
  { title: "eBPF for Observability: A Practical Introduction", date: "2024-07-21", slug: "ebpf-observability-intro" },
  { title: "Building a Homelab Kubernetes Cluster", date: "2024-04-09", slug: "homelab-k8s-setup" },
  { title: "Rust Error Handling: Beyond Result and Option", date: "2024-02-07", slug: "rust-error-handling-patterns" },
  { title: "Hello World", date: "2023-06-14", slug: "hello-world" },
];

export default function ArchivesPage() {
  // Group posts by year
  const years = Array.from(new Set(POSTS.map(p => p.date.split("-")[0]))).sort((a, b) => b.localeCompare(a));

  return (
    <div className="py-12 space-y-12 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight">Archives</h1>
      
      <div className="space-y-12">
        {years.map(year => (
          <div key={year} className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">{year}</h2>
            <ul className="space-y-3">
              {POSTS.filter(p => p.date.startsWith(year)).map(post => (
                <li key={post.slug} className="flex items-center justify-between group">
                  <Link href={`/posts/${post.slug}`} className="text-muted-foreground group-hover:text-foreground transition-colors">
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
