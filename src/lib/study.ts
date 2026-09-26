export interface TimelineItem {
  time: string;
  event: string;
}

export interface Study {
  /** Paragraphs support [[concept-id|显示文字]] wiki links. */
  background: string[];
  timeline: TimelineItem[];
  terms: string[];
  questions: string[];
}
