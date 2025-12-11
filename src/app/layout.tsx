// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-4">
            <Link href="/productos" className="px-3 py-2 rounded-md hover:bg-slate-100 cursor-pointer">Productos</Link>
            <Link href="/deudas" className="px-3 py-2 rounded-md hover:bg-slate-100 cursor-pointer">Deudas</Link>
            <Link href="/caja" className="px-3 py-2 rounded-md hover:bg-slate-100 cursor-pointer">Caja</Link>
          </nav>
        </header>

        <main className="max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
