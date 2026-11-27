import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { extractBlogFaq, getBlogPosts, getMoreBlogPosts } from "../src/lib/blog.ts";
import { generateLlmsBlog, updateBlogList } from "./gen-llms-blog.mjs";

function component(relativePath, overrides) {
  const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const require = createRequire(import.meta.url);
  const context = { exports: {}, require: (name) => overrides[name] ?? require(name) };
  vm.runInNewContext(code, context);
  return context.exports;
}

test("JSON-LD renders exact FAQ text and omits FAQPage for absent FAQs or the blog index", () => {
  const { BlogJsonLd } = component("../src/components/seo/BlogJsonLd.tsx", {
    "@/lib/blog-seo": { BLOG_TITLE: "Blog", BLOG_DESCRIPTION: "Blog" },
    "@/lib/seo": { DEFAULT_OG_IMAGE: "/og.png", SITE_URL: "https://nancrown.com", localizedUrl: (_, url) => `https://nancrown.com${url}` },
  });
  const post = getBlogPosts()[0];
  const data = (post) => Array.from(
    renderToStaticMarkup(createElement(BlogJsonLd, { post })).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
    (match) => JSON.parse(match[1]),
  );
  const faq = data(post).find((item) => item["@type"] === "FAQPage");
  assert.deepEqual(faq.mainEntity.map((item) => ({ question: item.name, answer: item.acceptedAnswer.text })), post.faq);
  assert.ok(faq.mainEntity.every((item) => item["@type"] === "Question" && item.acceptedAnswer["@type"] === "Answer"));
  assert.ok(data({ ...post, faq: [] }).every((item) => item["@type"] !== "FAQPage"));
  assert.ok(data(undefined).every((item) => item["@type"] !== "FAQPage"));
  const unsafe = { ...post, faq: [{ question: "Literal </script>?", answer: "Keep </script> as visible text." }] };
  assert.equal(data(unsafe).find((item) => item["@type"] === "FAQPage").mainEntity[0].name, unsafe.faq[0].question);
});

test("More guides component renders titles/descriptions with an accessible heading and hides empty lists", () => {
  const { default: RelatedGuides } = component("../src/components/RelatedGuides.tsx", {
    "@/lib/blog": { getRelatedBlogPosts: () => [] },
    "next/link": ({ href, children, ...props }) => createElement("a", { href, ...props }, children),
  });
  for (const post of getBlogPosts()) {
    const posts = getMoreBlogPosts(post);
    const html = renderToStaticMarkup(createElement(RelatedGuides, { locale: "en", posts, heading: "More guides", headingId: "more-guides-heading" }));
    assert.match(html, /<h2 id="more-guides-heading"[^>]*>More guides<\/h2>/);
    assert.match(html, /<nav aria-labelledby="more-guides-heading"/);
    assert.deepEqual(Array.from(html.matchAll(/<a href="([^"]+)"/g), (match) => match[1]), posts.map((item) => `/blog/${item.slug}`));
    assert.ok(!html.includes(`href="/blog/${post.slug}"`));
    assert.deepEqual(Array.from(html.matchAll(/<p\b[^>]*>(.*?)<\/p>/g), (match) => match[1]), posts.map((item) => renderToStaticMarkup(item.meta_description)));
  }
  assert.equal(renderToStaticMarkup(createElement(RelatedGuides, { locale: "en", posts: [] })), "");
  assert.equal(renderToStaticMarkup(createElement(RelatedGuides, { locale: "es", posts: getBlogPosts() })), "");
});

test("FAQ follows rendered Markdown, decodes entities, keeps link labels and stops at headings", () => {
  const body = `## Before
### Ignore me
Outside.
## fAq
### **Can I use a [label](/contact) &amp; code?**
Yes, use *text*, \`code\` and <b>inline HTML</b> &copy; &#8212; &#x1F9E2;.

- First [reference][guide]
- Second ~~option~~

\`\`\`text
### Not a question
\`\`\`

### Next?
Another paragraph.  
A new line.
## End
### Not FAQ
Exclude this.

[guide]: /pricing
`;
  assert.deepEqual(extractBlogFaq(body), [
    {
      question: "Can I use a label & code?",
      answer: "Yes, use text, code and inline HTML © — 🧢. First reference Second option ### Not a question",
    },
    { question: "Next?", answer: "Another paragraph. A new line." },
  ]);
  assert.deepEqual(extractBlogFaq("## Frequently asked questions\n### Why?\nBecause.\n## Other\nStop."), [{ question: "Why?", answer: "Because." }]);
  assert.deepEqual(extractBlogFaq("## FAQ\n### Last?\nAnswer.\n\nReady? [Contact us](/contact) today."), [{ question: "Last?", answer: "Answer." }]);
  assert.deepEqual(extractBlogFaq("## Guide\n### Why?\nBecause."), []);
  assert.deepEqual(extractBlogFaq("## FAQ\n### Empty?\n## End"), []);
  assert.deepEqual(extractBlogFaq("## FAQ\n### Hidden?\n<div>Hidden by the page renderer</div>"), []);
  assert.deepEqual(extractBlogFaq(`## FAQ
### Entities &amp; formatting?
&lt;literal&gt; &quot;quotes&quot; &#39;apostrophe&#39; &nbsp; &#65; &#x1F9E2;.

Next **para**graph with [link *label*](/contact).

- First item
- Second item
`), [{
    question: "Entities & formatting?",
    answer: '<literal> "quotes" \'apostrophe\' A 🧢. Next paragraph with link label. First item Second item',
  }]);
});

test("published repository posts expose four FAQs each and drop the trailing contact CTA from the last answer", () => {
  const posts = getBlogPosts();
  assert.equal(posts.length, 4);
  assert.ok(posts.every((post) => post.faq.length === 4));
  const techPack = posts.find((post) => post.slug === "hat-tech-pack-checklist");
  assert.equal(techPack.faq[3].answer, "Yes. Record agreed changes and keep the approved artwork and specifications together so the production reference reflects the final decision.");
  assert.ok(posts.every((post) => !/contact/i.test(post.faq[3].answer)));
});

test("More guides ranks overlap before date, fills with latest posts and excludes drafts/self", () => {
  const post = (slug, date, links, status = "published") => ({ slug, date_published: date, internal_links: links, status });
  const current = post("self", "2026-11-27", ["/contact", "/pricing"]);
  const candidates = [
    current,
    post("draft", "2026-11-28", ["/contact", "/pricing"], "审过-可发"),
    post("latest-no-overlap", "2026-11-26", []),
    post("older-one", "2026-11-20", ["/contact"]),
    post("newer-one", "2026-11-24", ["/pricing", "/pricing"]),
    post("oldest-two", "2026-11-18", ["/contact", "/pricing"]),
  ];
  assert.deepEqual(getMoreBlogPosts(current, candidates).map((p) => p.slug), ["oldest-two", "newer-one", "older-one"]);
  assert.deepEqual(getMoreBlogPosts(current, candidates.slice(0, 4)).map((p) => p.slug), ["older-one", "latest-no-overlap"]);
  assert.deepEqual(getMoreBlogPosts(current, [current]), []);
  assert.deepEqual(getMoreBlogPosts(current, [current, post("z", "2026-11-24", []), post("a", "2026-11-25", [])]).map((p) => p.slug), ["a", "z"]);
});

test("llms generation excludes drafts/README, sorts dates, preserves outside bytes and is idempotent", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "nancrown-blog-list-"));
  const originals = {
    "llms.txt": "# Keep  spaces\r\n\r\n## Blog\r\n\r\nOriginal: https://nancrown.com/blog\r\n\r\n## Other\r\n保留原文\r\n",
    "llms-full.txt": "# Full\nKeep trailing spaces  \nBlog: https://nancrown.com/blog — Original summary.\n\nFooter untouched.\n",
  };
  const markerBlock = /<!-- BEGIN:blog-list -->\r?\n[\s\S]*?<!-- END:blog-list -->\r?\n/;
  try {
    await mkdir(path.join(root, "content/blog"), { recursive: true });
    await mkdir(path.join(root, "public"));
    const article = (slug, date, status) => `---\ntitle: "Title ${slug}"\nslug: ${slug}\nmeta_description: 'Description ${slug}'\ndate_published: ${date}\nstatus: ${status}\n---\nBody is not metadata.\n`;
    for (const [filename, source] of Object.entries(originals)) await writeFile(path.join(root, "public", filename), source);
    for (const [slug, date, status] of [["older", "2026-11-20", "published"], ["newer", "2026-11-27", '"published"'], ["draft", "2026-11-28", "审过-可发"]]) {
      await writeFile(path.join(root, "content/blog", `${slug}.md`), article(slug, date, status));
    }
    await writeFile(path.join(root, "content/blog/README.md"), article("README", "2026-11-29", "published"));
    assert.deepEqual(await generateLlmsBlog(root), { posts: 2, changed: 2 });
    const first = {};
    for (const [filename, original] of Object.entries(originals)) {
      first[filename] = await readFile(path.join(root, "public", filename), "utf8");
      assert.equal(first[filename].replace(markerBlock, ""), original);
      assert.ok(first[filename].indexOf("/blog/newer") < first[filename].indexOf("/blog/older"));
      assert.doesNotMatch(first[filename], /draft|审过-可发|README/);
      assert.match(first[filename], /- \[Title newer\]\(https:\/\/nancrown.com\/blog\/newer\): Description newer/);
    }
    assert.deepEqual(await generateLlmsBlog(root), { posts: 2, changed: 0 });
    for (const filename of Object.keys(originals)) assert.equal(await readFile(path.join(root, "public", filename), "utf8"), first[filename]);

    // Later runs replace only marker contents, even with an empty article list.
    for (const filename of Object.keys(originals)) {
      const updated = updateBlogList(first[filename], [], filename);
      assert.equal(updated.replace(markerBlock, ""), originals[filename]);
      assert.doesNotMatch(updated, /Title newer|Title older/);
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("llms fails safely for malformed markers or missing Blog anchors", () => {
  for (const source of ["<!-- BEGIN:blog-list -->", "<!-- END:blog-list -->", "<!-- END:blog-list --><!-- BEGIN:blog-list -->", "<!-- BEGIN:blog-list --><!-- BEGIN:blog-list --><!-- END:blog-list -->"]) {
    assert.throws(() => updateBlogList(source, [], "llms.txt"), /markers/);
  }
  assert.throws(() => updateBlogList("# Missing", [], "llms.txt"), /Missing Blog/);
  assert.throws(() => updateBlogList("## Blog\nNo intro\n## Other\nhttps://nancrown.com/blog\n", [], "llms.txt"), /Missing Blog/);
});
