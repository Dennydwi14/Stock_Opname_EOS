/*
  Warnings:

  - Added the required column `key` to the `history_onts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "history_onts" ADD COLUMN     "key" TEXT NOT NULL;
