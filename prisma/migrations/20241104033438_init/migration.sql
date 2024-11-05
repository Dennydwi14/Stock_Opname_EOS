/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tools" DROP CONSTRAINT "tools_locationId_fkey";

-- DropTable
DROP TABLE "Location";

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "locations_id_key" ON "locations"("id");

-- AddForeignKey
ALTER TABLE "tools" ADD CONSTRAINT "tools_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
