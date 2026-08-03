"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function AddToCartButton({ produtoId }: { produtoId: number }) {
  const router = useRouter();
  const utils = api.useUtils();

  const adicionar = api.itemCarrinho.adicionar.useMutation({
    onSuccess: async () => {
      await utils.itemCarrinho.listar.invalidate();
    },
    onError: (e) => {
      if (e.data?.code === "UNAUTHORIZED") {
        router.push("/login");
        return;
      }
      console.error("Erro ao adicionar ao carrinho:", e.message);
    },
  });

  return (
    <button
      onClick={() => adicionar.mutate({ produtoId })}
      disabled={adicionar.isPending}
      className="cursor-pointer rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
    >
      {adicionar.isPending ? "Adicionando..." : "Adicionar"}
    </button>
  );
}
