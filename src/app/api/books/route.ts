import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
