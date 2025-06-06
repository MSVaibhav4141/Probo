import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export const prismaClient = new PrismaClient();
export const decimal = (number:Decimal | number) => new Decimal(number)
export const PrismaClientVar = PrismaClient