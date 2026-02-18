import { prisma } from "@/server/db/prisma";

export async function createJob(input: { entryId: string; leafId: string; type: string; payload: object }) {
  return prisma.job.create({
    data: {
      entryId: input.entryId,
      leafId: input.leafId,
      type: input.type,
      payload: input.payload,
      status: "QUEUED",
    },
  });
}
