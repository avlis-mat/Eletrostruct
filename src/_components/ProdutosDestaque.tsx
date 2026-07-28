import Link from "next/link";
import { AddToCartButton } from "~/_components/AddToCartButton";
import { db } from "~/server/db";

export async function ProdutosDestaque() {
  const produtos = await db.produto.findMany({
    take: 6,
    orderBy: { criadoEm: "desc" },
  });

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-foreground text-2xl font-bold">
          Produtos em destaque
        </h2>
        <Link href="/catalogo" className="text-primary text-sm hover:underline">
          Ver catálogo completo →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <h3 className="text-foreground font-medium">{produto.nome}</h3>
            <p className="text-muted-foreground text-sm">
              R$ {produto.preco.toFixed(2)}
            </p>
            <AddToCartButton produtoId={produto.id} />
          </div>
        ))}
      </div>
    </section>
  );
}
