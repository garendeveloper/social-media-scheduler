import { PrismaClient } from '@prisma/client';

// Prevent multiple Prisma instances in development (Hot Reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use existing instance or create new one
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Save instance globally in development to prevent duplication
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;