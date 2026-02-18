import { z } from "zod";
import { fail, ok } from "@/server/api/http";
import { getSessionUser } from "@/server/auth/session";
import { createProcessingEntry } from "@/server/repositories/entryRepository";
import { createJob } from "@/server/repositories/jobRepository";

const bodySchema = z.object({
  l1QuestionId: z.string().uuid(),
  l2QuestionId: z.string().uuid(),
  l3QuestionId: z.string().uuid(),
  audioKey: z.string().min(3),
});

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return fail("Unauthorized", 401);

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return fail(parsed.error.message, 422);

  const { entry, leaf } = await createProcessingEntry({
    userId: user.id,
    ...parsed.data,
  });

  const job = await createJob({
    entryId: entry.id,
    leafId: leaf.id,
    type: "PROCESS_ENTRY",
    payload: { entryId: entry.id, leafId: leaf.id },
  });

  return ok({ entry, leaf, job }, 201);
}
