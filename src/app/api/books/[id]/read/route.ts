import { prisma } from '../../../../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').at(-2); // obtiene el `[id]` desde la URL

  const bookId = parseInt(id || '');
  if (isNaN(bookId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  await prisma.book.update({
    where: { id: bookId },
    data: { isRead: true },
  });

  return NextResponse.json({ success: true });
}
