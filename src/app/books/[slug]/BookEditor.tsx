"use client";

import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

type BookEditorProps = {
  bookId: number;
  initialTitle: string;
  initialAuthor: string;
  initialEditorial: string;
  initialSynopsis: string;
  initialCoverImage: string;
  initialStyle: string[];
};

export default function BookEditor({
  bookId,
  initialTitle,
  initialAuthor,
  initialEditorial,
  initialSynopsis,
  initialCoverImage,
  initialStyle,
}: BookEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isRoot, setIsRoot] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    title: initialTitle,
    author: initialAuthor,
    editorial: initialEditorial,
    synopsis: initialSynopsis,
    coverImage: initialCoverImage,
    style: initialStyle.join(", "),
  });

  useEffect(() => {
    setIsRoot(localStorage.getItem("root") === "true");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const styleArray = form.style
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const res = await fetch(`/api/books/${bookId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        author: form.author,
        editorial: form.editorial,
        synopsis: form.synopsis,
        coverImage: form.coverImage,
        style: styleArray,
      }),
    });

    setSaving(false);
    if (res.ok) {
      setIsEditing(false);
      router.refresh();
    } else {
      alert("Error al guardar");
    }
  };

  if (!isRoot) return null;

  if (!isEditing) {
    return (
      <div className="mt-6 text-right">
        <button
          onClick={() => setIsEditing(true)}
          className="text-neutral-500 hover:text-neutral-800 inline-flex items-center gap-1 text-sm border border-neutral-300 px-3 py-1.5 rounded-md hover:bg-neutral-100 transition"
        >
          <Pencil size={14} />
          Editar libro
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 text-left border border-neutral-300 rounded-xl p-6 bg-[#fffaf2] space-y-4">
      <h3 className="text-lg font-semibold text-neutral-800 mb-2">Editar libro</h3>

      <div>
        <label className="block text-sm text-neutral-600 mb-1">Título</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm bg-white"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-600 mb-1">Autor</label>
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm bg-white"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-600 mb-1">Editorial</label>
        <input
          name="editorial"
          value={form.editorial}
          onChange={handleChange}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm bg-white"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-600 mb-1">URL de portada</label>
        <input
          name="coverImage"
          value={form.coverImage}
          onChange={handleChange}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm bg-white"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-600 mb-1">Estilos (separados por coma)</label>
        <input
          name="style"
          value={form.style}
          onChange={handleChange}
          placeholder="ej: Novela, Thriller, Histórico"
          className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm bg-white"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-600 mb-1">Sinopsis</label>
        <textarea
          name="synopsis"
          value={form.synopsis}
          onChange={handleChange}
          rows={5}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm bg-white"
        />
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <button
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 text-sm border border-neutral-300 rounded-md hover:bg-neutral-100 transition"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 text-sm bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </div>
  );
}
