export type QuestionLevel = 1 | 2 | 3;

export interface QuestionNode {
  id: string;
  level: QuestionLevel;
  label: string;
  prompt: string;
  parentId: string | null;
}
