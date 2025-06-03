-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "exitFromOrderId" TEXT;

-- CreateTable
CREATE TABLE "OrderState" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "cancelQty" INTEGER NOT NULL,
    "exitQty" INTEGER NOT NULL,
    "exitingQty" INTEGER NOT NULL,
    "matchedQty" INTEGER NOT NULL,
    "pendingQty" INTEGER NOT NULL,

    CONSTRAINT "OrderState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderState_orderId_key" ON "OrderState"("orderId");

-- AddForeignKey
ALTER TABLE "OrderState" ADD CONSTRAINT "OrderState_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
