// scripts/clear.ts
const { prisma } = require("../lib/prisma");

async function main() {
  await prisma.book.deleteMany();   // Primero libros por FK
  await prisma.user.deleteMany();

  console.log("🧹 Datos eliminados correctamente.");
}

main()
  .catch((e) => {
    console.error("❌ Error al borrar datos:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
