-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TestResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT,
    "userId" TEXT,
    "mode" INTEGER NOT NULL,
    "typeKey" TEXT NOT NULL,
    "typeName" TEXT NOT NULL,
    "createdAtISO" TEXT NOT NULL,
    "resultJson" JSONB NOT NULL,
    "answersJson" JSONB NOT NULL,
    "questionIds" JSONB NOT NULL,
    "userAgent" TEXT,
    "ip" TEXT,
    CONSTRAINT "TestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TestResult" ("answersJson", "clientId", "createdAt", "createdAtISO", "id", "ip", "mode", "questionIds", "resultJson", "typeKey", "typeName", "updatedAt", "userAgent") SELECT "answersJson", "clientId", "createdAt", "createdAtISO", "id", "ip", "mode", "questionIds", "resultJson", "typeKey", "typeName", "updatedAt", "userAgent" FROM "TestResult";
DROP TABLE "TestResult";
ALTER TABLE "new_TestResult" RENAME TO "TestResult";
CREATE INDEX "TestResult_clientId_createdAt_idx" ON "TestResult"("clientId", "createdAt");
CREATE INDEX "TestResult_userId_createdAt_idx" ON "TestResult"("userId", "createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");

-- CreateIndex
CREATE INDEX "Session_userId_expiresAt_idx" ON "Session"("userId", "expiresAt");
