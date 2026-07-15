-- CreateTable
CREATE TABLE "WordProgress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "learnerName" TEXT NOT NULL,
    "wordId" INTEGER NOT NULL,
    "timesSeen" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ConjugationProgress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "learnerName" TEXT NOT NULL,
    "sentenceId" INTEGER NOT NULL,
    "timesCorrect" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "WordProgress_learnerName_idx" ON "WordProgress"("learnerName");

-- CreateIndex
CREATE UNIQUE INDEX "WordProgress_learnerName_wordId_key" ON "WordProgress"("learnerName", "wordId");

-- CreateIndex
CREATE INDEX "ConjugationProgress_learnerName_idx" ON "ConjugationProgress"("learnerName");

-- CreateIndex
CREATE UNIQUE INDEX "ConjugationProgress_learnerName_sentenceId_key" ON "ConjugationProgress"("learnerName", "sentenceId");
