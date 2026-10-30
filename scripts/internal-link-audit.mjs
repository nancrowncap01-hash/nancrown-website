import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";

// Read built HTML only: no crawling, requests, or source-data changes.
// Count distinct English source pages, not repeated anchors on the same page.
const { values } = parseArgs({
  options: {
    "build-dir": { type: "string", default: ".next/server/app" },
    output: { type: "string" },
    "home-variant": { type: "string", default: "a" },
  },
});
if (!["a", "b"].includes(values["home-variant"])) {
  throw new Error("--home-variant must be a or b");
}

const origin = "https://nancrown.com";
const buildDir = path.resolve(values["build-dir"]);
async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(filename) : filename.endsWith(".html") ? [filename] : [];
  }));
  return files.flat();
}

const files = [path.join(buildDir, "en.html"), ...await htmlFiles(path.join(buildDir, "en"))];
const pages = new Map();
for (const filename of files.sort()) {
  const relative = path.relative(buildDir, filename).split(path.sep).join("/");
  if (relative === "en/home-b.html") continue; // Internal rewrite, not a second public URL.
  const urlPath = relative === "en.html" ? "/" : relative.replace(/^en/, "").replace(/\.html$/, "");
  const source = urlPath === "/" && values["home-variant"] === "b"
    ? path.join(buildDir, "en/home-b.html") : filename;
  const html = (await readFile(source, "utf8"))
    .replace(/<!--[^]*?-->/g, "")
    .replace(/<(script|style)\b[^>]*>[^]*?<\/\1\s*>/gi, "");
  const outgoing = new Set();
  // Next emits quoted href attributes; inspect actual anchors only (not JSON-LD,
  // RSC payloads, preload/canonical/hreflang links, or plain-text URLs).
  for (const anchor of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = anchor[0].match(/\bhref\s*=\s*(["'])([^]*?)\1/i)?.[2];
    if (!href || href.startsWith("#")) continue;
    const target = new URL(href.replace(/&amp;/g, "&"), `${origin}${urlPath}`);
    if (target.origin !== origin) continue;
    const destination = target.pathname.replace(/\/$/, "") || "/";
    if (destination !== urlPath) outgoing.add(destination);
  }
  pages.set(urlPath, { outgoing, incoming: new Set(), clicksFromHome: null });
}
for (const [source, page] of pages) {
  for (const destination of page.outgoing) pages.get(destination)?.incoming.add(source);
}
pages.get("/").clicksFromHome = 0;
const queue = ["/"];
for (let i = 0; i < queue.length; i++) {
  const page = pages.get(queue[i]);
  for (const destination of page.outgoing) {
    const target = pages.get(destination);
    if (target && target.clicksFromHome === null) {
      target.clicksFromHome = page.clicksFromHome + 1;
      queue.push(destination);
    }
  }
}
const report = {
  homeVariant: values["home-variant"],
  pageCount: pages.size,
  methodology: "Distinct English source pages linking via HTML anchors; self-links excluded; shortest directed path from home; null means unreachable. Includes header/footer anchors. Internal home-b is represented as home only when --home-variant=b. No network requests.",
  pages: [...pages].map(([urlPath, page]) => ({
    url: `${origin}${urlPath}`,
    inboundSourceCount: page.incoming.size,
    clicksFromHome: page.clicksFromHome,
    inboundSources: [...page.incoming].sort(),
    outgoing: [...page.outgoing].filter((target) => pages.has(target)).sort(),
  })).sort((a, b) => a.url.localeCompare(b.url)),
};
if (values.output) {
  await mkdir(path.dirname(values.output), { recursive: true });
  await writeFile(values.output, JSON.stringify(report, null, 2) + "\n");
  console.log(`Audited ${report.pageCount} English URLs (home ${report.homeVariant.toUpperCase()}) → ${values.output}`);
} else {
  console.log(JSON.stringify(report, null, 2));
}
