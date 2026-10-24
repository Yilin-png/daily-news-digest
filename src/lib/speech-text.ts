import { getConcept } from "@/lib/knowledge";
import type { Study } from "@/lib/study";

const LINK_RE = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;

/**
 * Chrome stops a single utterance after about fifteen seconds.
 * Keep each chunk short enough to finish inside that window.
 */
const MAX_CHARS = 56;

const SENTENCE_END = new Set(["。", "！", "？", "!", "?", "；", ";"]);
const CLAUSE_END = new Set(["，", ",", "、", "：", ":"]);

/** Drop wiki links, keeping the visible label or the concept name. */
export function plainSpeech(text: string): string {
  return text
    .replace(LINK_RE, (_match, id: string, label?: string) => {
      if (label?.trim()) return label.trim();
      return getConcept(id)?.name ?? "";
    })
    .replace(/\s+/g, " ")
    .trim();
}

function splitOn(text: string, marks: Set<string>): string[] {
  const parts: string[] = [];
  let buf = "";
  for (const ch of text) {
    buf += ch;
    if (!marks.has(ch)) continue;
    const piece = buf.trim();
    if (piece) parts.push(piece);
    buf = "";
  }
  const rest = buf.trim();
  if (rest) parts.push(rest);
  return parts.length > 0 ? parts : [text];
}

function pushPacked(chunks: string[], pieces: string[], max: number) {
  let buf = "";
  const flush = () => {
    const piece = buf.trim();
    if (piece) chunks.push(piece);
    buf = "";
  };
  for (const piece of pieces) {
    if (piece.length > max) {
      flush();
      for (let i = 0; i < piece.length; i += max) chunks.push(piece.slice(i, i + max));
      continue;
    }
    if (buf && buf.length + piece.length > max) flush();
    buf += piece;
  }
  flush();
}

/** Pack plain-text parts into short utterances, preferring sentence then clause breaks. */
export function chunkSpeech(parts: string[], max = MAX_CHARS): string[] {
  const chunks: string[] = [];
  for (const part of parts) {
    const text = part.replace(/\s+/g, " ").trim();
    if (!text) continue;
    const sentences = splitOn(text, SENTENCE_END);
    const pieces: string[] = [];
    for (const sentence of sentences) {
      if (sentence.length <= max) {
        pieces.push(sentence);
        continue;
      }
      pieces.push(...splitOn(sentence, CLAUSE_END));
    }
    pushPacked(chunks, pieces, max);
  }
  return chunks;
}

export function articleSpeechChunks(title: string, paragraphs: string[]): string[] {
  return chunkSpeech([plainSpeech(title), ...paragraphs.map(plainSpeech)]);
}

export function studySpeechChunks(study: Study): string[] {
  const parts: string[] = [];
  const background = study.background.map(plainSpeech).filter(Boolean);
  if (background.length > 0) {
    parts.push(`深度学习，历史背景。${background[0]}`, ...background.slice(1));
  } else {
    parts.push("深度学习。");
  }

  const timeline = study.timeline
    .map((item) => {
      const event = plainSpeech(item.event);
      return event ? `${item.time}。${event}` : item.time.trim();
    })
    .filter(Boolean);
  if (timeline.length > 0) parts.push(`来龙去脉。${timeline[0]}`, ...timeline.slice(1));

  const terms = study.terms.flatMap((id) => {
    const concept = getConcept(id);
    if (!concept) return [];
    return [`${concept.name}。${plainSpeech(concept.summary)}`];
  });
  if (terms.length > 0) parts.push(`关键术语。${terms[0]}`, ...terms.slice(1));

  const questions = study.questions.map(plainSpeech).filter(Boolean);
  if (questions.length > 0) {
    parts.push(
      `思考题。第1题。${questions[0]}`,
      ...questions.slice(1).map((question, index) => `第${index + 2}题。${question}`),
    );
  }

  return chunkSpeech(parts);
}
