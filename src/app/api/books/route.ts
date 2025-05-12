import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// GET /api/books
export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST /api/books

export async function POST(req: Request) {
  const body = await req.json();
  const { title, author, editorial, synopsis, coverImage, image, style } = body;

  if (!title || !author || !editorial || !synopsis) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        editorial,
        synopsis,
        coverImage: coverImage || undefined,
        image: image || undefined,
        style: style ? JSON.parse(style) : undefined,
      },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (err) {
    console.error("Error creando libro:", err);
    return NextResponse.json({ error: "No se pudo crear el libro" }, { status: 500 });
  }
}