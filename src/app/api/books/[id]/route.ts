import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function PATCH(
  req: Request,
  { params: paramsPromise }: { params: Promise<{ id: string }> }, // <-- `params` is a Promise!
) {
  const params = await paramsPromise; // <-- Now we await it!
  const { synopsis } = await req.json();

  if (typeof synopsis !== "string") {
    return NextResponse.json({ error: "Invalid synopsis" }, { status: 400 });
  }

  try {
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(params.id, 10) }, // <-- Now `params.id` is safely accessed
      data: { synopsis },
    });

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error("Error updating synopsis:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
