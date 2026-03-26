-- Add idempotency key to prevent duplicate saves
ALTER TABLE "TestResult" ADD COLUMN "attemptId" TEXT;

-- Unique constraint for attemptId (SQLite allows multiple NULLs)
CREATE UNIQUE INDEX "TestResult_attemptId_key" ON "TestResult"("attemptId");

