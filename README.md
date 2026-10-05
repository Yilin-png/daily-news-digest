# 水中月｜聚合新闻

按日期归档的中文新闻聚合网站。目前收录 2026-09-24 至 2026-10-03 十期：财新、FT、华尔街日报、Bloomberg、经济学人、纽约时报、端传媒、The Information 八家媒体各 3 篇，每期 24 条深度总结，每篇附原站链接。往期不会被覆盖。页面默认跟随北京的日出与日落，在浅色与暖深色之间切换。顶栏开关可以固定为浅色或深色。

## 功能

- 主页 `/`：水中月动态画面，以及「阅读最新一期」「进入知识库」两个入口
- 检索 `/search`：按问题找出相关词条和报道，整理成带知识库链接的说明。对得上材料时，由 Cloudflare Workers AI 重写这段说明
- 每期 `/d/yyyy-mm-dd`：刊头、日期下拉切换、头条及「峰会 · 多方视角」专题、全部新闻、原站链接索引
- 全部新闻支持按来源、主题筛选和全文关键词搜索（来源筛选同步到 `?source=` 参数，可直接分享）
- 文章页：完整摘要、原文跳转、上一篇/下一篇、同源其他报道、同主题跨媒体相关报道
- 每篇附深度学习：历史背景、时间线、术语解释，并与概念页双向链接
- 适配桌面与移动端

## 技术栈

Next.js（App Router）· TypeScript · Tailwind CSS · shadcn/ui。每一期放在 `src/lib/editions/yyyy-mm-dd.ts`，并在 `src/lib/news.ts` 的 `editions` 列表里登记。新的一天是新增一期，已有日期保持不动。

## 本地运行

```bash
npm install
npm run dev      # http://localhost:4317
```

生产构建：

```bash
npm run build    # 静态导出到 out/
```

`.github/workflows/deploy.yml` 会在推送到 `main` 时，用仓库密钥 `CLOUDFLARE_API_TOKEN` 与 `CLOUDFLARE_ACCOUNT_ID` 自动构建并部署到 Cloudflare Worker `daily-news-digest`。发布前会核对账号 `e92e65d94443672fda698d100337efcf`，对不上就停止，不会发到别的账号。令牌在 https://dash.cloudflare.com/profile/api-tokens 用「Edit Cloudflare Workers」模板创建，名称为 `daily-news-digest-github`。不要把密钥写进代码。该工作流文件需要 GitHub 令牌具备 `workflow` 权限才能推送。

本地手动部署：

```bash
npm run build
npx wrangler login
npx wrangler deploy
```
