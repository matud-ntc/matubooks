"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginModal from "./LoginModal";

export default function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRoot, setIsRoot] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const root = localStorage.getItem("root");
    setIsLoggedIn(auth === "true");
    setIsRoot(root === "true");
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    localStorage.removeItem("auth");
    localStorage.removeItem("root");
    setIsLoggedIn(false);
    setIsRoot(false);
  };

  return (
    <header className="bg-[#f5efe4] px-6 py-4 shadow-sm flex justify-between items-center">
      <Link
        href="/"
        className="flex items-center gap-3 hover:opacity-90 transition"
      >
        <Image
          src="/images/matubookslogo.png"
          alt="matubooks logo"
          width={64}
          height={64}
          className="rounded-md"
          priority
        />
        <span className="text-3xl font-bold hidden md:block">Matubooks</span>
      </Link>

      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <button
            onClick={() => setShowLoginModal(true)}
            className="text-sm px-4 py-2 border border-neutral-700 text-neutral-900 rounded hover:bg-neutral-200 transition"
          >
            Iniciar sesión
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 border border-[#c96f4b] text-neutral-900 rounded hover:bg-[#f1ded3] transition"
          >
            Cerrar sesión
          </button>
        )}
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => {
            setShowLoginModal(false);
            setIsLoggedIn(true);
            setIsRoot(true); // asumiendo que solo vos te logueás
          }}
        />
      )}
    </header>
  );
}
