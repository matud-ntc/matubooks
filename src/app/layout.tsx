import './globals.css';
import type { Metadata } from 'next';
import Head from 'next/head';

// layout.tsx
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
      <Head>
        <link rel="icon" href="/images/matubookslogo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/matubookslogo.png" />
        <meta name="theme-color" content="#f5efe4" />
      </Head>
      <body className="bg-[#fefbf6] text-neutral-900 font-serif">{children}</body>
    </html>
  );
}
