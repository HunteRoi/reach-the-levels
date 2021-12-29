/*
  Warnings:

  - You are about to drop the column `reward` on the `Level` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Step" ADD COLUMN "points" INTEGER;

-- CreateTable
CREATE TABLE "Reward" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cost" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Level" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "projectId" TEXT NOT NULL,
    "nextLevelId" TEXT,
    CONSTRAINT "Level_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Level_nextLevelId_fkey" FOREIGN KEY ("nextLevelId") REFERENCES "Level" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Level" ("description", "id", "name", "nextLevelId", "projectId") SELECT "description", "id", "name", "nextLevelId", "projectId" FROM "Level";
DROP TABLE "Level";
ALTER TABLE "new_Level" RENAME TO "Level";
CREATE UNIQUE INDEX "Level_nextLevelId_key" ON "Level"("nextLevelId");
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Project" ("description", "id", "name") SELECT "description", "id", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
