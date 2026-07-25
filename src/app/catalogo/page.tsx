import Link from "next/link";
import Image from "next/image";
import { Navbar } from "~/_components/Navbar";
import { Footer } from "~/_components/Footer";
import { prisma } from "~/lib/prisma";

// async para poder esperar a resposta do banco
export default async function CatalogoPage() {
  // next.js busca no sqlite antes de renderizar a tela
  const produtos = await prisma.produto.findMany();

  return (
    <main className="--background min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-32">
        <h1 className="text-foreground text-center text-[150px]">
          <span className="text-green-400">{"{"}</span>
          Catalogo Page
          <span className="text-green-400">{"}"}</span>
        </h1>
      </div>

      {/* Listagem dos produtos */}
      <div>
        {produtos.map((produto) => (
          // cada produto fica dentro de uma div simples
          <div key={produto.id}>
            <img src={produto.imagemUrl || ""} alt={produto.nome} width={200} />

            <h2>{produto.nome}</h2>

            <p>Valor: R$ {produto.preco}</p>

            <button>Comprar</button>

            <hr />
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}
