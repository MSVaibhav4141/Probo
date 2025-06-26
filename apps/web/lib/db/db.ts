import { PrismaClientVar as PrismaClient } from '@repo/prisma/prisma';

const prismaClientSingleton = (): InstanceType<typeof PrismaClient> => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | never;
};

const prisma: PrismaClientSingleton = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
