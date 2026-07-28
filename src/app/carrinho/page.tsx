import { redirect } from "next/navigation";
import { Navbar } from "~/_components/Navbar";
import { Footer } from "~/_components/Footer";
import { CarrinhoLista } from "~/_components/CarrinhoLista";
import { auth } from "~/server/auth";

export default async function CarrinhoPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="--background min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center justify-center pt-32">
        <h1 className="text-foreground text-center text-4xl">
          <span className="text-green-400">{"{"}</span>
          Carrinho Page
          <span className="text-green-400">{"}"}</span>
        </h1>
      </div>

      <CarrinhoLista />

      <Footer />
    </main>
  );
}
