"use client";
import { useState, useEffect } from "react";

export default function ReadToggle({
  initialRead,
  bookId,
}: {
  initialRead: boolean;
  bookId: number;
}) {
  const [isRead, setIsRead] = useState(initialRead);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("auth") === "true");
  }, []);

  const handleCheck = async () => {
    const res = await fetch(`/api/books/${bookId}/read`, { method: "POST" });
    if (res.ok) setIsRead(true);
  };

  if (!loggedIn) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {isRead ? (
        <span className="text-sm text-neutral-600 italic">Leído</span>
      ) : (
        <>
          <input
            type="checkbox"
            checked={isRead}
            onChange={handleCheck}
            className="w-5 h-5 text-neutral-800 border-neutral-500 rounded focus:ring-neutral-600 accent-neutral-700"
          />
          <label className="text-sm text-neutral-800">Marcar como leído</label>
        </>
      )}
    </div>
  );
}
