import { redirect } from "next/navigation";
import { Navbar } from "~/_components/Navbar";
import { Footer } from "~/_components/Footer";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function CarrinhoPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const itens = await db.itemCarrinho.findMany({
    where: { usuarioId: session.user.id },
    include: { produto: true },
  });

  return (
    <main className="--background min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-32">
        <h1 className="text-foreground text-center text-[150px]">
          <span className="text-green-400">{"{"}</span>
          Carrinho Page
          <span className="text-green-400">{"}"}</span>
        </h1>
      </div>

      <div>
        {itens.map((item) => (
          <div key={item.id}>
            <img
              src={item.produto.imagemUrl ?? ""}
              alt={item.produto.nome}
              width={200}
            />
            <h2>{item.produto.nome}</h2>
            <p>Quantidade: {item.quantidade}</p>
            <p>Valor: R$ {item.produto.preco}</p>
            <hr />
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}
