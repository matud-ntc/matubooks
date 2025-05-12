"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBookPage() {
  const router = useRouter();
  const [isRoot, setIsRoot] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editorial, setEditorial] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [style, setStyle] = useState("");

  useEffect(() => {
    const root = localStorage.getItem("root");
    if (root === "true") {
      setIsRoot(true);
    } else {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        author,
        editorial,
        coverImage,
        synopsis,
        style,
      }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Error al guardar el libro");
    }
  };

  if (!isRoot) return null;

  return (
    <main className="min-h-screen bg-[#f5efe4] px-6 py-12 text-neutral-900">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-8 text-center">
          Agregar nuevo libro
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#fcf8ed] p-6 rounded-xl shadow border border-neutral-300"
        >
          {[
            {
              label: "Título",
              value: title,
              onChange: setTitle,
              placeholder: "Título del libro",
              required: true,
            },
            {
              label: "Autor",
              value: author,
              onChange: setAuthor,
              placeholder: "Autor",
              required: true,
            },
            {
              label: "Editorial",
              value: editorial,
              onChange: setEditorial,
              placeholder: "Editorial",
              required: true,
            },
            {
              label: "URL de la tapa (coverImage)",
              value: coverImage,
              onChange: setCoverImage,
              placeholder: "https://...",
            },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full p-2 border border-neutral-300 rounded bg-[#fffaf2] focus:outline-none focus:ring-2 focus:ring-neutral-400"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">Sinopsis</label>
            <textarea
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              rows={6}
              placeholder="Breve resumen del libro"
              required
              className="w-full p-2 border border-neutral-300 rounded bg-[#fffaf2] focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estilos</label>
            <input
              type="text"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              placeholder='Ejemplo: ["novela", "ficción"]'
              className="w-full p-2 border border-neutral-300 rounded bg-[#fffaf2] focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-5 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition"
            >
              Guardar libro
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
