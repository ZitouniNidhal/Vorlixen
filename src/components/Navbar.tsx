import Link from "next/link";
import { Search, Settings, Github, Linkedin, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-8 mb-12 max-w-3xl mx-auto px-4">
      <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
        aRustyDev's Blog
      </Link>
      
      <div className="flex items-center gap-6">
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <li><Link href="/posts" className="hover:text-foreground transition-colors">Posts</Link></li>
          <li><Link href="/tags" className="hover:text-foreground transition-colors">Tags</Link></li>
          <li><Link href="/graph" className="hover:text-foreground transition-colors">Graph</Link></li>
          <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
          <li><Link href="/archives" className="hover:text-foreground transition-colors">Archives</Link></li>
        </ul>
        
        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 hover:bg-accent rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          <button className="p-2 hover:bg-accent rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
