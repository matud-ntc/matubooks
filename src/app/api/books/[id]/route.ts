import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function PATCH(
  req: Request,
  { params: paramsPromise }: { params: Promise<{ id: string }> },
) {
  const params = await paramsPromise;
  const body = await req.json();
  const { synopsis, title, author, editorial, coverImage, style, inWishlist } = body;

  const data: Record<string, unknown> = {};
  if (synopsis !== undefined) data.synopsis = synopsis;
  if (title !== undefined) data.title = title;
  if (author !== undefined) data.author = author;
  if (editorial !== undefined) data.editorial = editorial;
  if (coverImage !== undefined) data.coverImage = coverImage;
  if (style !== undefined) data.style = style;
  if (inWishlist !== undefined) data.inWishlist = inWishlist;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  try {
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(params.id, 10) },
      data,
    });

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
