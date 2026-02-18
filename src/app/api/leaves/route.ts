import { fail, ok } from "@/server/api/http";
import { getSessionUser } from "@/server/auth/session";
import { listLeavesForUser } from "@/server/repositories/leafRepository";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return fail("Unauthorized", 401);

  const leaves = await listLeavesForUser(user.id);
  return ok({ leaves });
}
