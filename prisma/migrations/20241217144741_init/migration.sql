/*
  Warnings:

  - The values [PatchCord] on the enum `TypeCable` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `key` to the `history_stbs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeCable_new" AS ENUM ('Adaptor', 'Patchcord');
ALTER TABLE "cables" ALTER COLUMN "type" TYPE "TypeCable_new" USING ("type"::text::"TypeCable_new");
ALTER TYPE "TypeCable" RENAME TO "TypeCable_old";
ALTER TYPE "TypeCable_new" RENAME TO "TypeCable";
DROP TYPE "TypeCable_old";
COMMIT;

-- AlterTable
ALTER TABLE "history_stbs" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stbs" ALTER COLUMN "status" DROP NOT NULL;
