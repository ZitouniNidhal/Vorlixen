import Link from "next/link";
import { X } from "lucide-react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22c1.1 0 2-.9 2-2H4c0 1.1.9 2 2 2h11zM12 15V3M3 15h18M12 15a3 3 0 0 1 3-3 3 3 0 0 1-3-3 3 3 0 0 1-3 3 3 3 0 0 1 3 3z" />
    <path d="M9 12h6" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="2" />
    <circle cx="4" cy="5" r="2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="max-w-3xl mx-auto px-4 py-12 mt-20 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <Link href="https://github.com/ZitouniNidhal" target="_blank" className="p-2 hover:bg-accent rounded-full transition-colors">
            <GithubIcon />
          </Link>
          <Link href="https://linkedin.com/in/zitouninidhal" target="_blank" className="p-2 hover:bg-accent rounded-full transition-colors">
            <LinkedinIcon />
          </Link>
          <Link href="https://x.com/zitouninidhal" target="_blank" className="p-2 hover:bg-accent rounded-full transition-colors">
            <X className="w-5 h-5" />
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          Copyright © {new Date().getFullYear()} | All rights reserved.
        </p>
      </div>
    </footer>
  );
}
