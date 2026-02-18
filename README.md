# unposted

Mobile-first private voice journaling app using Next.js App Router + TypeScript + Tailwind, with AWS-first architecture.

## Phase 1 delivered
- Next.js scaffold with mobile-first routes and placeholder UI.
- Clean architecture folders:
  - `src/domain`
  - `src/server`
  - `src/ui`
  - `src/workers`
- Prisma schema + migration for `User`, `QuestionNode`, `Entry`, `Leaf`, `Job`.
- Cognito configuration and service wiring for email/password + Google OAuth URL creation.
- API routes:
  - `GET /api/auth/session`
  - `POST /api/uploads/signed-url`
  - `POST /api/entries`
  - `GET /api/leaves`
  - `GET /api/questions`
- Question seed mechanism from JSON (`prisma/seed/questions.seed.json`).
- AI processing interfaces and worker stubs (not implemented yet by design for Phase 1).

## Local development

1. Copy envs:
   ```bash
   cp .env.example .env
   ```
2. Install deps:
   ```bash
   npm install
   ```
3. Run DB migration and seed:
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```
4. Start app:
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:seed`

## Project structure

```text
src/
  app/
  domain/
  server/
  ui/
  workers/
prisma/
  migrations/
  seed/
```

## Notes
- S3 upload URLs are generated for private bucket upload (`PUT`) and scoped to the signed object key.
- Session handling is placeholder cookie-based in Phase 1 and should be replaced by secure token/session middleware.
- Worker script is Lambda-compatible skeleton and intentionally no-ops processing right now.

## Phase 2 checklist
- [ ] Implement audio recording UX and full L1→L2→L3 question picker with parent-child filtering.
- [ ] Integrate Cognito hosted UI callback flow and secure JWT/session validation middleware.
- [ ] Add SQS enqueue publisher in API and real SQS consumer loop in worker.
- [ ] Implement Whisper transcription adapter behind `AudioTranscriptionService`.
- [ ] Implement structured JSON summary + mood classifier behind `EntrySummaryService`.
- [ ] Update `Entry` + `Leaf` status transitions (`PROCESSING` → `READY` / `FAILED`) in worker.
- [ ] Compute and persist leaf color from mood valence mapping.
- [ ] Render interactive life tree leaves with hover/tap summaries + audio playback.
- [ ] Add integration tests for API routes and worker pipeline.
