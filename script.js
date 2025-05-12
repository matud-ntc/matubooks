const { PrismaClient } = require("@prisma/client");
const fs = require("fs/promises");

const prisma = new PrismaClient();

async function main() {
  const json = await fs.readFile("public/data/books.json", "utf-8");
  const books = JSON.parse(json);

  for (const book of books) {
    await prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        editorial: book.editorial,
        coverImage: book.coverImage,
        image: book.image,
        synopsis: book.synopsis,
        style: book.style,
        isRead: false,
      },
    });
  }

  console.log("Books have been added successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
