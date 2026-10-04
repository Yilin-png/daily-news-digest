import { parseModelJson, sanitizeBrief, type ModelPacket } from "../src/lib/search-brief";

interface Env {
  AI: {
    run(
      model: string,
      input: { messages: { role: string; content: string }[]; max_tokens?: number },
    ): Promise<{ response?: string; choices?: { message?: { content?: string } }[] }>;
  };
  ASSETS: { fetch(input: Request): Promise<Response> };
}

const MODEL = "@cf/qwen/qwen3-30b-a3b-fp8";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function clip(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function readPacket(raw: unknown): ModelPacket | null {
  if (!raw || typeof raw !== "object") return null;
  const body = raw as Partial<ModelPacket>;
  const query = clip(body.query, 80);
  if (query.length < 2) return null;
  const concepts = Array.isArray(body.concepts)
    ? body.concepts.slice(0, 5).flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const id = clip((item as { id?: unknown }).id, 80);
        const name = clip((item as { name?: unknown }).name, 40);
        const summary = clip((item as { summary?: unknown }).summary, 240);
        if (!/^[a-z0-9-]+$/.test(id) || !name || !summary) return [];
        return [{ id, name, summary }];
      })
    : [];
  const articles = Array.isArray(body.articles)
    ? body.articles.slice(0, 4).flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const date = clip((item as { date?: unknown }).date, 10);
        const id = clip((item as { id?: unknown }).id, 8);
        const title = clip((item as { title?: unknown }).title, 80);
        const excerpt = clip((item as { excerpt?: unknown }).excerpt, 180);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d+$/.test(id) || !title || !excerpt) return [];
        return [{ date, id, title, excerpt }];
      })
    : [];
  if (concepts.length + articles.length === 0) return null;
  return { query, concepts, articles };
}

function prompt(packet: ModelPacket): string {
  const concepts = packet.concepts
    .map((item) => `- id=${item.id} 名称=${item.name} 摘要=${item.summary}`)
    .join("\n");
  const articles = packet.articles
    .map((item) => `- ${item.date}《${item.title}》：${item.excerpt}`)
    .join("\n");
  return `问题：${packet.query}

可用词条（链接时只能用这些 id）：
${concepts || "（无）"}

报道摘录：
${articles || "（无）"}

请把上面的材料整理成给读者的说明，不要逐条复述目录。
只使用摘录和摘要里已经写明的事实，不要补充数字、人名、步骤或方法。
不要写攻击、绕过、入侵或可复现的操作。
每段用 [[词条id|显示名]] 链到知识库，id 必须来自上面的词条。
用中文写 2 到 3 段，每段不超过 120 字。
只输出 JSON：{"title":"不超过20字","paragraphs":["段落"]}`;
}

async function rewrite(packet: ModelPacket, env: Env): Promise<Response> {
  const result = await env.AI.run(MODEL, {
    messages: [
      {
        role: "system",
        content: "你是新闻站的检索编辑。只输出一个 JSON 对象，不要输出思考过程。",
      },
      { role: "user", content: prompt(packet) },
    ],
    max_tokens: 900,
  });
  const text = result.choices?.[0]?.message?.content || result.response || "";
  const brief = sanitizeBrief(parseModelJson(text), packet.concepts.map((item) => item.id));
  if (!brief) return json({ error: "model" }, 502);
  return json(brief);
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/search") {
      if (request.method !== "POST") return json({ error: "method" }, 405);
      let raw: unknown;
      try {
        raw = await request.json();
      } catch {
        return json({ error: "json" }, 400);
      }
      const packet = readPacket(raw);
      if (!packet) return json({ error: "packet" }, 400);
      try {
        return await rewrite(packet, env);
      } catch {
        return json({ error: "model" }, 502);
      }
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
