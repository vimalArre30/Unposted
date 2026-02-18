import { z } from "zod";
import { fail, ok } from "@/server/api/http";
import { getSessionUser } from "@/server/auth/session";
import { createSignedUploadUrl } from "@/server/services/s3UploadService";

const bodySchema = z.object({
  contentType: z.string().min(3),
  fileName: z.string().min(3),
});

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return fail("Unauthorized", 401);

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return fail(parsed.error.message, 422);

  const key = `${user.id}/${Date.now()}-${parsed.data.fileName}`;
  const uploadUrl = await createSignedUploadUrl({ key, contentType: parsed.data.contentType });

  return ok({ key, uploadUrl });
}
