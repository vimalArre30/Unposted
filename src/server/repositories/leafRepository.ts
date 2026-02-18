import { prisma } from "@/server/db/prisma";

export async function listLeavesForUser(userId: string) {
  return prisma.leaf.findMany({
    where: { userId },
    include: { entry: true },
    orderBy: { createdAt: "desc" },
  });
}
