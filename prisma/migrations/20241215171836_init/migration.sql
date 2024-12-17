/*
  Warnings:

  - You are about to drop the `tools` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeCable" AS ENUM ('Adaptor', 'PatchCord');

-- DropForeignKey
ALTER TABLE "tools" DROP CONSTRAINT "tools_locationId_fkey";

-- DropTable
DROP TABLE "tools";

-- CreateTable
CREATE TABLE "onts" (
    "id" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "numberWo" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "unitAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateActivation" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "information" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "onts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stbs" (
    "id" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "numberWo" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "unitAddress" TEXT NOT NULL,
    "package" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dateActivation" TIMESTAMP(3) NOT NULL,
    "deviceLocation" "Status" NOT NULL,
    "information" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stbs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cables" (
    "id" TEXT NOT NULL,
    "type" "TypeCable" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventories" (
    "id" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "goodQuantity" INTEGER NOT NULL,
    "damagedQuantity" INTEGER NOT NULL,
    "information" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history_onts" (
    "id" TEXT NOT NULL,
    "ontId" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "history_onts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history_stbs" (
    "id" TEXT NOT NULL,
    "stbId" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "history_stbs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "onts_id_key" ON "onts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "stbs_id_key" ON "stbs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cables_id_key" ON "cables"("id");

-- CreateIndex
CREATE UNIQUE INDEX "inventories_id_key" ON "inventories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "history_onts_id_key" ON "history_onts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "history_stbs_id_key" ON "history_stbs"("id");

-- AddForeignKey
ALTER TABLE "onts" ADD CONSTRAINT "onts_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stbs" ADD CONSTRAINT "stbs_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cables" ADD CONSTRAINT "cables_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_onts" ADD CONSTRAINT "history_onts_ontId_fkey" FOREIGN KEY ("ontId") REFERENCES "onts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_stbs" ADD CONSTRAINT "history_stbs_stbId_fkey" FOREIGN KEY ("stbId") REFERENCES "stbs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
