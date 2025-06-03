/*
  Warnings:

  - You are about to drop the `OrderState` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderState" DROP CONSTRAINT "OrderState_orderId_fkey";

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "cancel" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "exit" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "OrderState";
