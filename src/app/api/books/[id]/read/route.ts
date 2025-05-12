import { prisma } from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const bookId = parseInt(params.id);
  if (isNaN(bookId))
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  await prisma.book.update({
    where: { id: bookId },
    data: { isRead: true },
  });

  return NextResponse.json({ success: true });
}
