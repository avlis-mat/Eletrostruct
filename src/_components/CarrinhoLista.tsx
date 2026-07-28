"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function CarrinhoLista() {
  const router = useRouter();
  const utils = api.useUtils();
  const itens = api.itemCarrinho.listar.useQuery();

  const atualizarQuantidade = api.itemCarrinho.atualizarQuantidade.useMutation({
    onSuccess: () => utils.itemCarrinho.listar.invalidate(),
  });

  const remover = api.itemCarrinho.remover.useMutation({
    onSuccess: () => utils.itemCarrinho.listar.invalidate(),
  });

  const finalizar = api.pedido.finalizar.useMutation({
    onSuccess: async () => {
      await utils.itemCarrinho.listar.invalidate();
      router.push("/pedidos");
    },
  });

  if (itens.isLoading) {
    return <p className="text-muted-foreground text-center">Carregando...</p>;
  }

  if (itens.data?.length === 0) {
    return (
      <p className="text-muted-foreground text-center">
        Seu carrinho está vazio.
      </p>
    );
  }

  const total =
    itens.data?.reduce(
      (soma, item) => soma + item.produto.preco * item.quantidade,
      0,
    ) ?? 0;

  return (
    <div className="mx-auto max-w-2xl px-4">
      {itens.data?.map((item) => (
        <div key={item.id} className="flex items-center gap-4 py-4">
          <img
            src={item.produto.imagemUrl ?? ""}
            alt={item.produto.nome}
            width={80}
          />

          <div className="flex-1">
            <h2 className="text-foreground">{item.produto.nome}</h2>
            <p className="text-muted-foreground text-sm">
              R$ {item.produto.preco.toFixed(2)}
            </p>
          </div>

          <input
            type="number"
            min={1}
            value={item.quantidade}
            onChange={(e) =>
              atualizarQuantidade.mutate({
                id: item.id,
                quantidade: Number(e.target.value) || 1,
              })
            }
            className="border-border bg-background text-foreground w-16 rounded-lg border px-2 py-1 text-sm"
          />

          <button
            onClick={() => remover.mutate({ id: item.id })}
            className="text-muted-foreground hover:text-destructive text-sm"
          >
            Remover
          </button>

          <hr className="border-border/40" />
        </div>
      ))}
      <div className="border-border/40 mt-6 flex items-center justify-between border-t pt-4">
        <p className="text-foreground text-lg font-medium">
          Total: R$ {total.toFixed(2)}
        </p>
        <button
          onClick={() => finalizar.mutate()}
          disabled={finalizar.isPending}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
        >
          {finalizar.isPending ? "Finalizando..." : "Finalizar pedido"}
        </button>
      </div>
    </div>
  );
}
