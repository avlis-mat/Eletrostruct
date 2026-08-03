import { notFound } from "next/navigation";
import { Navbar } from "~/_components/Navbar";
import { Footer } from "~/_components/Footer";
import { AddToCartButton } from "~/_components/AddToCartButton";
import { db } from "~/server/db";
import { ComentarioForm } from "~/_components/ComentarioForm";

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produto = await db.produto.findUnique({
    where: { id: Number(id) },
    include: {
        categorias: true,
        comentarios: {
            include: { usuario: true },
            orderBy: { criadoEm: "desc" },
        }
    },
  });

  if (!produto) notFound();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <img src={produto.imagemUrl ?? ""} alt={produto.nome} className="mb-4 h-64 w-full max-w-md rounded object-cover" />
        <h1>{produto.nome}</h1>
        <p>{produto.descricao}</p>
        <p>R$ {produto.preco.toFixed(2)}</p>
        <AddToCartButton produtoId={produto.id} />
        <section className="mt-10">
            <h2 className="mb-4 text-xl font-bold">Comentários</h2>

            <ComentarioForm produtoId={produto.id} />

            <div className="mt-6 flex flex-col gap-4">
                {produto.comentarios.length === 0 && (
                    <p className="text-muted-foreground">
                        Nenhum comentário ainda.
                    </p>
                )}

                {produto.comentarios.map((comentario) => (
                    <div key={comentario.id} className="rounded border p-3">
                        <p className="text-sm font-medium">
                            {comentario.usuario.name ?? comentario.usuario.email ?? "Usuário"}
                        </p>
                        <p className="mt-1">{comentario.texto}</p>
                        <p className="text-muted-foreground mt-1 text-xs">
                            {comentario.criadoEm.toLocaleDateString("pt-BR")}
                        </p>
                    </div>
                ))}
            </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
