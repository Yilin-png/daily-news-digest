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

function plain(text: string): string {
  return text.replace(/\[\[[a-z0-9-]+\|([^\]]+)\]\]/g, "$1");
}

function withOneLink(
  text: string,
  source: string,
  concepts: ModelPacket["concepts"],
): string {
  const ranked = [...concepts].sort((a, b) => b.name.length - a.name.length);
  for (const concept of ranked) {
    if (!source.includes(concept.name)) continue;
    const index = text.indexOf(concept.name);
    if (index < 0) continue;
    return `${text.slice(0, index)}[[${concept.id}|${concept.name}]]${text.slice(index + concept.name.length)}`;
  }
  return text;
}

function groundParagraph(paragraph: string, article: ModelPacket["articles"][number], concepts: ModelPacket["concepts"]): string {
  const source = `${article.title}\n${article.excerpt}`;
  let text = plain(paragraph);
  let rewrote = false;
  for (const concept of concepts) {
    if (concept.name.length < 2 || source.includes(concept.name) || !text.includes(concept.name)) continue;
    text = text.split(concept.name).join("");
    rewrote = true;
  }
  text = text.replace(/\s{2,}/g, " ").trim();
  const numbers = text.match(/\d+(?:\.\d+)?/g) ?? [];
  const invented = numbers.some((value) => value.length >= 2 && !source.includes(value));
  if (rewrote || invented || text.length < 8) text = article.excerpt;
  return withOneLink(text, source, concepts);
}

export function acceptBrief(raw: unknown, packet: ModelPacket): ModelBrief | null {
  const brief = sanitizeBrief(
    raw,
    packet.concepts.map((item) => item.id),
  );
  if (!brief || packet.articles.length === 0) return null;
  const paragraphs = packet.articles.map((article, index) =>
    groundParagraph(brief.paragraphs[index] ?? article.excerpt, article, packet.concepts),
  );
  if (!paragraphs.some((paragraph) => /\[\[[a-z0-9-]+\|/.test(paragraph))) return null;
  return { title: brief.title, paragraphs };
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
