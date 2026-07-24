"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Navbar } from "~/_components/Navbar";
import { Footer } from "~/_components/Footer";
import { HeroBanner } from "~/_components/HeroBanner";

export default function HomePage() {
  return (
    <main className="--background flex min-h-screen flex-col">
      <Navbar />
      <HeroBanner />
      <Footer />
    </main>
  );
}
