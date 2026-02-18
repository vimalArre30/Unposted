import { OpenAISummaryStub, OpenAIWhisperTranscriptionStub } from "@/domain/stubs/openaiProcessingStubs";
import { processEntryJob } from "@/workers/processEntryJob";

export async function runSqsConsumer() {
  // Lambda-compatible placeholder for Phase 1.
  // Future: poll SQS, parse message body into { entryId, leafId }, and dispatch processing.
  const deps = {
    transcriptionService: new OpenAIWhisperTranscriptionStub(),
    summaryService: new OpenAISummaryStub(),
  };

  return processEntryJob({ entryId: "stub", leafId: "stub" }, deps);
}
