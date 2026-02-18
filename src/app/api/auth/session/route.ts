import { ok } from "@/server/api/http";
import { getSessionUser } from "@/server/auth/session";

export async function GET() {
  const session = await getSessionUser();
  return ok({ session });
}
