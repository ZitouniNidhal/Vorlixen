import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="max-w-3xl mx-auto px-4 py-12 mt-20 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <Link href="https://github.com/aRustyDev" target="_blank" className="p-2 hover:bg-accent rounded-full transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="https://linkedin.com/in/smithadamc" target="_blank" className="p-2 hover:bg-accent rounded-full transition-colors">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="https://x.com/aRustyDev" target="_blank" className="p-2 hover:bg-accent rounded-full transition-colors">
            <Twitter className="w-5 h-5" />
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          Copyright © {new Date().getFullYear()} | All rights reserved.
        </p>
      </div>
    </footer>
  );
}
