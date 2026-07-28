import { redirect } from "next/navigation";
import { Navbar } from "~/_components/Navbar";
import { Footer } from "~/_components/Footer";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function PedidosPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const pedidos = await db.pedido.findMany({
    where: { usuarioId: session.user.id },
    include: { itens: { include: { produto: true } } },
    orderBy: { criadoEm: "desc" },
  });

  return (
    <main className="--background min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-foreground mb-6 text-2xl font-bold">
          Meus Pedidos
        </h1>

        {pedidos.length === 0 && (
          <p className="text-muted-foreground">
            Você ainda não fez nenhum pedido.
          </p>
        )}

        {pedidos.map((pedido) => {
          const total = pedido.itens.reduce(
            (soma, item) => soma + item.precoFixo * item.quantidade,
            0,
          );

          return (
            <div
              key={pedido.id}
              className="border-border/40 mb-6 rounded-lg border p-4"
            >
              <p className="text-muted-foreground text-sm">
                Pedido #{pedido.id} —{" "}
                {pedido.criadoEm.toLocaleDateString("pt-BR")}
              </p>
              <ul className="divide-border/40 mt-2 divide-y">
                {pedido.itens.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between py-2 text-sm"
                  >
                    <span className="text-foreground">
                      {item.quantidade}x {item.produto.nome}
                    </span>
                    <span className="text-muted-foreground">
                      R$ {(item.precoFixo * item.quantidade).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground mt-2 text-right font-medium">
                Total: R$ {total.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      <Footer />
    </main>
  );
}
