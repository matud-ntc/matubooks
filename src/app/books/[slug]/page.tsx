import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

type Book = {
  title: string;
  author: string;
  editorial: string;
  coverImage?: string;
  image?: string;
  synopsis: string;
  style?: string[];
};

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'books.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const books: Book[] = JSON.parse(jsonData);

  return books.map((book) => ({
    slug: slugify(book.title),
  }));
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function BookPage({ params }: Props) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'books.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const books: Book[] = JSON.parse(jsonData);

  const book = books.find((b) => slugify(b.title) === params.slug);
  if (!book) return notFound();

  const image = book.coverImage || book.image;

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

        <p className="text-lg text-neutral-700 font-medium mb-6">{book.author}</p>

        <p className="text-base leading-relaxed text-justify whitespace-pre-line mb-6">
          {book.synopsis}
        </p>

        {book.style && book.style.length > 0 && (
          <div className="text-sm text-neutral-600 mt-6">
            <h4 className="font-semibold mb-2">Estilos:</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {book.style.map((s) => (
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
