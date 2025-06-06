import { Worker } from "bullmq";
import { prismaClient } from "@repo/prisma/prisma";

const tradeWorker = new Worker(
  "tradeSyncQueue",
  async (job) => {
    if (job.data) {
      console.log(job.data, 'asdadasdasdsajhdghsajvdgjsavdghsavjdvjsabj');
      const buyOrderId = await prismaClient.orders.findUnique({
        where: { id: job.data.orderMatched.buyOrderId },
      });
      const sellOrderId = await prismaClient.orders.findUnique({
        where: { id: job.data.orderMatched.sellOrderId },
      });

      if (!buyOrderId || !sellOrderId) {
        throw new Error("No orders yet");
      }

      const trade = job.data.orderMatched;
      const type = job.data.type;

      await prismaClient.$transaction(async (tx) => {
        if (type === "sell") {
          const updatedBuy = await tx.orders.update({
            where: { id: buyOrderId.id },
            data: {
              leftQty: { decrement: trade.quantity },
            },
          });

          if (updatedBuy.leftQty === 0) {
            await tx.orders.update({
              where: { id: updatedBuy.id },
              data: { status: "fulfilled" },
            });
          }

          await tx.trades.create({
            data: trade,
          });
        }
        if (type === "buy") {
          const updatedSell = await tx.orders.update({
            where: { id: sellOrderId.id },
            data: {
              leftQty: { decrement: trade.quantity },
            },
          });

           if (updatedSell.leftQty === 0) {
            await tx.orders.update({
              where: { id: updatedSell.id },
              data: { status: "fulfilled" },
            });
          }
          await tx.trades.create({
            data: trade,
          });
        }
      });

      console.log("Trade created");
    }
  },
  {
    connection: {
      host: process.env.REDIS_URL || 'localhost',
      port: 6379,
    },
  }
);
