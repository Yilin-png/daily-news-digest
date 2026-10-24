"use client";

import { useEffect, useId, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { PauseIcon, PlayIcon, SquareIcon, Volume2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

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

function voiceScore(voice: SpeechSynthesisVoice): number {
  const lang = voice.lang.toLowerCase().replace(/_/g, "-");
  const name = voice.name.toLowerCase();
  let score = 100;
  if (lang === "zh-cn" || lang.startsWith("zh-cn-")) score = 0;
  else if (lang.startsWith("cmn-hans")) score = 1;
  else if (lang.startsWith("zh-hans")) score = 2;
  else if (lang.startsWith("zh") || lang.startsWith("cmn")) score = 4;
  else if (name.includes("chinese") || name.includes("中文") || name.includes("普通话")) score = 6;
  else return 100;
  if (name.includes("普通话") || /xiaoxiao|xiaoyi|yunxi|ting-ting|tingting|meijia/.test(name)) score -= 0.4;
  if (voice.default) score -= 0.1;
  return score;
}

function chineseVoice(): SpeechSynthesisVoice | null {
  const synth = synthOrNull();
  if (!synth) return null;
  let best: SpeechSynthesisVoice | null = null;
  let bestScore = 100;
  for (const voice of synth.getVoices()) {
    const score = voiceScore(voice);
    if (score < bestScore) {
      best = voice;
      bestScore = score;
    }
  }
  return best;
}

function invalidate() {
  session += 1;
  utteranceGen += 1;
  pausedByUser = false;
  queue = [];
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
  utterance.lang = "zh-CN";
  utterance.rate = 1;
  const voice = chineseVoice();
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
    if (event.error === "language-unavailable" || event.error === "voice-unavailable") {
      halt(NO_VOICE);
      return;
    }
    halt(FAILED);
  };

  emit({ ...snapshot, index, phase: "speaking" });
  synth.speak(utterance);

  if (index !== 0) return;
  window.setTimeout(() => {
    if (token !== session || gen !== utteranceGen || pausedByUser) return;
    if (started || synth.speaking || synth.pending || snapshot.phase !== "speaking") return;
    const voices = synth.getVoices();
    halt(voices.length === 0 || !chineseVoice() ? NO_VOICE : FAILED);
  }, 1200);
}

function begin(articleKey: string, track: Track, chunks: string[]) {
  const synth = synthOrNull();
  if (!synth) {
    emit({ ...IDLE, notice: UNSUPPORTED });
    return;
  }
  bindHooks();

  const wasBusy = synth.speaking || synth.pending || snapshot.phase !== "idle";
  invalidate();
  if (wasBusy) synth.cancel();

  const voices = synth.getVoices();
  if (voices.length > 0 && !chineseVoice()) {
    emit({ ...IDLE, notice: NO_VOICE });
    return;
  }

  queue = chunks.map((chunk) => chunk.trim()).filter(Boolean);
  if (queue.length === 0) {
    emit(IDLE);
    return;
  }

  const token = session;
  emit({
    articleKey,
    track,
    phase: "speaking",
    index: 0,
    total: queue.length,
    notice: null,
  });

  if (voices.length === 0) {
    const onVoices = () => {
      clearVoiceWait();
      if (token !== session) return;
      if (synth.getVoices().length > 0 && !chineseVoice()) {
        invalidate();
        synth.cancel();
        emit({ ...IDLE, notice: NO_VOICE });
      }
    };
    synth.addEventListener("voiceschanged", onVoices);
    detachVoices = () => synth.removeEventListener("voiceschanged", onVoices);
  }

  const start = () => {
    if (token !== session) return;
    speakAt(token, 0);
  };
  // Chrome ignores speak() in the same turn as cancel().
  if (wasBusy) window.setTimeout(start, 50);
  else start();
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
  const synth = synthOrNull();
  synth?.getVoices();
}

export function ReadAloud({
  articleKey,
  articleChunks,
  studyChunks,
}: {
  articleKey: string;
  articleChunks: string[];
  studyChunks?: string[];
}) {
  const pathname = usePathname();
  const hintId = useId();
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const mine = snap.articleKey === articleKey;
  const articleOn = mine && snap.track === "article" && snap.phase !== "idle";
  const studyOn = mine && snap.track === "study" && snap.phase !== "idle";
  const busy = articleOn || studyOn;
  const hasStudy = !!studyChunks && studyChunks.length > 0;

  useEffect(() => {
    bindHooks();
    primeVoices();
    const synth = synthOrNull();
    const onVoices = () => synth?.getVoices();
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
          onClick={() => play(articleKey, "article", articleChunks)}
        />
        {hasStudy ? (
          <SpeakButton
            active={studyOn}
            phase={studyOn ? snap.phase : "idle"}
            idle="朗读深度学习"
            idleLabel="朗读深度学习"
            activeNoun="深度学习"
            onClick={() => play(articleKey, "study", studyChunks ?? [])}
          />
        ) : null}
        {busy ? (
          <Button type="button" variant="outline" size="sm" aria-label="停止朗读" onClick={() => halt(null)}>
            <SquareIcon />
            停止
          </Button>
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
