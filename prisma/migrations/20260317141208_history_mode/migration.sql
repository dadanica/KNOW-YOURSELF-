-- DropIndex
DROP INDEX "TestResult_clientId_key";

-- CreateIndex
CREATE INDEX "TestResult_clientId_createdAt_idx" ON "TestResult"("clientId", "createdAt");
