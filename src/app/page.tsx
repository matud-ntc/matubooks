"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type Book = {
  title: string;
  author: string;
  editorial: string;
  coverImage?: string;
  image?: string;
  synopsis: string;
  style?: unknown; // porque puede ser JSON
};

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"author" | "title">("author");
  const [selectedStyle, setSelectedStyle] = useState<string>("Todos");

  useEffect(() => {
    fetch("/api/books") // asumiendo que usás API ahora, si no volvé a `/data/books.json`
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: Book, b: Book) =>
          a.author.localeCompare(b.author),
        );
        setBooks(sorted);
      })
      .catch((err) => console.error("Error cargando libros:", err));
  }, []);

  const allStyles = Array.from(
    new Set(
      books.flatMap((book) =>
        Array.isArray(book.style)
          ? book.style.filter((s): s is string => typeof s === "string")
          : [],
      ),
    ),
  );

  const handleSortChange = (value: "author" | "title") => {
    setSortBy(value);
    const sorted = [...books].sort((a, b) =>
      value === "author"
        ? a.author.localeCompare(b.author)
        : a.title.localeCompare(b.title),
    );
    setBooks(sorted);
  };

  const filtered = books.filter((book) => {
    const q = filter.toLowerCase();
    const matchesQuery =
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q);

    const styles =
      Array.isArray(book.style) &&
      book.style.every((s) => typeof s === "string")
        ? book.style
        : [];

    const matchesStyle =
      selectedStyle === "Todos" || styles.includes(selectedStyle);

    return matchesQuery && matchesStyle;
  });

  const slugify = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <main className="min-h-screen bg-[#f2ebe1] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-12">
          <h1 className="text-5xl font-serif font-bold text-center">
            Biblioteca
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Buscar..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-neutral-300 px-4 py-2 rounded-md shadow-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />

            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) =>
                  handleSortChange(e.target.value as "author" | "title")
                }
                className="border border-neutral-300 px-3 py-2 rounded-md"
              >
                <option value="author">Ordenar por autor</option>
                <option value="title">Ordenar por título</option>
              </select>

              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="border border-neutral-300 px-3 py-2 rounded-md"
              >
                <option value="Todos">Todos los estilos</option>
                {allStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
          {filtered.map((book, index) => {
            const styles =
              Array.isArray(book.style) &&
              book.style.every((s) => typeof s === "string")
                ? book.style
                : [];

            return (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={`/books/${slugify(book.title)}`}
                  className="group block"
                >
                  <div className="bg-[#fcf8ed] rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                    <Image
                      src={
                        book.coverImage || book.image || "/images/fallback.jpg"
                      }
                      alt={book.title}
                      width={300}
                      height={450}
                      className="w-full object-cover aspect-[2/3]"
                    />
                    <div className="p-4 text-center flex flex-col justify-between flex-1">
                      <p className="text-base text-neutral-600 font-medium">
                        {book.author}
                      </p>
                      <h3 className="text-lg font-semibold mt-2">
                        {book.title}
                      </h3>
                      {styles.length > 0 && (
                        <div className="text-xs text-neutral-500 mt-2 space-y-1">
                          {styles.map((s) => (
                            <div key={s}>{s}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
