/*
  Warnings:

  - A unique constraint covering the columns `[nextLevelId]` on the table `Level` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Level_nextLevelId_key" ON "Level"("nextLevelId");
