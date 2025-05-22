import { PrismaClient } from "../generated/prisma/index.js";
import { Decimal } from "../generated/prisma/runtime/library.js";

export const prismaClient = new PrismaClient();
export const decimal = (number:Decimal | number) => new Decimal(number)
export const PrismaClientVar = PrismaClient