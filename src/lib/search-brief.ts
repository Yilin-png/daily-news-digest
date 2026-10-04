/** Shared by the browser and the Worker. No site data imports. */

export type ModelPacket = {
  query: string;
  concepts: { id: string; name: string; summary: string }[];
  articles: { date: string; id: string; title: string; excerpt: string }[];
};

export type ModelBrief = {
  title: string;
  paragraphs: string[];
};

const LINK_RE = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;

export function sanitizeBrief(raw: unknown, allowedIds: Iterable<string>): ModelBrief | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as { title?: unknown; paragraphs?: unknown };
  const allowed = new Set(allowedIds);
  const title = typeof record.title === "string" ? record.title.replace(/\s+/g, " ").trim().slice(0, 42) : "";
  if (!Array.isArray(record.paragraphs)) return null;
  const paragraphs = record.paragraphs
    .filter((item): item is string => typeof item === "string")
    .map((item) =>
      item
        .replace(/<think>[\s\S]*?<\/think>/g, "")
        .replace(LINK_RE, (full, id: string, label?: string) => {
          if (!allowed.has(id)) return label?.trim() || "";
          const text = (label?.trim() || id).slice(0, 40);
          return `[[${id}|${text}]]`;
        })
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 420),
    )
    .filter((item) => item.length >= 8)
    .slice(0, 4);
  if (!title || paragraphs.length === 0) return null;
  return { title, paragraphs };
}

export function acceptBrief(raw: unknown, packet: ModelPacket): ModelBrief | null {
  const brief = sanitizeBrief(
    raw,
    packet.concepts.map((item) => item.id),
  );
  if (!brief) return null;
  const source = [
    packet.query,
    ...packet.concepts.map((item) => `${item.name}${item.summary}`),
    ...packet.articles.map((item) => `${item.title}${item.excerpt}`),
  ].join("\n");
  const numbers = brief.paragraphs.join("").match(/\d+(?:\.\d+)?/g) ?? [];
  if (numbers.some((value) => value.length >= 2 && !source.includes(value))) return null;
  if (packet.concepts.length > 0 && !brief.paragraphs.some((paragraph) => /\[\[[a-z0-9-]+\|/.test(paragraph))) {
    return null;
  }
  return brief;
}

export function parseModelJson(text: string): unknown {
  const cleaned = text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
  const fenced = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = fenced?.[1] ?? cleaned;
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(body.slice(start, end + 1));
  } catch {
    return null;
  }
}
