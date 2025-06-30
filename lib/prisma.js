// lib/prisma.ts
const { PrismaClient } = require("@prisma/client");

const globalForPrisma = globalThis;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}

const prisma = globalForPrisma.prisma;

module.exports = { prisma };
