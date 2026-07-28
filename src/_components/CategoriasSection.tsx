import Link from "next/link";
import { db } from "~/server/db";

export async function CategoriasSection() {
  const categorias = await db.categoria.findMany({
    orderBy: { nome: "asc" },
  });

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="text-foreground mb-6 text-2xl font-bold">Categorias</h2>
      <div className="flex flex-wrap gap-3">
        {categorias.map((categoria) => (
          <Link
            key={categoria.id}
            href={`/catalogo?categoria=${categoria.id}`}
            className="border-border/40 text-muted-foreground hover:border-primary hover:text-primary rounded-full border px-4 py-2 text-sm transition-colors"
          >
            {categoria.nome}
          </Link>
        ))}
      </div>
    </section>
  );
}
