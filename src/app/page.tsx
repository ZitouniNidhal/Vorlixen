import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ChevronRight,
  Code2,
  FolderGit2,
  GitBranch,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const repoCards = [
  {
    name: "nexaforge-platform",
    description: "Core AI platform and orchestration services for data pipelines and ML workflows.",
    language: "TypeScript",
    stars: 128,
    forks: 21,
    status: "Active",
  },
  {
    name: "ml-workflows",
    description: "Reusable training, evaluation, and deployment pipelines for production ML systems.",
    language: "Python",
    stars: 94,
    forks: 17,
    status: "Stable",
  },
  {
    name: "data-contracts",
    description: "Schema governance layer and validation tooling for trusted data products.",
    language: "Go",
    stars: 76,
    forks: 11,
    status: "Healthy",
  },
];

const featureColumns = [
  {
    icon: FolderGit2,
    title: "Repositories",
    desc: "Organize projects, codebases, and AI assets in a clean collaboration workspace.",
  },
  {
    icon: GitBranch,
    title: "Version control",
    desc: "Track work across experiments, releases, and code contributions with strong lineage.",
  },
  {
    icon: ShieldCheck,
    title: "Governance",
    desc: "Security, review, and policy controls built directly into your delivery process.",
  },
];

const dashboardStats = [
  { label: "Active repos", value: "48" },
  { label: "Deployments", value: "226" },
  { label: "Avg. lead time", value: "4d" },
  { label: "Uptime", value: "99.9%" },
];

const highlights = [
  "AI collaboration workspace",
  "Model lifecycle management",
  "Secure deployment workflows",
  "Cross-functional analytics",
];

export default function Home() {
  return (
    <div className="gitea-surface min-h-screen px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="gitea-panel rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-6 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                Gitea-inspired platform
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Build, ship, and scale AI products with confidence.
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/posts" className="gitea-button-primary inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium">
                Explore workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="gitea-button inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium">
                About us
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-xl border border-border bg-[#0d1117] p-5">
              <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-md border border-border bg-[#161b22] p-2">
                    <FolderGit2 className="h-4 w-4 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">NexaForge / platform</div>
                    <div className="text-xs text-muted-foreground">Private • 32 contributors</div>
                  </div>
                </div>
                <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                  Healthy
                </div>
              </div>

              <div className="space-y-4">
                {repoCards.map((repo) => (
                  <div key={repo.name} className="flex items-center justify-between rounded-lg border border-border bg-[#161b22] p-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate text-sm font-medium text-white">{repo.name}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{repo.description}</p>
                    </div>
                    <div className="hidden items-center gap-3 text-xs text-muted-foreground md:flex">
                      <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5" /> {repo.stars}</span>
                      <span className="inline-flex items-center gap-1"><GitBranch className="h-3.5 w-3.5" /> {repo.forks}</span>
                      <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-emerald-300">
                        {repo.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-xl border border-border bg-[#161b22] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-medium text-white">Overview</div>
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Live</span>
                </div>
                <div className="space-y-4">
                  {dashboardStats.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border border-border bg-[#0d1117] px-3 py-2">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-semibold text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-[#161b22] p-5">
                <div className="mb-3 text-sm font-medium text-white">Highlights</div>
                <ul className="space-y-3">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {featureColumns.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="gitea-panel rounded-2xl p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#161b22] text-cyan-300">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="gitea-panel rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg border border-border bg-[#161b22] p-2">
                <Rocket className="h-4 w-4 text-emerald-300" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Delivery workflow</div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                "Connect data and model sources",
                "Review experiments and release quality gates",
                "Deploy to production with traceability",
              ].map((step, index) => (
                <div key={step} className="flex items-start gap-3 rounded-xl border border-border bg-[#0d1117] p-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-xs font-semibold text-cyan-300">
                    {index + 1}
                  </div>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="gitea-panel rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg border border-border bg-[#161b22] p-2">
                <Users className="h-4 w-4 text-violet-300" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Built for modern teams</div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "AI product teams",
                "Data engineering",
                "Research operations",
                "Platform engineering",
              ].map((team) => (
                <div key={team} className="rounded-xl border border-border bg-[#0d1117] px-3 py-3 text-sm text-muted-foreground">
                  {team}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
                <BookOpen className="h-4 w-4" />
                Platform principles
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Clear ownership, trusted data, controlled releases, and documented engineering rituals for sustainable AI growth.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-border bg-[#161b22] p-7 text-center md:flex-row md:text-left">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-300">
              <Briefcase className="h-3.5 w-3.5" />
              Ready to launch
            </div>
            <h2 className="text-2xl font-semibold text-white">Turn ideas into production-grade systems.</h2>
          </div>
          <Link href="/about" className="gitea-button-primary inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium">
            Contact the team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}