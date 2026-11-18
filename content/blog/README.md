# Blog 发布格式

每篇英文文章使用 `content/blog/<slug>.md`。本 README 会被读取器忽略。

```markdown
---
title: "Example article title"
slug: example-article
meta_description: "A short English search description."
date_published: 2026-11-18
date_modified: 2026-11-18
internal_links: ["/custom/trucker-hats", "/pricing", "/contact"]
status: published
---

# Example article title

Opening paragraph with a [pricing link](/pricing).

## Section title

- A useful point.
```

## 给自动发布脚本的步骤

1. 生成英文正文和唯一 slug（小写字母、数字、单连字符），写入同名 `.md` 文件，使用 UTF-8。
2. 写齐以上 YAML 字段。标量只能占一行；含特殊字符的文本建议用 JSON 双引号字符串（可用 `JSON.stringify`）。`internal_links` 使用 JSON 字符串数组，也支持缩进的 YAML `- /path` 列表；空列表写 `[]`。日期用有效的 `YYYY-MM-DD`，更新日期不得早于发布日期。
3. 待审文章设 `status: draft`，审核通过后改为精确的 `status: published`。只有此状态会进入列表、详情、静态参数及 sitemap；缺状态、其他状态和无 YAML 头的文件均忽略。已发布文章字段错误会使构建失败，避免错误内容上线。
4. 正文可选首行 H1，但必须与 `title` 完全一致；页面渲染时复用标题，只输出一个 H1。正文其他标题从 H2 开始。支持段落、列表、表格等 Markdown；以 `/` 开头的站内链接直接输出普通 `a` 标签。Markdown 仅接受仓库内可信内容，不接受访客提交的 HTML。
5. 修改文章时同步更新 `date_modified`。列表按 `date_published` 倒序排列，同日按 slug 排序。`/blog` 的 sitemap 更新时间取所有已发布文章中最新的 `date_modified`。
6. 运行 `npm run build` 和 `npm run lint`；核验 `/blog/<slug>`、canonical、BlogPosting、`sitemap.xml`。按主脑的审核与发布流程处理，脚本不应自行 commit、push 或部署。

无需手动登记路由或 sitemap。Blog 只有英文 `/blog` 与 `/blog/<slug>`，`/es/blog`、`/fr/blog`、`/de/blog` 及其详情页返回 404。

YAML 解析器不支持多行标量、嵌套对象、锚点等复杂语法，不要从草稿复制 `facts_used`、`need_from_boss`、`target_question`。
