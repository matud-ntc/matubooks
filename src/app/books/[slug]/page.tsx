import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "../../../../lib/prisma";

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export async function generateStaticParams() {
  const books = await prisma.book.findMany();
  return books.map((book) => ({
    slug: slugify(book.title),
  }));
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Await the params promise first

  const books = await prisma.book.findMany();
  const book = books.find((b) => slugify(b.title) === slug);

  if (!book) return notFound();

  const image = book.coverImage || book.image;
  const styles = Array.isArray(book.style)
    ? book.style.filter((s): s is string => typeof s === "string")
    : [];

  return (
    <main className="min-h-screen bg-[#f5efe4] px-6 py-10 text-neutral-900">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-serif font-bold mb-8">{book.title}</h1>

        {image && (
          <Image
            src={image}
            alt={book.title}
            width={300}
            height={450}
            className="mx-auto rounded-md mb-6 shadow"
          />
        )}

        <p className="text-lg text-neutral-700 font-medium mb-6">
          {book.author}
        </p>

        <p className="text-base leading-relaxed text-justify whitespace-pre-line mb-6">
          {book.synopsis}
        </p>

        {styles.length > 0 && (
          <div className="text-sm text-neutral-600 mt-6">
            <h4 className="font-semibold mb-2">Estilos:</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {styles.map((s) => (
                <span
                  key={s}
                  className="bg-neutral-200 text-neutral-700 px-3 py-1 rounded-full text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/"
            className="inline-block px-4 py-2 border border-neutral-400 rounded-md text-sm hover:bg-neutral-200 transition"
          >
            ← Volver
          </Link>
        </div>
      </div>
    </main>
  );
}
