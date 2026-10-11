import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/80 bg-slate-950/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold tracking-tight">Zitouni</div>
          <p className="mt-2 text-sm text-muted-foreground">
            MLOps, data engineering, and AI platform strategy.
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/posts" className="transition hover:text-foreground">Blog</Link>
          <Link href="/about" className="transition hover:text-foreground">About</Link>
          <Link href="/archives" className="transition hover:text-foreground">Archives</Link>
          <Link
            href="https://github.com/zitouninidhal"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/nidhal-zitouni"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-foreground"
          >
            LinkedIn
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Zitouni. All rights reserved.</p>
      </div>
    </footer>
  );
}
