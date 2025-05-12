import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header"; // Asegurate de que exista ese archivo

export const metadata: Metadata = {
  title: "Biblioteca",
  description: "Mi colección de libros personales",
  icons: {
    icon: "/images/matubookslogo.png",
    apple: "/images/matubookslogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#f5efe4] text-neutral-900 font-serif">
        <Header />
        {children}
      </body>
    </html>
  );
}
