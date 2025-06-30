// scripts/restore.ts
const { prisma } = require("../lib/prisma");
const fs = require("fs/promises");
const path = require("path");

async function main() {
  const usersRaw = await fs.readFile(path.resolve("User.json"), "utf-8");
  const booksRaw = await fs.readFile(path.resolve("Book.json"), "utf-8");

  const users = JSON.parse(usersRaw);
  const books = JSON.parse(booksRaw);

  for (const user of users) {
    const { id, ...data } = user; // No incluir el ID manual
    await prisma.user.create({ data });
  }

  for (const book of books) {
    const { id, ...data } = book;
    await prisma.book.create({ data });
  }

  console.log("✅ Datos restaurados.");
}

main()
  .catch((e) => {
    console.error("❌ Error restaurando datos:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
