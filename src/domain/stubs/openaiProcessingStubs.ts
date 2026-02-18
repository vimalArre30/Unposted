import type { AudioTranscriptionService, EntrySummaryService } from "@/domain/types/processing";

export class OpenAIWhisperTranscriptionStub implements AudioTranscriptionService {
  async transcribeAudio(): Promise<{ transcript: string }> {
    throw new Error("Phase 1 stub: transcription service not implemented yet.");
  }
}

export class OpenAISummaryStub implements EntrySummaryService {
  async summarizeEntry(): Promise<{ summary: string; moodWord: string }> {
    throw new Error("Phase 1 stub: summary service not implemented yet.");
  }
}
