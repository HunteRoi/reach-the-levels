-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reward" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cost" INTEGER NOT NULL,
    "imageURL" TEXT,
    "likes" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Reward" ("cost", "description", "id", "imageURL", "name") SELECT "cost", "description", "id", "imageURL", "name" FROM "Reward";
DROP TABLE "Reward";
ALTER TABLE "new_Reward" RENAME TO "Reward";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
