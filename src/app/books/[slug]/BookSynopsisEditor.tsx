"use client";

import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

export default function BookSynopsisEditor({
  initialSynopsis,
  bookId,
}: {
  initialSynopsis: string;
  bookId: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [synopsis, setSynopsis] = useState(initialSynopsis);
  const [newSynopsis, setNewSynopsis] = useState(initialSynopsis);
  const [isRoot, setIsRoot] = useState(false);

  useEffect(() => {
    const root = localStorage.getItem("root");
    setIsRoot(root === "true");
  }, []);

  const saveSynopsis = async () => {
    const res = await fetch(`/api/books/${bookId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ synopsis: newSynopsis }),
    });

    if (res.ok) {
      setSynopsis(newSynopsis);
      setIsEditing(false);
    } else {
      alert("Error al guardar");
    }
  };

  if (!isRoot)
    return (
      <p className="text-base leading-relaxed text-justify whitespace-pre-line mb-6">
        {synopsis}
      </p>
    );

  return (
    <div className="mb-6">
      {!isEditing ? (
        <>
          <p className="text-base leading-relaxed text-justify whitespace-pre-line mb-2">
            {synopsis}
          </p>
          <div className="text-right">
            <button
              onClick={() => setIsEditing(true)}
              className="text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-1 text-sm"
              aria-label="Editar sinopsis"
            >
              <Pencil size={16} />
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <textarea
            className="w-full p-2 border rounded bg-[#fffaf2]"
            value={newSynopsis}
            onChange={(e) => setNewSynopsis(e.target.value)}
            rows={6}
          />
          <div className="text-right">
            <button
              onClick={saveSynopsis}
              className="px-4 py-2 border text-sm rounded hover:bg-neutral-300 transition"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
