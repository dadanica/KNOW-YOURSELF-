-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TestResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT,
    "mode" INTEGER NOT NULL,
    "typeKey" TEXT NOT NULL,
    "typeName" TEXT NOT NULL,
    "createdAtISO" TEXT NOT NULL,
    "resultJson" JSONB NOT NULL,
    "answersJson" JSONB NOT NULL,
    "questionIds" JSONB NOT NULL,
    "userAgent" TEXT,
    "ip" TEXT
);
INSERT INTO "new_TestResult" ("answersJson", "createdAt", "createdAtISO", "id", "ip", "mode", "questionIds", "resultJson", "typeKey", "typeName", "userAgent") SELECT "answersJson", "createdAt", "createdAtISO", "id", "ip", "mode", "questionIds", "resultJson", "typeKey", "typeName", "userAgent" FROM "TestResult";
DROP TABLE "TestResult";
ALTER TABLE "new_TestResult" RENAME TO "TestResult";
CREATE UNIQUE INDEX "TestResult_clientId_key" ON "TestResult"("clientId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
