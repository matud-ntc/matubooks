import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biblioteca',
  description: 'Mi colección de libros personales',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#fefbf6] text-neutral-900 font-serif">{children}</body>
    </html>
  );
}
