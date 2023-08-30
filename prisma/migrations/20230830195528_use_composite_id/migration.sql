/*
  Warnings:

  - You are about to drop the column `id` on the `Court` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Court_venueId_courtNumber_key";

-- AlterTable
ALTER TABLE "Court" DROP COLUMN "id",
ADD CONSTRAINT "Court_pkey" PRIMARY KEY ("venueId", "courtNumber");
