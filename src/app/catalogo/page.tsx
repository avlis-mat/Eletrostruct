import { Navbar } from "~/_components/Navbar";
import { Footer } from "~/_components/Footer";
import { AddToCartButton } from "~/_components/AddToCartButton";
import { db } from "~/server/db";
import Link from "next/link";

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const produtos = await db.produto.findMany({
    where: q
      ? {
          OR: [
            { nome: { contains: q } },
            { descricao: { contains: q } },
          ],
        }
      : undefined,
    orderBy: { nome: "asc" },
    include: { categorias: true },
  });

  return (
    <main className="--background min-h-screen">
      <Navbar />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="border-border/40 flex flex-col gap-2 rounded-lg border p-4"
          >
            <img
              src={produto.imagemUrl ?? ""}
              alt={produto.nome}
              className="h-40 w-full rounded object-cover"
            />
            <Link href={`/produto/${produto.id}`}>
              <h2 className="text-foreground font-medium">{produto.nome}</h2>
            </Link>
            <p className="text-muted-foreground text-sm">
              R$ {produto.preco.toFixed(2)}
            </p>
            <AddToCartButton produtoId={produto.id} />
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}