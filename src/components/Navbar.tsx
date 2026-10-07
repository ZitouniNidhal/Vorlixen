"use client";

import Link from "next/link";
import { Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="flex items-center justify-between py-8 mb-8 max-w-3xl mx-auto px-4">
      <Link href="/" className="flex items-center gap-2.5 font-bold hover:opacity-80 transition-opacity">
        <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm font-extrabold shadow-sm">
          NZ
        </span>
        <span className="text-lg tracking-tight">Nidhal Zitouni</span>
      </Link>
      
      <div className="flex items-center gap-6">
        <ul className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
          <li><Link href="/posts" className="hover:text-foreground transition-colors">Posts</Link></li>
          <li><Link href="/archives" className="hover:text-foreground transition-colors">Archives</Link></li>
        </ul>
        
        <div className="flex items-center gap-2">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-accent rounded-full transition-colors"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          )}
          <Link href="/search" className="p-2 hover:bg-accent rounded-full transition-colors" title="Search">
            <Search className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
