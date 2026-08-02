import { notFound } from "next/navigation";
import { Navbar } from "~/_components/Navbar";
import { Footer } from "~/_components/Footer";
import { AddToCartButton } from "~/_components/AddToCartButton";
import { db } from "~/server/db";

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produto = await db.produto.findUnique({
    where: { id: Number(id) },
    include: { categorias: true },
  });

  if (!produto) notFound();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <img src={produto.imagemUrl ?? ""} alt={produto.nome} />
        <h1>{produto.nome}</h1>
        <p>{produto.descricao}</p>
        <p>R$ {produto.preco.toFixed(2)}</p>
        <AddToCartButton produtoId={produto.id} />
      </div>
      <Footer />
    </main>
  );
}