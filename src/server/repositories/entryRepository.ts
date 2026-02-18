import { prisma } from "@/server/db/prisma";

export async function createProcessingEntry(input: {
  userId: string;
  l1QuestionId: string;
  l2QuestionId: string;
  l3QuestionId: string;
  audioKey: string;
}) {
  return prisma.$transaction(async (tx) => {
    const entry = await tx.entry.create({
      data: {
        userId: input.userId,
        l1QuestionId: input.l1QuestionId,
        l2QuestionId: input.l2QuestionId,
        l3QuestionId: input.l3QuestionId,
        audioKey: input.audioKey,
        processingStatus: "PROCESSING",
      },
    });

    const leaf = await tx.leaf.create({
      data: {
        userId: input.userId,
        entryId: entry.id,
        processingStatus: "PROCESSING",
      },
    });

    return { entry, leaf };
  });
}
