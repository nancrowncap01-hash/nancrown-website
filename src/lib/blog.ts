import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { marked, Renderer } from "marked";

export interface BlogPost {
  title: string;
  slug: string;
  meta_description: string;
  date_published: string;
  date_modified: string;
  internal_links: string[];
  status: "published";
  body: string;
  html: string;
}

const BLOG_DIRECTORY = path.join(process.cwd(), "content/blog");

// Deliberately limited YAML: single-line scalars and an inline or block string list.
// Content is repository-owned Markdown; raw HTML is omitted when rendering.
function scalar(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith('"')) return JSON.parse(trimmed);
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  return trimmed;
}

function parsePost(filename: string): BlogPost | undefined {
  const source = readFileSync(path.join(BLOG_DIRECTORY, filename), "utf8").replace(/\r\n/g, "\n");
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!frontmatter) return undefined;

  const status = frontmatter[1].match(/^status:\s*(.*?)\s*$/m)?.[1];
  if (!status || scalar(status) !== "published") return undefined;

  const fields: Record<string, string | string[]> = {};
  let listKey: string | undefined;
  for (const line of frontmatter[1].split("\n")) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const item = line.match(/^\s+-\s+(.+)$/);
    if (item && listKey) {
      (fields[listKey] as string[]).push(scalar(item[1]));
      continue;
    }
    const field = line.match(/^([a-z_]+):\s*(.*?)\s*$/);
    if (!field || Object.hasOwn(fields, field[1])) {
      throw new Error(`Invalid or duplicate blog frontmatter in ${filename}: ${line}`);
    }
    const [, key, value] = field;
    listKey = value === "" ? key : undefined;
    if (listKey) fields[key] = [];
    else if (value.startsWith("[")) fields[key] = JSON.parse(value);
    else fields[key] = scalar(value);
  }

  function required(key: string): string {
    const value = fields[key];
    if (typeof value !== "string" || !value.trim()) {
      throw new Error(`Missing or invalid ${key} in ${filename}`);
    }
    return value;
  }

  function date(key: string): string {
    const value = required(key);
    const parsed = new Date(`${value}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
      throw new Error(`Invalid ${key} in ${filename}; use YYYY-MM-DD`);
    }
    return value;
  }

  const title = required("title");
  const slug = required("slug");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || filename !== `${slug}.md`) {
    throw new Error(`Blog slug must match the lowercase, hyphenated filename: ${filename}`);
  }
  const internal_links = fields.internal_links;
  if (!Array.isArray(internal_links) || !internal_links.every((link) => typeof link === "string" && link.startsWith("/") && !link.startsWith("//"))) {
    throw new Error(`Invalid internal_links in ${filename}; use a list of site-relative paths`);
  }
  const date_published = date("date_published");
  const date_modified = date("date_modified");
  if (date_modified < date_published) {
    throw new Error(`date_modified precedes date_published in ${filename}`);
  }

  const body = source.slice(frontmatter[0].length);
  const tokens = marked.lexer(body);
  // The page owns the H1. Keep the source body intact, omitting only its matching
  // opening title from the rendered body so the article has exactly one H1.
  const first = tokens.findIndex((token) => token.type !== "space");
  const heading = tokens[first];
  if (heading?.type === "heading" && heading.depth === 1 && heading.text === title) {
    tokens.splice(first, 1);
  }
  if (tokens.some((token) => token.type === "heading" && token.depth === 1)) {
    throw new Error(`Use H2/H3 in ${filename}; an optional opening H1 must match title`);
  }
  const renderer = new Renderer();
  renderer.html = () => "";
  renderer.table = function (token) {
    return `<div class="overflow-x-auto rounded-xl border border-gray-200">${Renderer.prototype.table.call(this, token)}</div>`;
  };

  return {
    title,
    slug,
    meta_description: required("meta_description"),
    date_published,
    date_modified,
    internal_links,
    status: "published",
    body,
    html: marked.parser(tokens, { renderer, async: false }),
  };
}

export function getBlogPosts(): BlogPost[] {
  return readdirSync(BLOG_DIRECTORY)
    .filter((filename) => filename.endsWith(".md") && filename !== "README.md")
    .map(parsePost)
    .filter((post): post is BlogPost => post !== undefined)
    .sort((a, b) => b.date_published.localeCompare(a.date_published) || a.slug.localeCompare(b.slug));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
