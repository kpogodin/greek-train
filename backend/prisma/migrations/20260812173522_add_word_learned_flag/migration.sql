-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WordProgress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "learnerName" TEXT NOT NULL,
    "wordId" INTEGER NOT NULL,
    "learned" BOOLEAN NOT NULL DEFAULT false,
    "timesSeen" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_WordProgress" ("createdAt", "id", "learnerName", "timesSeen", "updatedAt", "wordId", "learned") SELECT "createdAt", "id", "learnerName", "timesSeen", "updatedAt", "wordId", true FROM "WordProgress";
DROP TABLE "WordProgress";
ALTER TABLE "new_WordProgress" RENAME TO "WordProgress";
CREATE INDEX "WordProgress_learnerName_idx" ON "WordProgress"("learnerName");
CREATE UNIQUE INDEX "WordProgress_learnerName_wordId_key" ON "WordProgress"("learnerName", "wordId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
