import { CategoriasSection } from "~/_components/CategoriasSection";
import { Footer } from "~/_components/Footer";
import { HeroBanner } from "~/_components/HeroBanner";
import { Navbar } from "~/_components/Navbar";
import { ProdutosDestaque } from "~/_components/ProdutosDestaque";
import { auth } from "~/server/auth";

export default async function HomePage() {
  const session = await auth();
  const headersModule = await import("next/headers");
  const displayName =
    session?.user?.name ?? session?.user?.email?.split("@")[0] ?? null;

  return (
    <main className="--background min-h-screen">
      <Navbar />

      {session && (
        <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
            <p className="font-semibold text-green-700 dark:text-green-300">
              Você está logado como{" "}
              <span className="font-bold">{displayName}</span>
            </p>
          </div>
        </div>
      )}

      <HeroBanner />
      <CategoriasSection />
      <ProdutosDestaque />
      <Footer />
    </main>
  );
}
