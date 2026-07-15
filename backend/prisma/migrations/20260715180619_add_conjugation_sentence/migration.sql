-- CreateTable
CREATE TABLE "ConjugationSentence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "group" INTEGER NOT NULL DEFAULT 1,
    "before" TEXT NOT NULL,
    "after" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "verbLemma" TEXT NOT NULL,
    "translationRu" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "ConjugationSentence_group_idx" ON "ConjugationSentence"("group");
