"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LoginModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("root", "true");
      onSuccess();
      onClose();
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#f5efe4]/60 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
        className="bg-[#fcf8ed] rounded-xl p-6 shadow-md w-full max-w-sm border border-neutral-300"
      >
        <h2 className="text-xl font-semibold mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded bg-[#fffaf2] focus:outline-none focus:ring-2 focus:ring-neutral-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded bg-[#fffaf2] focus:outline-none focus:ring-2 focus:ring-neutral-400"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-4 py-2 border border-neutral-400 text-neutral-800 rounded hover:bg-neutral-200 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="text-sm px-4 py-2 border border-neutral-700 text-neutral-900 rounded hover:bg-neutral-300 transition"
            >
              Entrar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
