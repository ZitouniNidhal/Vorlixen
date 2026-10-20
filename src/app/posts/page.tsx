import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts | NexaForge",
  description: "A collection of technical notes and thoughts on AI, systems programming, and infrastructure.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="py-12 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Posts</h1>
        <p className="text-muted-foreground">A collection of my technical notes and thoughts.</p>
      </div>

      <div className="grid gap-12">
        {posts.map(post => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="group block space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <time className="text-sm text-muted-foreground">{post.date}</time>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
