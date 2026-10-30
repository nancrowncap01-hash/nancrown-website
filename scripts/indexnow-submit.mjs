import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

const HOST = "nancrown.com";
const KEY = "fd94f8313e1edda3ad5fa88fae53848f";
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH_SIZE = 10000;

function decodeXml(text) {
  return text.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, name) => {
    if (name.startsWith("#")) {
      return String.fromCodePoint(name[1].toLowerCase() === "x"
        ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10));
    }
    return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" }[name.toLowerCase()] ?? entity;
  });
}

// Parse <loc> only: hreflang alternate hrefs are not separate sitemap entries.
// This site's sitemap is a urlset, not a sitemap index.
export function parseSitemap(xml) {
  const source = xml.replace(/<!--[^]*?-->/g, "");
  if (!/<urlset\b/i.test(source) || /<sitemapindex\b/i.test(source)) {
    throw new Error("Expected a sitemap <urlset>");
  }
  const urls = [...source.matchAll(/<loc\b[^>]*>([^]*?)<\/loc\s*>/gi)].map((match) => {
    const value = match[1].trim();
    const location = value.startsWith("<![CDATA[") && value.endsWith("]]>")
      ? value.slice(9, -3) : decodeXml(value);
    const url = new URL(location);
    if (url.protocol !== "https:" || url.host !== HOST || url.username || url.password || url.hash) {
      throw new Error(`Unexpected sitemap URL: ${location}`);
    }
    return url.href;
  });
  if (!urls.length) throw new Error("Sitemap contains no URLs");
  return [...new Set(urls)];
}

export function createPayloads(urls) {
  const payloads = [];
  for (let offset = 0; offset < urls.length; offset += BATCH_SIZE) {
    payloads.push({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls.slice(offset, offset + BATCH_SIZE),
    });
  }
  return payloads;
}

export async function main(args = process.argv.slice(2), request = fetch) {
  const { values } = parseArgs({
    args,
    options: {
      "dry-run": { type: "boolean", default: false },
      "sitemap-file": { type: "string" },
    },
  });
  // Local fixtures/build output can only be used without submitting.
  if (values["sitemap-file"] && !values["dry-run"]) {
    throw new Error("--sitemap-file requires --dry-run");
  }
  let xml;
  if (values["sitemap-file"]) {
    xml = await readFile(values["sitemap-file"], "utf8");
  } else {
    const response = await request(SITEMAP_URL, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Sitemap HTTP ${response.status}`);
    xml = await response.text();
  }
  const urls = parseSitemap(xml);
  const payloads = createPayloads(urls);
  if (values["dry-run"]) {
    console.log(`Dry run: ${urls.length} URLs, ${payloads.length} batch(es); no submissions sent.`);
    return;
  }
  for (const [index, payload] of payloads.entries()) {
    const response = await request(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30000),
    });
    console.log(`IndexNow batch ${index + 1}/${payloads.length}: ${payload.urlList.length} URLs, HTTP ${response.status}`);
    if (!response.ok) throw new Error(`IndexNow rejected batch ${index + 1}: HTTP ${response.status}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
