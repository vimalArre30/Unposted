-- CreateEnum
CREATE TYPE "ProcessingStatus" AS ENUM ('PROCESSING', 'READY', 'FAILED');
CREATE TYPE "JobStatus" AS ENUM ('QUEUED', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "cognitoSub" TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "QuestionNode" (
  "id" TEXT PRIMARY KEY,
  "level" INTEGER NOT NULL,
  "label" TEXT NOT NULL,
  "prompt" TEXT NOT NULL,
  "parentId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "QuestionNode_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "QuestionNode"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE "Entry" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "l1QuestionId" TEXT NOT NULL,
  "l2QuestionId" TEXT NOT NULL,
  "l3QuestionId" TEXT NOT NULL,
  "audioKey" TEXT NOT NULL,
  "transcript" TEXT,
  "aiSummary" TEXT,
  "moodWord" TEXT,
  "processingStatus" "ProcessingStatus" NOT NULL DEFAULT 'PROCESSING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Entry_l1QuestionId_fkey" FOREIGN KEY ("l1QuestionId") REFERENCES "QuestionNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Entry_l2QuestionId_fkey" FOREIGN KEY ("l2QuestionId") REFERENCES "QuestionNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Entry_l3QuestionId_fkey" FOREIGN KEY ("l3QuestionId") REFERENCES "QuestionNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "Leaf" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "entryId" TEXT NOT NULL UNIQUE,
  "sequence" INTEGER NOT NULL DEFAULT 0,
  "colorHex" TEXT,
  "processingStatus" "ProcessingStatus" NOT NULL DEFAULT 'PROCESSING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Leaf_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Leaf_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Job" (
  "id" TEXT PRIMARY KEY,
  "entryId" TEXT NOT NULL,
  "leafId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "status" "JobStatus" NOT NULL DEFAULT 'QUEUED',
  "error" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Job_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Job_leafId_fkey" FOREIGN KEY ("leafId") REFERENCES "Leaf"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "QuestionNode_level_idx" ON "QuestionNode"("level");
CREATE INDEX "QuestionNode_parentId_idx" ON "QuestionNode"("parentId");
CREATE INDEX "Entry_userId_createdAt_idx" ON "Entry"("userId", "createdAt");
CREATE INDEX "Entry_processingStatus_idx" ON "Entry"("processingStatus");
CREATE INDEX "Leaf_userId_createdAt_idx" ON "Leaf"("userId", "createdAt");
CREATE INDEX "Leaf_processingStatus_idx" ON "Leaf"("processingStatus");
CREATE INDEX "Job_status_createdAt_idx" ON "Job"("status", "createdAt");
