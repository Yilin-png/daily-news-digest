# 每日聚合新闻

2026-09-26（周六）一期的中文新闻聚合网站：财新、FT、华尔街日报、Bloomberg、经济学人、纽约时报、端传媒、The Information 八家媒体各 3 篇，共 24 条深度总结，每篇附原站链接。

## 功能

- 首页：刊头、「今日看点」导读、头条及「峰会 · 多方视角」专题、全部新闻、原站链接索引
- 全部新闻支持按来源、主题筛选和全文关键词搜索（来源筛选同步到 `?source=` 参数，可直接分享）
- 文章页：完整摘要、原文跳转、上一篇/下一篇、同源其他报道、同主题跨媒体相关报道
- 每篇附深度学习：历史背景、时间线、术语解释，并与概念页双向链接
- 适配桌面与移动端

## 技术栈

Next.js（App Router）· TypeScript · Tailwind CSS · shadcn/ui。新闻内容保存在 `src/lib/news.ts`，更换每日内容时只需编辑这个文件。

## 本地运行

```bash
npm install
npm run dev      # http://localhost:4317
```

生产构建：

```bash
npm run build    # 静态导出到 out/
```

`.github/workflows/deploy.yml` 会在推送到 `main` 时，用仓库密钥 `CLOUDFLARE_API_TOKEN` 与 `CLOUDFLARE_ACCOUNT_ID` 自动构建并部署到 Cloudflare Workers。不要把密钥写进代码。该工作流文件需要 GitHub 令牌具备 `workflow` 权限才能推送。

本地手动部署：

```bash
npm run build
npx wrangler login
npx wrangler deploy
```
