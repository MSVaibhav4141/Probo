/*
  Warnings:

  - The primary key for the `Orders` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Trades" DROP CONSTRAINT "Trades_buyOrderId_fkey";

-- DropForeignKey
ALTER TABLE "Trades" DROP CONSTRAINT "Trades_sellOrderId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Orders_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Trades" ALTER COLUMN "buyOrderId" SET DATA TYPE TEXT,
ALTER COLUMN "sellOrderId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Trades" ADD CONSTRAINT "Trades_buyOrderId_fkey" FOREIGN KEY ("buyOrderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trades" ADD CONSTRAINT "Trades_sellOrderId_fkey" FOREIGN KEY ("sellOrderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
