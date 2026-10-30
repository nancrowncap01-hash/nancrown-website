import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createPayloads, main, parseSitemap } from "./indexnow-submit.mjs";

const sitemap = (entries) => `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
const entry = (location) => `<url><loc>${location}</loc></url>`;

test("sitemap reads locations, decodes XML/CDATA, ignores alternates and deduplicates", () => {
  const xml = sitemap(
    entry("https://nancrown.com/") + entry("https://nancrown.com/") +
    entry("https://nancrown.com/es/custom?a=1&amp;b=2") +
    entry("<![CDATA[https://nancrown.com/fr/custom?a=1&b=2]]>") +
    '<url><xhtml:link href="https://nancrown.com/de/" /></url>' +
    "<!-- <url><loc>https://other.example/</loc></url> -->",
  );
  assert.deepEqual(parseSitemap(xml), [
    "https://nancrown.com/",
    "https://nancrown.com/es/custom?a=1&b=2",
    "https://nancrown.com/fr/custom?a=1&b=2",
  ]);
});

test("sitemap rejects empty/index feeds and URLs outside the verified HTTPS host", () => {
  for (const xml of ["<sitemapindex/>", "<html/>", sitemap("")]) {
    assert.throws(() => parseSitemap(xml));
  }
  for (const url of ["https://other.example/", "http://nancrown.com/", "https://nancrown.com:8443/", "https://user@nancrown.com/", "https://nancrown.com/#anchor"]) {
    assert.throws(() => parseSitemap(sitemap(entry(url))));
  }
});

test("10001 sitemap URLs split into 10000 and 1, with the public verification key", async () => {
  const urls = Array.from({ length: 10001 }, (_, i) => `https://nancrown.com/page-${i}`);
  const payloads = createPayloads(parseSitemap(sitemap(urls.map(entry).join(""))));
  assert.deepEqual(payloads.map((payload) => payload.urlList.length), [10000, 1]);
  assert.deepEqual(payloads.flatMap((payload) => payload.urlList), urls);
  const payload = payloads[0];
  assert.equal(payload.host, "nancrown.com");
  assert.match(payload.key, /^[a-f0-9]{32}$/);
  assert.equal(payload.keyLocation, `https://nancrown.com/${payload.key}.txt`);
  const keyFile = new URL(`../public/${payload.key}.txt`, import.meta.url);
  assert.equal((await readFile(keyFile, "utf8")).trim(), payload.key);
});

test("dry-run fetches sitemap once and never posts", async () => {
  const calls = [];
  await main(["--dry-run"], async (url, options) => {
    calls.push({ url, options });
    return new Response(sitemap(entry("https://nancrown.com/")), { status: 200 });
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://nancrown.com/sitemap.xml");
  assert.equal(calls[0].options.method, undefined);
  await assert.rejects(main(["--sitemap-file", "/unused"], () => {
    assert.fail("Local submission must fail before any request");
  }), /requires --dry-run/);
});

test("submission logs mocked HTTP status codes and rejects failure responses", async () => {
  for (const status of [200, 202, 400, 429, 500]) {
    const calls = [];
    const request = async (url, options) => {
      calls.push({ url, options });
      return calls.length === 1
        ? new Response(sitemap(entry("https://nancrown.com/")), { status: 200 })
        : new Response("", { status });
    };
    if (status < 300) await main([], request);
    else await assert.rejects(main([], request), new RegExp(`HTTP ${status}`));
    assert.equal(calls[1].url, "https://api.indexnow.org/indexnow");
    assert.equal(calls[1].options.method, "POST");
    assert.deepEqual(JSON.parse(calls[1].options.body).urlList, ["https://nancrown.com/"]);
  }
});

test("HTML audit counts source pages once, excludes metadata/locales/self, and follows shortest paths", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "nancrown-link-audit-"));
  try {
    await mkdir(path.join(directory, "en"));
    await mkdir(path.join(directory, "es"));
    await writeFile(path.join(directory, "en.html"), `
      <link rel="canonical" href="https://nancrown.com/unreachable">
      <script>const fake='<a href="/unreachable">Ignore</a>';</script>
      <a href="/one">One</a><a href="/one?q=duplicate#anchor">Again</a>
      <a href="/es/one">Spanish</a><a href="https://elsewhere.example/one">External</a>
    `);
    await writeFile(path.join(directory, "en/home-b.html"), '<a href="/two">Two directly</a>');
    await writeFile(path.join(directory, "en/one.html"), '<a href="/two">Two</a><a href="/one">Self</a>');
    await writeFile(path.join(directory, "en/two.html"), '<a href="/one">One</a>');
    await writeFile(path.join(directory, "en/unreachable.html"), "<p>No links</p>");
    await writeFile(path.join(directory, "es/one.html"), '<a href="/unreachable">Exclude</a>');
    const auditScript = new URL("./internal-link-audit.mjs", import.meta.url);
    const run = (variant) => JSON.parse(execFileSync(process.execPath, [fileURLToPath(auditScript), "--build-dir", directory, "--home-variant", variant], { encoding: "utf8" }));
    const a = run("a");
    const page = (report, suffix) => report.pages.find((row) => row.url === `https://nancrown.com${suffix}`);
    assert.equal(a.pageCount, 4);
    assert.equal(page(a, "/one").inboundSourceCount, 2);
    assert.deepEqual(page(a, "/one").inboundSources, ["/", "/two"]);
    assert.equal(page(a, "/one").clicksFromHome, 1);
    assert.equal(page(a, "/two").clicksFromHome, 2);
    assert.equal(page(a, "/unreachable").clicksFromHome, null);
    assert.equal(page(a, "/unreachable").inboundSourceCount, 0);
    const b = run("b");
    assert.equal(page(b, "/two").clicksFromHome, 1);
    assert.equal(page(b, "/one").clicksFromHome, 2);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
