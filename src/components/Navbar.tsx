"use client";

import Link from "next/link";
import { Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="flex items-center justify-between py-8 mb-12 max-w-3xl mx-auto px-4">
      <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
        aRustyDev&apos;s Blog
      </Link>
      
      <div className="flex items-center gap-6">
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <li><Link href="/posts" className="hover:text-foreground transition-colors">Posts</Link></li>
          <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
          <li><Link href="/archives" className="hover:text-foreground transition-colors">Archives</Link></li>
        </ul>
        
        <div className="flex items-center gap-4">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-accent rounded-full transition-colors"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <Link href="/search" className="p-2 hover:bg-accent rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
