-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SmallTalkVariant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "promptId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "speaker" TEXT NOT NULL DEFAULT 'them',
    "phraseGreek" TEXT NOT NULL,
    "translationRu" TEXT NOT NULL,
    "pronunciation" TEXT NOT NULL,
    CONSTRAINT "SmallTalkVariant_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "SmallTalkPrompt" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SmallTalkVariant" ("id", "phraseGreek", "promptId", "pronunciation", "translationRu") SELECT "id", "phraseGreek", "promptId", "pronunciation", "translationRu" FROM "SmallTalkVariant";
DROP TABLE "SmallTalkVariant";
ALTER TABLE "new_SmallTalkVariant" RENAME TO "SmallTalkVariant";
CREATE INDEX "SmallTalkVariant_promptId_idx" ON "SmallTalkVariant"("promptId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
