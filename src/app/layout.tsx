// src/app/layout.tsx
"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/productos", label: "Productos" },
    { href: "/deudas", label: "Deudas" },
    { href: "/caja", label: "Caja" },
  ];

  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-8">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-12 w-auto"
              />
            </Link>

            {/* LINKS */}
            <div className="flex items-center gap-6">
              {links.map((link) => {
                const isActive = pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      relative px-3 py-2 font-medium cursor-pointer transition-colors duration-200
                      ${isActive ? "text-emerald-700" : "text-slate-700 hover:text-emerald-600"}
                    `}
                  >
                    {link.label}

                    <span
                      className={`
                        absolute left-0 -bottom-1 h-[2px] bg-emerald-600 transition-all duration-300
                        ${isActive ? "w-full" : "w-0"}
                      `}
                    ></span>
                  </Link>
                );
              })}
            </div>

          </nav>
        </header>


        <main className="max-w-5xl mx-auto p-4 pb-24">{children}</main>

        <footer className="fixed bottom-0 left-0 w-full bg-white border-t z-30">
          <div
            className="
              max-w-5xl mx-auto px-4 py-3 text-sm text-slate-500
              flex flex-col gap-2
              sm:flex-row sm:justify-between sm:items-center
            "
          >
            <span className="text-center sm:text-left">
              © 2025 Ezequiel Arce
            </span>

            <div
              className="
                flex flex-col gap-1 text-center
                sm:flex-row sm:gap-6 sm:text-right
              "
            >
              <span>Tel: 2920 248803</span>

              <span className="break-all sm:break-normal">
                Email: ezequielagustinarce1@gmail.com
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
