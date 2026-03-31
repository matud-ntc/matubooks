import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import Anthropic from "@anthropic-ai/sdk";

type Recommendation = {
  title: string;
  author: string;
  reason: string;
};

async function fetchFromClaude(book: {
  title: string;
  author: string;
  synopsis: string;
  style: unknown;
}): Promise<Recommendation[]> {
  const styles = Array.isArray(book.style) ? (book.style as string[]).join(", ") : "";

  const prompt = `Sos un experto en literatura. Dame exactamente 5 recomendaciones de libros similares a este:

Título: ${book.title}
Autor: ${book.author}
Géneros/estilos: ${styles || "no especificado"}
Sinopsis: ${book.synopsis}

Respondé únicamente con un JSON válido, sin texto extra ni bloques de código, con este formato exacto:
[
  { "title": "...", "author": "...", "reason": "..." },
  { "title": "...", "author": "...", "reason": "..." },
  { "title": "...", "author": "...", "reason": "..." },
  { "title": "...", "author": "...", "reason": "..." },
  { "title": "...", "author": "...", "reason": "..." }
]

El campo "reason" debe ser una frase corta (máximo 20 palabras) explicando por qué es similar.`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = response.content[0].type === "text" ? response.content[0].text : "";
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("No JSON array found in response");

  return JSON.parse(jsonMatch[0]);
}

export async function GET(
  req: Request,
  { params: paramsPromise }: { params: Promise<{ id: string }> },
) {
  const params = await paramsPromise;
  const bookId = parseInt(params.id, 10);
  const refresh = new URL(req.url).searchParams.get("refresh") === "true";

  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  // Devolver desde DB si existen y no se pide refresh
  const saved = (book as Record<string, unknown>).recommendations;
  if (!refresh && Array.isArray(saved) && saved.length > 0) {
    return NextResponse.json(saved);
  }

  try {
    const recommendations = await fetchFromClaude(book);

    await (prisma.book.update as Function)({
      where: { id: bookId },
      data: { recommendations },
    });

    return NextResponse.json(recommendations);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error fetching recommendations:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
