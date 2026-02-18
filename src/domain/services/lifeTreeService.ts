import type { LifeTreeStage, MoodWord } from "@/domain/types/lifeTree";

export function getLifeTreeStage(leafCount: number): LifeTreeStage {
  if (leafCount <= 6) return "SAPLING";
  if (leafCount <= 15) return "PLANT";
  if (leafCount <= 35) return "SMALL_TREE";
  return "BIG_TREE";
}

const moodToColor: Record<MoodWord, string> = {
  joyful: "#6CCF67",
  grateful: "#7ED957",
  calm: "#70C1A7",
  hopeful: "#95D36E",
  focused: "#9BBF7A",
  curious: "#B0D470",
  neutral: "#C7CF9A",
  restless: "#E2BF7B",
  anxious: "#E19A6F",
  sad: "#88A4C4",
  frustrated: "#D87D6A",
  overwhelmed: "#9B7CC2",
};

export function mapMoodToLeafColor(mood: MoodWord): string {
  return moodToColor[mood];
}
