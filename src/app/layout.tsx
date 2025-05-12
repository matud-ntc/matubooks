import './globals.css';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Biblioteca',
  description: 'Mi colección de libros personales',
  icons: {
    icon: '/images/matubookslogo.png',
    apple: '/images/matubookslogo.png',
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
        <header className="bg-[#f5efe4] px-6 py-4 shadow-sm">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
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
        </header>
        {children}
      </body>
    </html>
  );
}
