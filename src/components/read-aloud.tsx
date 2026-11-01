"use client";

import { useEffect, useId, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { PauseIcon, PlayIcon, SquareIcon, Volume2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SENTENCE_CHUNK, SHORT_CHUNK, chunkSpeech } from "@/lib/speech-chunk";

type Track = "article" | "study";
type Phase = "idle" | "speaking" | "paused";

type Snapshot = {
  articleKey: string | null;
  track: Track | null;
  phase: Phase;
  index: number;
  total: number;
  notice: string | null;
};

const IDLE: Snapshot = {
  articleKey: null,
  track: null,
  phase: "idle",
  index: 0,
  total: 0,
  notice: null,
};

const NO_VOICE = "没有找到中文语音。请安装中文（zh-CN）语音，或改用 Chrome、Edge、Safari。";
const UNSUPPORTED = "当前浏览器不支持语音朗读。";
const FAILED = "朗读没有开始。请再点一次；若仍无声音，请换一个带中文语音的浏览器。";
const BLOCKED = "浏览器拦截了语音。请再点一次「朗读」，需要你的点击才会出声。";

let snapshot: Snapshot = IDLE;
const listeners = new Set<() => void>();
let session = 0;
let utteranceGen = 0;
let queue: string[] = [];
let parts: string[] = [];
let activeVoice: SpeechSynthesisVoice | null = null;
let pausedByUser = false;
let hooksBound = false;
let detachVoices: (() => void) | null = null;

function clearVoiceWait() {
  detachVoices?.();
  detachVoices = null;
}

function emit(next: Snapshot) {
  snapshot = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return IDLE;
}

function synthOrNull(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return null;
  return window.speechSynthesis;
}

export type VoiceOption = { id: string; label: string; rank: number; quality: number };
type VoiceList = { options: VoiceOption[]; selected: string | null; bestQuality: number };

const VOICE_KEY = "read-aloud-voice";
const NO_VOICES: VoiceList = { options: [], selected: null, bestQuality: 0 };
let voiceList: VoiceList = NO_VOICES;
let voiceKey = "";
let preferredLoaded = false;
const voiceListeners = new Set<() => void>();

function voiceId(voice: SpeechSynthesisVoice): string {
  return voice.voiceURI || voice.name;
}

/** Higher is closer to Mainland Mandarin; 0 means not a Chinese voice. */
function langTier(voice: SpeechSynthesisVoice): number {
  const lang = voice.lang.toLowerCase().replace(/_/g, "-");
  const name = voice.name.toLowerCase();
  if (/^(zh-cn|cmn-hans|zh-hans|cmn-cn)/.test(lang) || lang === "zh" || lang === "cmn") return 4;
  if (/^(zh-hk|zh-yue|yue)/.test(lang) || /cantonese|粤/.test(name)) return 1;
  if (lang.startsWith("zh") || lang.startsWith("cmn")) return 2;
  if (/chinese|中文|普通话|mandarin/.test(name)) return 2;
  return 0;
}

/** Rough naturalness of the voice, judged from how browsers name their neural voices. */
function voiceQuality(voice: SpeechSynthesisVoice): number {
  const name = voice.name.toLowerCase();
  if (/natural|neural/.test(name)) return 9; // Edge: "Microsoft Xiaoxiao Online (Natural)"
  if (/premium|优化/.test(name)) return 8; // Apple downloadable premium voices
  if (/xiaoxiao|xiaoyi|xiaochen|xiaohan|xiaomo|xiaorui|yunxi|yunjian|yunyang/.test(name)) return 7;
  if (/online/.test(name)) return 7;
  if (/enhanced|增强/.test(name)) return 6;
  if (/google/.test(name)) return 5;
  if (/huihui|kangkang|yaoyao|compact|espeak|eloquence/.test(name)) return 1; // old SAPI / robotic engines
  return 3;
}

function voiceLabel(voice: SpeechSynthesisVoice, tier: number, quality: number): string {
  let name = voice.name
    .replace(/^microsoft\s+/i, "")
    .replace(/\s+online\s*\(natural\)/i, "")
    .replace(/\s*-\s*chinese.*$/i, "")
    .replace(/\s*\((enhanced|premium)\)/i, "")
    .trim();
  if (!name) name = voice.name;
  const tags: string[] = [];
  if (quality >= 6) tags.push("自然");
  if (tier < 4) tags.push(voice.lang);
  return tags.length > 0 ? `${name}（${tags.join("，")}）` : name;
}

function readPreferred(): string | null {
  try {
    return localStorage.getItem(VOICE_KEY);
  } catch {
    return null;
  }
}

function writePreferred(id: string | null) {
  try {
    if (id) localStorage.setItem(VOICE_KEY, id);
    else localStorage.removeItem(VOICE_KEY);
  } catch {
    /* private mode */
  }
}

function emitVoices(next: VoiceList) {
  voiceList = next;
  for (const listener of voiceListeners) listener();
}

function refreshVoices() {
  const synth = synthOrNull();
  if (!synth) return;
  const selected = preferredLoaded ? voiceList.selected : readPreferred();
  preferredLoaded = true;
  const options = synth
    .getVoices()
    .flatMap((voice) => {
      const tier = langTier(voice);
      if (tier === 0) return [];
      const quality = voiceQuality(voice);
      const rank = tier * 10 + quality + (voice.default ? 0.5 : 0);
      return [{ id: voiceId(voice), label: voiceLabel(voice, tier, quality), rank, quality }];
    })
    .sort((x, y) => y.rank - x.rank);
  const key = `${selected ?? ""}|${options.map((option) => option.id).join("|")}`;
  if (key === voiceKey) return;
  voiceKey = key;
  const bestQuality = options.reduce((best, option) => Math.max(best, option.quality), 0);
  emitVoices({ options, selected, bestQuality });
}

function subscribeVoices(listener: () => void) {
  voiceListeners.add(listener);
  return () => voiceListeners.delete(listener);
}

function getVoices() {
  return voiceList;
}

function getServerVoices() {
  return NO_VOICES;
}

/** The voice the reader picked, or else the most natural Mandarin voice available. */
function pickVoice(): SpeechSynthesisVoice | null {
  const synth = synthOrNull();
  if (!synth) return null;
  const voices = synth.getVoices();
  const wanted = voiceList.selected;
  if (wanted) {
    const chosen = voices.find((voice) => voiceId(voice) === wanted);
    if (chosen) return chosen;
  }
  let best: SpeechSynthesisVoice | null = null;
  let bestRank = 0;
  for (const voice of voices) {
    const tier = langTier(voice);
    if (tier === 0) continue;
    const rank = tier * 10 + voiceQuality(voice) + (voice.default ? 0.5 : 0);
    if (rank > bestRank) {
      best = voice;
      bestRank = rank;
    }
  }
  return best;
}

function chunkLimit(voice: SpeechSynthesisVoice | null): number {
  if (!voice) return SHORT_CHUNK;
  if (!voice.localService && /google/i.test(voice.name)) return SHORT_CHUNK;
  return SENTENCE_CHUNK;
}

function invalidate() {
  session += 1;
  utteranceGen += 1;
  pausedByUser = false;
  queue = [];
  parts = [];
  activeVoice = null;
  clearVoiceWait();
}

function halt(notice: string | null) {
  invalidate();
  synthOrNull()?.cancel();
  emit(notice ? { ...IDLE, notice } : IDLE);
}

function stopIfArticle(articleKey: string) {
  if (snapshot.articleKey === articleKey) halt(null);
}

function bindHooks() {
  if (hooksBound || typeof window === "undefined") return;
  hooksBound = true;
  window.addEventListener("pagehide", () => halt(null));
}

function speakAt(token: number, index: number) {
  const synth = synthOrNull();
  if (!synth || token !== session) return;
  if (index >= queue.length) {
    halt(null);
    return;
  }

  const gen = ++utteranceGen;
  const utterance = new SpeechSynthesisUtterance(queue[index]);
  const voice = activeVoice ?? pickVoice();
  utterance.lang = voice?.lang || "zh-CN";
  utterance.rate = 1;
  if (voice) utterance.voice = voice;

  let started = false;
  utterance.onstart = () => {
    started = true;
  };
  utterance.onend = () => {
    if (token !== session || gen !== utteranceGen || pausedByUser || snapshot.phase === "paused") return;
    const next = index + 1;
    if (next >= queue.length) {
      halt(null);
      return;
    }
    emit({ ...snapshot, index: next, phase: "speaking" });
    speakAt(token, next);
  };
  utterance.onerror = (event) => {
    if (token !== session || gen !== utteranceGen || pausedByUser) return;
    if (event.error === "interrupted" || event.error === "canceled") return;
    if (event.error === "not-allowed") {
      halt(BLOCKED);
      return;
    }
    if (
      event.error === "language-unavailable" ||
      event.error === "voice-unavailable" ||
      event.error === "synthesis-failed"
    ) {
      const voices = synth.getVoices();
      halt(voices.length === 0 || !pickVoice() ? NO_VOICE : FAILED);
      return;
    }
    halt(FAILED);
  };

  emit({ ...snapshot, index, phase: "speaking" });
  try {
    synth.speak(utterance);
  } catch {
    halt(FAILED);
    return;
  }

  if (index !== 0) return;
  window.setTimeout(() => {
    if (token !== session || gen !== utteranceGen || pausedByUser) return;
    if (started || synth.speaking || synth.pending || snapshot.phase !== "speaking") return;
    const voices = synth.getVoices();
    halt(voices.length === 0 || !pickVoice() ? NO_VOICE : FAILED);
  }, 1200);
}

function begin(articleKey: string, track: Track, source: string[]) {
  const synth = synthOrNull();
  if (!synth) {
    emit({ ...IDLE, notice: UNSUPPORTED });
    return;
  }
  bindHooks();

  const wasBusy = synth.speaking || synth.pending || snapshot.phase !== "idle";
  invalidate();
  if (wasBusy) synth.cancel();

  const text = source.map((part) => part.trim()).filter(Boolean);
  if (text.length === 0) {
    emit(IDLE);
    return;
  }

  const token = session;
  const launch = () => {
    if (token !== session) return;
    refreshVoices();
    const voice = pickVoice();
    if (!voice) {
      emit({ ...IDLE, notice: NO_VOICE });
      return;
    }
    parts = text;
    activeVoice = voice;
    queue = chunkSpeech(text, chunkLimit(voice));
    emit({
      articleKey,
      track,
      phase: "speaking",
      index: 0,
      total: queue.length,
      notice: null,
    });
    const start = () => {
      if (token !== session) return;
      speakAt(token, 0);
    };
    // Chrome ignores speak() in the same turn as cancel().
    if (wasBusy) window.setTimeout(start, 50);
    else start();
  };

  if (synth.getVoices().length > 0) {
    launch();
    return;
  }

  // Chrome often fills getVoices() only after voiceschanged. Wait briefly, still
  // inside the click's user-activation window, before deciding there is no voice.
  let settled = false;
  const timer = window.setTimeout(() => {
    if (settled) return;
    settled = true;
    clearVoiceWait();
    launch();
  }, 400);
  const onVoices = () => {
    if (settled || synth.getVoices().length === 0) return;
    settled = true;
    window.clearTimeout(timer);
    clearVoiceWait();
    launch();
  };
  synth.addEventListener("voiceschanged", onVoices);
  detachVoices = () => {
    window.clearTimeout(timer);
    synth.removeEventListener("voiceschanged", onVoices);
  };
}

function pause() {
  const synth = synthOrNull();
  if (!synth || snapshot.phase !== "speaking") return;
  pausedByUser = true;
  emit({ ...snapshot, phase: "paused" });
  synth.pause();
}

function resume() {
  const synth = synthOrNull();
  if (!synth || snapshot.phase !== "paused") return;
  pausedByUser = false;
  synth.resume();
  emit({ ...snapshot, phase: "speaking" });
  const token = session;
  const index = snapshot.index;
  const gen = utteranceGen;
  window.setTimeout(() => {
    if (token !== session || snapshot.phase !== "speaking" || utteranceGen !== gen) return;
    if (synth.speaking && !synth.paused) return;
    utteranceGen += 1;
    synth.cancel();
    window.setTimeout(() => {
      if (token !== session) return;
      speakAt(token, index);
    }, 50);
  }, 250);
}

/** Switch voice; if something is being read, carry on from the same spot in the new voice. */
function chooseVoice(id: string | null) {
  writePreferred(id);
  voiceKey = "";
  emitVoices({ ...voiceList, selected: id });
  refreshVoices();

  const synth = synthOrNull();
  if (!synth || snapshot.phase === "idle" || parts.length === 0) return;
  const voice = pickVoice();
  if (!voice) return;

  let offset = 0;
  for (let i = 0; i < snapshot.index && i < queue.length; i += 1) offset += queue[i].length;
  const next = chunkSpeech(parts, chunkLimit(voice));
  let index = 0;
  for (let seen = 0; index < next.length - 1; index += 1) {
    if (seen + next[index].length > offset) break;
    seen += next[index].length;
  }

  utteranceGen += 1;
  synth.cancel();
  activeVoice = voice;
  queue = next;
  if (snapshot.phase === "paused") {
    // resume() notices nothing is queued and restarts from this index.
    emit({ ...snapshot, index, total: next.length });
    return;
  }
  emit({ ...snapshot, index, total: next.length, phase: "speaking" });
  const token = session;
  window.setTimeout(() => {
    if (token !== session) return;
    speakAt(token, index);
  }, 50);
}

function play(articleKey: string, track: Track, chunks: string[]) {
  if (snapshot.articleKey === articleKey && snapshot.track === track) {
    if (snapshot.phase === "speaking") {
      pause();
      return;
    }
    if (snapshot.phase === "paused") {
      resume();
      return;
    }
  }
  begin(articleKey, track, chunks);
}

function primeVoices() {
  refreshVoices();
}

export function ReadAloud({
  articleKey,
  articleParts,
  studyParts,
}: {
  articleKey: string;
  articleParts: string[];
  studyParts?: string[];
}) {
  const pathname = usePathname();
  const hintId = useId();
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const voices = useSyncExternalStore(subscribeVoices, getVoices, getServerVoices);
  const mine = snap.articleKey === articleKey;
  const articleOn = mine && snap.track === "article" && snap.phase !== "idle";
  const studyOn = mine && snap.track === "study" && snap.phase !== "idle";
  const busy = articleOn || studyOn;
  const hasStudy = !!studyParts && studyParts.length > 0;
  const voiceValue = voices.options.some((option) => option.id === voices.selected) ? (voices.selected ?? "") : "";
  const basicOnly = voices.options.length > 0 && voices.bestQuality < 5;

  useEffect(() => {
    bindHooks();
    primeVoices();
    const synth = synthOrNull();
    const onVoices = () => refreshVoices();
    synth?.addEventListener("voiceschanged", onVoices);
    return () => {
      synth?.removeEventListener("voiceschanged", onVoices);
      stopIfArticle(articleKey);
    };
  }, [articleKey, pathname]);

  const phaseText = busy
    ? snap.phase === "paused"
      ? "已暂停"
      : snap.track === "study"
        ? "正在朗读深度学习"
        : "正在朗读"
    : (snap.notice ?? "");

  return (
    <div className="mt-5" data-read-aloud={articleKey} data-phase={busy ? snap.phase : "idle"} data-track={busy ? snap.track ?? "" : ""}>
      <p id={hintId} className="sr-only">
        使用浏览器自带的中文语音。需要点击后才会出声。离开本页或打开另一篇时会停止。
      </p>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-describedby={hintId} aria-label="语音朗读">
        <SpeakButton
          active={articleOn}
          phase={articleOn ? snap.phase : "idle"}
          idle="朗读"
          idleLabel="朗读标题和正文"
          activeNoun="正文"
          onClick={() => play(articleKey, "article", articleParts)}
        />
        {hasStudy ? (
          <SpeakButton
            active={studyOn}
            phase={studyOn ? snap.phase : "idle"}
            idle="朗读深度学习"
            idleLabel="朗读深度学习"
            activeNoun="深度学习"
            onClick={() => play(articleKey, "study", studyParts ?? [])}
          />
        ) : null}
        {busy ? (
          <Button type="button" variant="outline" size="sm" aria-label="停止朗读" onClick={() => halt(null)}>
            <SquareIcon />
            停止
          </Button>
        ) : null}
        {voices.options.length > 1 ? (
          <label className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            声音
            <select
              className="h-7 max-w-[13rem] rounded-md border border-input bg-background px-1.5 text-xs text-foreground"
              value={voiceValue}
              onChange={(event) => chooseVoice(event.target.value || null)}
              data-read-aloud-voice
            >
              <option value="">自动 · {voices.options[0].label}</option>
              {voices.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <p className="sr-only" role="status">
          {phaseText}
        </p>
        {phaseText ? (
          <p className="text-xs leading-relaxed text-muted-foreground" data-read-aloud-notice aria-hidden>
            {busy && snap.total > 0 ? `${phaseText} · ${Math.min(snap.index + 1, snap.total)}/${snap.total}` : phaseText}
          </p>
        ) : null}
      </div>
      {busy && snap.total > 0 ? (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted" aria-hidden>
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-300"
            style={{ width: `${Math.max(6, Math.round(((snap.index + 1) / snap.total) * 100))}%` }}
          />
        </div>
      ) : null}
      {busy && basicOnly ? (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground" data-read-aloud-tip>
          这台设备只有基础中文语音，听起来会比较生硬。用 Edge 浏览器可以选「晓晓」等自然语音；Mac 或 iPhone 可以在系统设置里下载「优化」或「高级」版的中文语音。
        </p>
      ) : null}
    </div>
  );
}

function SpeakButton({
  active,
  phase,
  idle,
  idleLabel,
  activeNoun,
  onClick,
}: {
  active: boolean;
  phase: Phase;
  idle: string;
  idleLabel: string;
  activeNoun: string;
  onClick: () => void;
}) {
  const paused = active && phase === "paused";
  const speaking = active && phase === "speaking";
  const label = speaking ? "暂停" : paused ? "继续" : idle;
  const Icon = speaking ? PauseIcon : paused ? PlayIcon : Volume2Icon;
  const aria = speaking ? `暂停朗读${activeNoun}` : paused ? `继续朗读${activeNoun}` : idleLabel;

  return (
    <Button
      type="button"
      variant={active ? "default" : "outline"}
      size="sm"
      aria-pressed={active}
      aria-label={aria}
      onClick={onClick}
    >
      <Icon />
      {label}
    </Button>
  );
}
