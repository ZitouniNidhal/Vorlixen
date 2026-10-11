import Link from "next/link";
import { ArrowRight, BarChart3, Database, GitBranch, ShieldCheck, Sparkles, Workflow } from "lucide-react";

const metrics = [
  { label: "Projects launched", value: "18+" },
  { label: "Models deployed", value: "42" },
  { label: "Avg. pipeline uptime", value: "99.9%" },
  { label: "Data teams enabled", value: "12" },
];

const platformFeatures = [
  {
    icon: Database,
    title: "Data products",
    description: "Build governed, reusable data assets that connect analytics, ML, and product teams around a single source of truth.",
  },
  {
    icon: Workflow,
    title: "MLOps workflows",
    description: "Operationalize experimentation, training, deployment, observability, and rollback across every stage of the lifecycle.",
  },
  {
    icon: GitBranch,
    title: "Versioned collaboration",
    description: "Track datasets, experiments, model revisions, and deployment history while keeping every contributor aligned.",
  },
  {
    icon: ShieldCheck,
    title: "Production trust",
    description: "Security, lineage, and governance built in so teams can scale confidently from prototype to production.",
  },
];

const posts = [
  {
    title: "Building end-to-end LLM MLOps & evaluation pipelines",
    date: "12 May, 2025",
    excerpt: "Automating synthetic dataset generation, LoRA fine-tuning, and production-grade evaluation loops for trustworthy AI systems.",
    slug: "llm-mlops-pipelines",
  },
  {
    title: "Model optimization with TensorRT and Triton Inference Server",
    date: "21 Jul, 2024",
    excerpt: "Reduce inference latency with optimized serving, batching, and deployment strategies for production workloads.",
    slug: "tensorrt-triton-optimization",
  },
  {
    title: "Feature stores at scale with PySpark & BigQuery",
    date: "9 Apr, 2024",
    excerpt: "Design reliable feature pipelines for experimentation, online serving, and real-time model interoperability.",
    slug: "pyspark-feature-stores",
  },
];

export default function Home() {
  return (
    <div className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              AI infrastructure for modern teams
            </div>

            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
              The collaborative platform for data, ML, and AI operations.
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              NexaForge helps teams accelerate discovery, streamline model delivery, and scale trustworthy AI systems from prototype to production.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
              >
                Explore platform
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-5 py-3 font-medium text-foreground transition hover:border-cyan-400/60"
              >
                Meet the engineer
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Platform overview</p>
                <h2 className="mt-2 text-2xl font-bold">Live deployment</h2>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                Healthy
              </div>
            </div>

            <div className="space-y-5">
              {[
                ["Model registry", "24 active versions"],
                ["Feature pipelines", "8 automated jobs"],
                ["Experiment tracking", "1,287 runs"],
                ["Incident response", "2 min MTTR"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-2xl border border-border bg-slate-900/60 px-4 py-3">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((item) => (
            <div key={item.label} className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm">
              <div className="text-3xl font-black text-white">{item.value}</div>
              <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Platform capabilities</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Designed for serious AI delivery.</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {platformFeatures.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-3xl border border-border bg-card/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/50">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/25 to-violet-500/25 text-cyan-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Latest insights</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Expert analysis and field notes.</h2>
          </div>
          <Link href="/posts" className="hidden text-sm font-medium text-cyan-300 transition hover:text-cyan-200 sm:inline-flex">
            View all posts →
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="group rounded-3xl border border-border bg-card/70 p-6 transition hover:border-cyan-400/50 hover:bg-card">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{post.date}</p>
              <h3 className="mt-4 text-2xl font-semibold leading-tight text-white group-hover:text-cyan-300">{post.title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                Read article
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-violet-500/10 p-8 text-center shadow-xl shadow-cyan-950/20">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Ready to build?</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Turn AI ideas into dependable systems.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            From data foundations to deployment strategy, NexaForge helps teams build the operational maturity needed for real-world AI success.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-cyan-100"
          >
            Let&apos;s connect
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
