import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BEGIN = "<!-- BEGIN:blog-list -->";
const END = "<!-- END:blog-list -->";

function scalar(value) {
  const text = value.trim();
  if (text.startsWith('"')) return JSON.parse(text);
  if (text.startsWith("'") && text.endsWith("'")) return text.slice(1, -1).replace(/''/g, "'");
  return text;
}

export async function readPublishedBlogPosts(directory) {
  const posts = [];
  for (const filename of await readdir(directory)) {
    if (!filename.endsWith(".md") || filename === "README.md") continue;
    const source = (await readFile(path.join(directory, filename), "utf8")).replace(/\r\n/g, "\n");
    const frontmatter = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/)?.[1];
    if (!frontmatter) continue;
    const field = (name) => scalar(frontmatter.match(new RegExp(`^${name}:[ \\t]*(.*)$`, "m"))?.[1] ?? "");
    if (field("status") !== "published") continue;
    const post = Object.fromEntries(["title", "slug", "meta_description", "date_published"].map((key) => [key, field(key)]));
    if (Object.values(post).some((value) => typeof value !== "string" || !value.trim() || /[\r\n]/.test(value))) {
      throw new Error(`Missing or multiline blog metadata in ${filename}`);
    }
    const date = new Date(`${post.date_published}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date_published) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== post.date_published) {
      throw new Error(`Invalid date_published in ${filename}`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) || filename !== `${post.slug}.md`) {
      throw new Error(`Invalid blog slug in ${filename}`);
    }
    posts.push(post);
  }
  return posts.sort((a, b) => b.date_published.localeCompare(a.date_published) || a.slug.localeCompare(b.slug));
}

export function updateBlogList(source, posts, filename) {
  const newline = source.includes("\r\n") ? "\r\n" : "\n";
  const list = posts.map((post) => `- [${post.title}](https://nancrown.com/blog/${post.slug}): ${post.meta_description}`).join(newline);
  const begin = source.indexOf(BEGIN);
  const end = source.indexOf(END);
  if (begin !== -1 || end !== -1) {
    if (begin === -1 || end < begin || source.indexOf(BEGIN, begin + BEGIN.length) !== -1 || source.indexOf(END, end + END.length) !== -1) {
      throw new Error(`Missing, reversed or duplicate blog-list markers in ${filename}`);
    }
    return source.slice(0, begin + BEGIN.length) + newline + (list ? list + newline : "") + source.slice(end);
  }

  let anchor;
  if (filename === "llms.txt") {
    const heading = /^## Blog\r?$/m.exec(source);
    if (!heading) throw new Error(`Missing Blog section in ${filename}`);
    const section = source.slice(heading.index + heading[0].length);
    const nextHeading = /^## /m.exec(section);
    const intro = /^.*https:\/\/nancrown\.com\/blog[^\r\n]*(?:\r?\n|$)/m.exec(section.slice(0, nextHeading?.index));
    if (intro) anchor = heading.index + heading[0].length + intro.index + intro[0].length;
  } else {
    const intro = /^Blog: https:\/\/nancrown\.com\/blog[^\r\n]*(?:\r?\n|$)/m.exec(source);
    if (intro) anchor = intro.index + intro[0].length;
  }
  if (anchor === undefined) throw new Error(`Missing Blog introduction in ${filename}`);
  const prefix = source.slice(0, anchor);
  const block = (prefix.endsWith("\n") ? "" : newline) + BEGIN + newline + (list ? list + newline : "") + END + newline;
  return prefix + block + source.slice(anchor);
}

export async function generateLlmsBlog(root = process.cwd()) {
  const posts = await readPublishedBlogPosts(path.join(root, "content/blog"));
  // Validate both destinations before writing either file.
  const updates = await Promise.all(["llms.txt", "llms-full.txt"].map(async (filename) => {
    const destination = path.join(root, "public", filename);
    const source = await readFile(destination, "utf8");
    return { destination, source, output: updateBlogList(source, posts, filename) };
  }));
  let changed = 0;
  for (const { destination, source, output } of updates) {
    if (output === source) continue;
    await writeFile(destination, output, "utf8");
    changed++;
  }
  return { posts: posts.length, changed };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const result = await generateLlmsBlog();
  console.log(`Blog list: ${result.posts} published posts; ${result.changed} files updated.`);
}
