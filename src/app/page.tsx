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
    title: "Building End-to-End LLM MLOps & Evaluation Pipelines",
    date: "12 May, 2025",
    excerpt: "Automating synthetic dataset generation, LoRA fine-tuning, and real-time safety and quality evaluation metrics in production.",
    slug: "llm-mlops-pipelines",
    featured: true,
  },
  {
    title: "Model Optimization with TensorRT and Triton Inference Server",
    date: "21 Jul, 2024",
    excerpt: "Techniques for reducing deep learning inference latency by 45% using TensorRT, ONNX Runtime, and dynamic batching.",
    slug: "tensorrt-triton-optimization",
    featured: true,
  },
  {
    title: "Building Feature Stores at Scale with PySpark & BigQuery",
    date: "9 Apr, 2024",
    excerpt: "Architecting reliable feature stores and preprocessing pipelines for real-time model serving.",
    slug: "pyspark-feature-stores",
  },
  {
    title: "Hello World & Welcome to my AI & MLOps Engineering Blog",
    date: "14 Jun, 2023",
    excerpt: "An introduction to my technical work in AI research, MLOps, and cloud infrastructure.",
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
