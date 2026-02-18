import { cookies } from "next/headers";

export interface SessionUser {
  id: string;
  email: string;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const value = cookieStore.get("unposted_session")?.value;
  if (!value) return null;

  const [id, email] = value.split(":");
  if (!id || !email) return null;
  return { id, email };
}
