import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { marked, Renderer } from "marked";

export interface BlogFaq {
  question: string;
  answer: string;
}

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
  faq: BlogFaq[];
}

const BLOG_DIRECTORY = path.join(process.cwd(), "content/blog");

function blogRenderer(): Renderer {
  const renderer = new Renderer();
  renderer.html = () => "";
  renderer.table = function (token) {
    return `<div class="overflow-x-auto rounded-xl border border-gray-200">${Renderer.prototype.table.call(this, token)}</div>`;
  };
  return renderer;
}

function htmlToPlainText(html: string): string {
  const entities: Record<string, string> = {
    amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
    copy: "©", reg: "®", trade: "™", ndash: "–", mdash: "—", hellip: "…",
  };
  return html
    // Block boundaries need spaces; inline formatting must not split words.
    .replace(/<\/?(?:p|div|h[1-6]|ul|ol|li|blockquote|pre|table|tr|th|td|br|hr)\b[^>]*>/gi, " ")
    .replace(/<[^>]*>/g, "")
    // Decode after stripping tags so escaped, visible angle brackets survive.
    .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, name: string) => {
      if (!name.startsWith("#")) return entities[name] ?? entity;
      const code = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : Number(name.slice(1));
      return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff)
        ? String.fromCodePoint(code)
        : "\uFFFD";
    })
    .replace(/\s+/g, " ")
    .trim();
}

export function extractBlogFaq(body: string): BlogFaq[] {
  const tokens = marked.lexer(body);
  const renderer = blogRenderer();
  // Render with the page's rules first, then remove tags and decode entities.
  const plainText = (section: typeof tokens[number][]): string =>
    htmlToPlainText(marked.parser(section, { renderer, async: false }));
  const faq: BlogFaq[] = [];
  let inFaq = false;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type !== "heading") continue;
    if (token.depth <= 2) {
      inFaq = token.depth === 2 && /^(faq|frequently asked questions)$/i.test(plainText([token]));
    } else if (inFaq && token.depth === 3) {
      let end = i + 1;
      while (end < tokens.length) {
        const next = tokens[end];
        if (next.type === "heading" && next.depth <= 3) break;
        end++;
      }
      // 文章结尾的「联系我们」号召段常紧跟在最后一问后面，不属于答案，去掉
      const section = tokens.slice(i + 1, end);
      while (section.length) {
        const last = section[section.length - 1];
        if (last.type === "space") { section.pop(); continue; }
        if (last.type === "paragraph" && /\]\(\/contact[)#?\/]/.test(last.raw)) { section.pop(); continue; }
        break;
      }
      const question = plainText([token]);
      const answer = plainText(section);
      if (question && answer) faq.push({ question, answer });
      i = end - 1;
    }
  }
  return faq;
}

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
  const renderer = blogRenderer();

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
    faq: extractBlogFaq(body),
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

// getBlogPosts already excludes unpublished posts and sorts newest first.
export function getRelatedBlogPosts(sitePath: string): BlogPost[] {
  return getBlogPosts()
    .filter((post) => post.internal_links.includes(sitePath))
    .slice(0, 3);
}

export function getMoreBlogPosts(current: BlogPost, posts = getBlogPosts()): BlogPost[] {
  const links = new Set(current.internal_links);
  const overlap = (post: BlogPost) => new Set(post.internal_links.filter((link) => links.has(link))).size;
  return posts
    .filter((post) => post.status === "published" && post.slug !== current.slug)
    .sort((a, b) => overlap(b) - overlap(a) || b.date_published.localeCompare(a.date_published) || a.slug.localeCompare(b.slug))
    .slice(0, 3);
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
