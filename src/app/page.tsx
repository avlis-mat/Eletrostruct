import { CategoriasSection } from "~/_components/CategoriasSection";
import { Footer } from "~/_components/Footer";
import { HeroBanner } from "~/_components/HeroBanner";
import { Navbar } from "~/_components/Navbar";
import { ProdutosDestaque } from "~/_components/ProdutosDestaque";

export default function HomePage() {
  return (
    <main className="--background min-h-screen">
      <Navbar />
      <HeroBanner />
      <CategoriasSection />
      <ProdutosDestaque />
      <Footer />
    </main>
  );
}
