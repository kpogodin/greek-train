-- CreateTable
CREATE TABLE "SmallTalkPrompt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "promptRu" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SmallTalkVariant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "promptId" INTEGER NOT NULL,
    "phraseGreek" TEXT NOT NULL,
    "translationRu" TEXT NOT NULL,
    "pronunciation" TEXT NOT NULL,
    CONSTRAINT "SmallTalkVariant_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "SmallTalkPrompt" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SmallTalkProgress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "learnerName" TEXT NOT NULL,
    "promptId" INTEGER NOT NULL,
    "timesKnown" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "SmallTalkVariant_promptId_idx" ON "SmallTalkVariant"("promptId");

-- CreateIndex
CREATE INDEX "SmallTalkProgress_learnerName_idx" ON "SmallTalkProgress"("learnerName");

-- CreateIndex
CREATE UNIQUE INDEX "SmallTalkProgress_learnerName_promptId_key" ON "SmallTalkProgress"("learnerName", "promptId");
