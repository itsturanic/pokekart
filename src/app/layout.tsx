import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "PokeKart — Sanal Kart Vitrini",
  description: "Paket aç, kart topla, jetonla oyna. Gerçek para geçmez.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pb-24">{children}</main>
      </body>
    </html>
  );
}
