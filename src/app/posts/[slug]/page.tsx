import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";
import { getPostSlugs } from "@/lib/posts";
import type { Metadata } from "next";

interface PostProps {
  params: Promise<{ slug: string }>;
}

const postsDirectory = path.join(process.cwd(), "content", "posts");

async function getPost(slug: string) {
  if (!/^[A-Za-z0-9_-]+$/.test(slug)) {
    return null;
  }

  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html, { sanitize: true })
      .process(content);

    return {
      metadata: data,
      content: processedContent.toString(),
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found | NexaForge" };
  }

  return {
    title: `${post.metadata.title} | NexaForge`,
    description: (post.metadata.excerpt as string) ?? `Read ${post.metadata.title} on NexaForge`,
  };
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12 space-y-8 max-w-2xl mx-auto">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          {post.metadata.title}
        </h1>
        <time className="text-sm text-muted-foreground">
          {post.metadata.date}
        </time>
      </header>

      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
