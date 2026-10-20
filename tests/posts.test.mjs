import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

test("Content Directory: markdown posts exist and have valid structure", () => {
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  assert.ok(fileNames.length >= 5, `Expected at least 5 posts, found ${fileNames.length}`);

  for (const file of fileNames) {
    const fullPath = path.join(postsDirectory, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(content);

    assert.ok(data.title, `Post ${file} is missing a title`);
    assert.ok(data.date, `Post ${file} is missing a date`);
    assert.match(data.date, /^\d{4}-\d{2}-\d{2}$/, `Post ${file} date must match YYYY-MM-DD`);
  }
});

test("Post Slugs: valid format and safe from traversal", () => {
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const slugRegex = /^[A-Za-z0-9_-]+$/;

  for (const file of fileNames) {
    const slug = file.replace(/\.md$/, "");
    assert.ok(slugRegex.test(slug), `Slug '${slug}' fails safe character regex`);
    assert.ok(!slug.includes(".."), `Slug '${slug}' contains path traversal`);
  }
});
