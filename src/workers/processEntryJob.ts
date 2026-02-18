import type { AudioTranscriptionService, EntrySummaryService } from "@/domain/types/processing";
import { prisma } from "@/server/db/prisma";

export interface ProcessEntryJobPayload {
  entryId: string;
  leafId: string;
}

export async function processEntryJob(
  payload: ProcessEntryJobPayload,
  deps: { transcriptionService: AudioTranscriptionService; summaryService: EntrySummaryService },
) {
  const entry = await prisma.entry.findUnique({ where: { id: payload.entryId } });
  if (!entry) {
    throw new Error(`Entry not found for id=${payload.entryId}`);
  }

  // Phase 1 only: processing interfaces are present but not executed.
  // Future phase: call deps.transcriptionService + deps.summaryService.
  await prisma.job.updateMany({
    where: { entryId: payload.entryId, leafId: payload.leafId },
    data: { status: "IN_PROGRESS" },
  });

  await prisma.job.updateMany({
    where: { entryId: payload.entryId, leafId: payload.leafId },
    data: { status: "QUEUED" },
  });

  return { skipped: true, reason: "Phase 1 stub" };
}
