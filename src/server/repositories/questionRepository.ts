import { prisma } from "@/server/db/prisma";

export async function listQuestionsByLevel(level?: number) {
  return prisma.questionNode.findMany({
    where: level ? { level } : undefined,
    orderBy: [{ level: "asc" }, { createdAt: "asc" }],
  });
}
