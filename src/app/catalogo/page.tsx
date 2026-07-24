"use client";

import Link from "next/link";
import { Navbar } from "~/_components/Navbar";
import { Footer } from "~/_components/Footer";

export default function CatalogoPage() {
  return (
    <main className="--background min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-32">
        <h1 className="text-foreground text-center text-[150px]">
          <span className="text-green-400">{"{"}</span>
          Catalogo Page
          <span className="text-green-400">{"}"}</span>
        </h1>
      </div>

      <Footer />
    </main>
  );
}
