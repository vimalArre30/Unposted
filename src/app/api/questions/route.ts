import { listQuestionsByLevel } from "@/server/repositories/questionRepository";
import { ok } from "@/server/api/http";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const levelParam = url.searchParams.get("level");
  const level = levelParam ? Number(levelParam) : undefined;

  const questions = await listQuestionsByLevel(level);
  return ok({ questions });
}
