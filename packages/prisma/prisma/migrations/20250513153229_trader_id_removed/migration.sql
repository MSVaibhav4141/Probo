/*
  Warnings:

  - You are about to drop the column `tradeId` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "tradeId",
ALTER COLUMN "status" SET DEFAULT 'pending';
