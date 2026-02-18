export type LifeTreeStage = "SAPLING" | "PLANT" | "SMALL_TREE" | "BIG_TREE";

export const MOOD_WORDS = [
  "joyful",
  "grateful",
  "calm",
  "hopeful",
  "focused",
  "curious",
  "neutral",
  "restless",
  "anxious",
  "sad",
  "frustrated",
  "overwhelmed",
] as const;

export type MoodWord = (typeof MOOD_WORDS)[number];
