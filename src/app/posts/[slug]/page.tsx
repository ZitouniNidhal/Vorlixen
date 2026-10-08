import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";

interface PostProps {
  params: { slug: string };
}

async function getPost(slug: string) {
  if (!/^[A-Za-z0-9_-]+$/.test(slug)) {
    return null;
  }

  const fullPath = path.join(process.cwd(), "content", "posts", `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  
  const processedContent = await remark()
    .use(html)
    .process(content);
    
  const compiledHtml = processedContent.toString();

  return {
    metadata: data,
    content: compiledHtml,
  };
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = params;
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
