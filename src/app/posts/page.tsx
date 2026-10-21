import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";

export const metadata: Metadata = {
  title: "Workflows & Engineering Notes | NexaForge",
  description: "A collection of technical workflows, postmortems, and thoughts on AI, systems programming, and infrastructure.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="py-12 space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white">Workflows &amp; Notes</h1>
        <p className="text-muted-foreground text-sm">
          Technical postmortems, infrastructure recipes, and AI observability runbooks.
        </p>
      </div>

      <PostList initialPosts={posts} />
    </div>
  );
}
