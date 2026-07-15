-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ConjugationSentence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "group" INTEGER NOT NULL DEFAULT 1,
    "before" TEXT NOT NULL,
    "after" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "verbLemma" TEXT NOT NULL,
    "translationRu" TEXT NOT NULL,
    "pronunciation" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ConjugationSentence" ("after", "before", "correctAnswer", "createdAt", "group", "id", "translationRu", "verbLemma") SELECT "after", "before", "correctAnswer", "createdAt", "group", "id", "translationRu", "verbLemma" FROM "ConjugationSentence";
DROP TABLE "ConjugationSentence";
ALTER TABLE "new_ConjugationSentence" RENAME TO "ConjugationSentence";
CREATE INDEX "ConjugationSentence_group_idx" ON "ConjugationSentence"("group");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
