export interface AudioTranscriptionService {
  transcribeAudio(input: { audioUrl: string; entryId: string }): Promise<{ transcript: string }>;
}

export interface EntrySummaryService {
  summarizeEntry(input: { transcript: string; entryId: string }): Promise<{
    summary: string;
    moodWord: string;
  }>;
}
