/**
 * Chrome's network Google voices stop a single utterance after about fifteen
 * seconds, so they get short chunks. Every other voice reads whole sentences,
 * which keeps the intonation of a sentence intact instead of restarting mid-way.
 */
export const SHORT_CHUNK = 56;
export const SENTENCE_CHUNK = 180;

const SENTENCE_END = new Set(["。", "！", "？", "!", "?", "；", ";"]);
const CLAUSE_END = new Set(["，", ",", "、", "：", ":"]);

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
export function chunkSpeech(parts: string[], max = SHORT_CHUNK): string[] {
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
