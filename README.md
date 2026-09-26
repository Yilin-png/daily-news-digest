# 每日聚合新闻

2026-09-25（周五）一期的中文新闻聚合网站：财新、FT、华尔街日报、Bloomberg、经济学人、纽约时报、端传媒、The Information 八家媒体各 3 篇，共 24 条深度总结，每篇附原站链接。

## 功能

- 首页：刊头、「今日看点」导读、头条及「峰会 · 多方视角」专题、全部新闻、原站链接索引
- 全部新闻支持按来源、主题筛选和全文关键词搜索（来源筛选同步到 `?source=` 参数，可直接分享）
- 文章页：完整摘要、原文跳转、上一篇/下一篇、同源其他报道、同主题跨媒体相关报道
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

部署到 Cloudflare Workers（静态资源）：

```bash
npm run build
npx wrangler login          # 使用自己的 Cloudflare 账号
npx wrangler deploy
```

没有登录时可以用 `npx wrangler deploy --temporary`，Wrangler 会创建一个临时预览账号并给出认领链接。
