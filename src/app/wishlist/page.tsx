"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type Book = {
  id: string;
  title: string;
  author: string;
  editorial: string;
  coverImage?: string;
  image?: string;
  synopsis: string;
  style?: unknown;
  isRead?: boolean;
  inWishlist?: boolean;
};

export default function WishlistPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (book: Book) => book.inWishlist && !book.isRead,
        );
        setBooks(filtered);
      });
  }, []);

  const handleMarkAsBought = async (id: string) => {
    const res = await fetch(`/api/books/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inWishlist: false }),
    });

    if (res.ok) {
      setBooks((prev) => prev.filter((book) => book.id !== id));
    }
  };

  const slugify = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <main className="min-h-screen bg-[#f5efe4] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif font-bold text-center mb-10">
          Wishlist
        </h1>

        {books.length === 0 ? (
          <p className="text-center text-neutral-600">
            No hay libros en tu wishlist.
          </p>
        ) : (
          <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
            {books.map((book, index) => {
              const styles =
                Array.isArray(book.style) &&
                book.style.every((s) => typeof s === "string")
                  ? book.style
                  : [];

              return (
                <motion.div
                  key={book.id}
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-[#fcf8ed] rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex flex-col h-full min-h-[360px]">
                    <Link
                      href={`/books/${slugify(book.title)}`}
                      className="group block h-full"
                    >
                      <div className="aspect-[2/3] w-full relative">
                        <Image
                          src={
                            book.coverImage ||
                            book.image ||
                            "/images/fallback.jpg"
                          }
                          alt={book.title}
                          fill
                          className="object-cover rounded-t-xl"
                        />
                      </div>

                      <div className="p-4 text-center flex flex-col justify-between flex-1">
                        <div>
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

                    <button
                      onClick={() => handleMarkAsBought(book.id)}
                      className="mt-2 mb-4 mx-4 px-4 py-1 bg-neutral-800 text-white text-sm rounded hover:bg-neutral-700 transition"
                    >
                      Marcar como comprado
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
