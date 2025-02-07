-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'LEADER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
