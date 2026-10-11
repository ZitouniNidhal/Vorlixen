import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  Database,
  GitBranch,
  Layers3,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

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
    description: "Security, lineage, and governance baked in so teams can scale confidently from prototype to production.",
  },
];

const workflowSteps = [
  {
    icon: Layers3,
    title: "Connect data sources",
    text: "Unify product, operational, and model data into a consistent platform layer.",
  },
  {
    icon: Cpu,
    title: "Build & evaluate",
    text: "Train, benchmark, and compare experiments with traceable metrics and reusable pipelines.",
  },
  {
    icon: Rocket,
    title: "Deploy with confidence",
    text: "Ship reliable AI systems with governance, observability, and rapid rollback controls.",
  },
];

const useCases = [
  "AI product teams",
  "Data engineering squads",
  "MLOps platform builders",
  "Research-to-production teams",
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

const testimonials = [
  {
    quote:
      "NexaForge gave our AI initiative the operational discipline we were missing—clean pipelines, clean ownership, clean delivery.",
    name: "Amel K.",
    role: "Head of AI Platform",
  },
  {
    quote:
      "From experimentation to production release, the platform gave us a much faster path with stronger trust and visibility.",
    name: "Sami M.",
    role: "VP of Data",
  },
];

export default function Home() {
  return (
    <div className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
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

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Trusted by product and platform teams
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card/80 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Platform overview</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Live deployment</h2>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                Healthy
              </div>
            </div>

            <div className="space-y-4">
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

            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pipeline health</span>
                <span className="text-sm font-semibold text-cyan-300">98.4%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
              </div>
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

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-slate-950/60 p-8 shadow-2xl shadow-cyan-950/20">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-300">How it works</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">From raw signals to production-grade intelligence.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {workflowSteps.map(({ icon: Icon, title, text }, index) => (
              <div key={title} className="rounded-3xl border border-border bg-card/70 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-violet-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Built for</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Teams building real AI programs.</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-card/70 p-5 text-sm font-medium text-muted-foreground transition hover:border-cyan-400/40 hover:text-foreground">
              {item}
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

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((person) => (
            <div key={person.name} className="rounded-[2rem] border border-border bg-card/70 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/25 to-violet-500/25 text-cyan-300">
                <BarChart3 className="h-5 w-5" />
              </div>
              <p className="text-lg leading-8 text-foreground">“{person.quote}”</p>
              <div className="mt-6">
                <div className="font-semibold text-white">{person.name}</div>
                <div className="text-sm text-muted-foreground">{person.role}</div>
              </div>
            </div>
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
}0">                Read article
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
