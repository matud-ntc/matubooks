"use client";

import { useState, useEffect } from "react";

type Recommendation = {
  title: string;
  author: string;
  reason: string;
};

export default function BookRecommendations({ bookId }: { bookId: number }) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async (refresh = false) => {
    setLoading(true);
    setError("");
    try {
      const url = `/api/books/${bookId}/recommendations${refresh ? "?refresh=true" : ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRecommendations(data);
    } catch {
      setError("No se pudieron cargar las recomendaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [bookId]);

  return (
    <div className="mt-12 border-t border-neutral-200 pt-10">
      <h2 className="text-2xl font-serif font-bold mb-6 text-neutral-800">
        Libros similares
      </h2>

      {loading && (
        <div className="flex items-center gap-3 text-neutral-500 text-sm">
          <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
          Buscando recomendaciones...
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm">
          {error}{" "}
          <button onClick={load} className="underline">
            Reintentar
          </button>
        </p>
      )}

      {!loading && recommendations.length > 0 && (
        <>
          <ul className="space-y-4">
            {recommendations.map((rec, i) => (
              <li
                key={i}
                className="bg-[#fcf8ed] border border-neutral-200 rounded-xl px-5 py-4 text-left"
              >
                <p className="font-semibold text-neutral-900">{rec.title}</p>
                <p className="text-sm text-neutral-500 mt-0.5">{rec.author}</p>
                <p className="text-sm text-neutral-600 mt-2 italic">{rec.reason}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={() => load(true)}
            className="mt-6 text-sm text-neutral-500 hover:text-neutral-800 underline transition"
          >
            Pedir nuevas recomendaciones
          </button>
        </>
      )}
    </div>
  );
}
