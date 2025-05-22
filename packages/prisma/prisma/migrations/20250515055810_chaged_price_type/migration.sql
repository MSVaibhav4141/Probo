/*
  Warnings:

  - You are about to alter the column `price` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(2,1)`.
  - You are about to alter the column `price` on the `Trades` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(2,1)`.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "price" SET DATA TYPE DECIMAL(2,1);

-- AlterTable
ALTER TABLE "Trades" ALTER COLUMN "price" SET DATA TYPE DECIMAL(2,1);
