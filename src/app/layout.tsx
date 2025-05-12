import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header"; // Asegurate de que exista ese archivo

export const metadata: Metadata = {
  title: "Matubooks",
  description: "Mi colección de libros",
  icons: {
    icon: "/images/matubookslogo.png",
    apple: "/images/matubookslogo.png",
  },
  themeColor: "#c96f4b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f5efe4" />
      </head>
      <body className="bg-[#f5efe4] text-neutral-900 font-serif">
        <Header />
        {children}
      </body>
    </html>
  );
}
