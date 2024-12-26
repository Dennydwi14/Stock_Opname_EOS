/*
  Warnings:

  - You are about to drop the column `key` on the `history_onts` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `history_stbs` table. All the data in the column will be lost.
  - Added the required column `keyword` to the `history_onts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keyword` to the `history_stbs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "history_onts" DROP COLUMN "key",
ADD COLUMN     "keyword" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "history_stbs" DROP COLUMN "key",
ADD COLUMN     "keyword" TEXT NOT NULL;
