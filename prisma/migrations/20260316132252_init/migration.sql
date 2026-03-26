-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
