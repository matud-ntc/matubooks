import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "matudntc@gmail.com";
  const plainPassword = "Chinaco1!";
  const saltRounds = 10;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    console.log("User already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      root: true,
    },
  });

  console.log("User created:", user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
