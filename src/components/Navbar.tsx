"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Bell, Search, Sun, Moon, Rocket, Activity } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/traceforge", label: "TraceForge-X", isLive: true },
  { href: "/posts", label: "Workflows" },
  { href: "/archives", label: "Archives" },
  { href: "/about", label: "About" },
];

/**
 * Detect client-side mounting without useEffect + setState,
 * which triggers the react-hooks/set-state-in-effect lint rule.
 * useSyncExternalStore is the React 19-idiomatic way: the server
 * snapshot returns false, the client snapshot returns true.
 */
const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-[#0d1117]/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-md shadow-emerald-500/20">
              <Rocket className="h-4 w-4 text-slate-950" />
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight text-foreground">NexaForge</div>
            </div>
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#161b22] text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {item.isLive && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/40 bg-cyan-500/15 px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider text-cyan-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Live
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-md border border-border bg-[#161b22] px-3 py-2 md:flex">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Search or jump to...</span>
            <span className="rounded border border-border bg-[#0d1117] px-1.5 py-0.5 text-[10px] text-muted-foreground">/</span>
          </div>

          <button
            type="button"
            aria-label="Toggle color theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-[#161b22] text-muted-foreground transition hover:text-foreground"
          >
            {mounted && (resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-[#161b22] text-muted-foreground transition hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>

          <Link
            href="/traceforge"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-[#161b22] px-3 py-2 text-xs font-mono font-medium text-foreground hover:border-cyan-500/40 transition"
          >
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden sm:inline">TraceForge-X</span>
            <span className="rounded bg-cyan-500/20 px-1 py-0.5 text-[9px] text-cyan-300">v2.4</span>
          </Link>

          <Link
            href="/posts"
            className="hidden items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-300 sm:inline-flex"
          >
            Explore
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
