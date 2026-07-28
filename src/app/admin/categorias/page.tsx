// src/app/admin/categorias/page.tsx
"use client";

import { useState } from "react";
import { Navbar } from "~/_components/Navbar";
import { api } from "~/trpc/react";

export default function CategoriasPage() {
  const [nome, setNome] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nomeEditado, setNomeEditado] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const utils = api.useUtils();
  const categorias = api.categoria.listar.useQuery();

  const criar = api.categoria.criar.useMutation({
    onSuccess: async () => {
      setNome("");
      setErro(null);
      await utils.categoria.listar.invalidate();
    },
    onError: (e) => setErro(e.message),
  });

  const atualizar = api.categoria.atualizar.useMutation({
    onSuccess: async () => {
      setEditandoId(null);
      setErro(null);
      await utils.categoria.listar.invalidate();
    },
    onError: (e) => setErro(e.message),
  });

  const remover = api.categoria.remover.useMutation({
    onSuccess: async () => {
      setErro(null);
      await utils.categoria.listar.invalidate();
    },
    onError: (e) => setErro(e.message),
  });

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Navbar />
      <h1 className="text-foreground mb-6 text-2xl font-bold">Categorias</h1>

      {erro && (
        <p className="border-destructive/40 bg-destructive/10 text-destructive mb-4 rounded-lg border px-3 py-2 text-sm">
          {erro}
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!nome.trim()) return;
          criar.mutate({ nome });
        }}
        className="mb-8 flex gap-2"
      >
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da categoria"
          className="border-border bg-background text-foreground flex-1 rounded-lg border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={criar.isPending}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
        >
          {" "}
          Adicionar
        </button>
      </form>

      {categorias.isLoading && (
        <p className="text-muted-foreground">Carregando...</p>
      )}

      <ul className="divide-border/40 divide-y">
        {categorias.data?.map((categoria) => (
          <li
            key={categoria.id}
            className="flex items-center justify-between gap-2 py-3"
          >
            {editandoId === categoria.id ? (
              <>
                <input
                  value={nomeEditado}
                  onChange={(e) => setNomeEditado(e.target.value)}
                  className="border-border bg-background text-foreground flex-1 rounded-lg border px-3 py-1.5 text-sm"
                  autoFocus
                />
                <button
                  onClick={() =>
                    atualizar.mutate({ id: categoria.id, nome: nomeEditado })
                  }
                  disabled={atualizar.isPending}
                  className="text-primary text-sm font-medium transition-colors disabled:opacity-50"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditandoId(null)}
                  className="text-muted-foreground text-sm transition-colors"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span className="text-foreground">{categoria.nome}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditandoId(categoria.id);
                      setNomeEditado(categoria.nome);
                    }}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => remover.mutate({ id: categoria.id })}
                    disabled={remover.isPending}
                    className="text-muted-foreground hover:text-destructive text-sm transition-colors disabled:opacity-50"
                  >
                    Remover
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
