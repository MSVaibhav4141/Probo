import { Worker } from "bullmq";
import { prismaClient } from "@repo/prisma/prisma";

const dbWorker = new Worker(
  "dbSyncQueue",
  async (job) => {
    try {
      console.log("trying");
      console.log(job.data);
      if (job.data.type === "sell" && job.data.exitFromOrderId) {
        const parentOrderId = job.data.exitFromOrderId;
        const exitQty = job.data.quantity;
        await prismaClient.$transaction([
          prismaClient.orders.update({
            where: { id: parentOrderId },
            data: {
              quantity: { decrement: exitQty },
              exit: { increment: exitQty },
            },
          }),

          prismaClient.orders.create({
            data: job.data,
          }),
        ]);
      }else{
          await prismaClient.orders.create({
            data: job.data,
          });
        }
        console.log("done.", job.data);
    } catch (e) {
      console.log(e);
    }
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  }
);
