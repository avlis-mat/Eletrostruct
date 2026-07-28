"use client";

import { useState, type FormEvent } from "react";
import { api } from "~/trpc/react";

type FormState = {
  nome: string;
  descricao: string;
  preco: string;
  imagemUrl: string;
  categoriaIds: number[];
};

const formVazio: FormState = {
  nome: "",
  descricao: "",
  preco: "",
  imagemUrl: "",
  categoriaIds: [],
};

export default function ProdutosPage() {
  const [form, setForm] = useState<FormState>(formVazio);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const utils = api.useUtils();
  const produtos = api.produto.listar.useQuery();
  const categorias = api.categoria.listar.useQuery();

  function resetForm() {
    setForm(formVazio);
    setEditandoId(null);
  }

  const criar = api.produto.criar.useMutation({
    onSuccess: async () => {
      resetForm();
      setErro(null);
      await utils.produto.listar.invalidate();
    },
    onError: (e) => setErro(e.message),
  });

  const atualizar = api.produto.atualizar.useMutation({
    onSuccess: async () => {
      resetForm();
      setErro(null);
      await utils.produto.listar.invalidate();
    },
    onError: (e) => setErro(e.message),
  });

  const remover = api.produto.remover.useMutation({
    onSuccess: async () => {
      setErro(null);
      await utils.produto.listar.invalidate();
    },
    onError: (e) => setErro(e.message),
  });

  function toggleCategoria(id: number) {
    setForm((f) => ({
      ...f,
      categoriaIds: f.categoriaIds.includes(id)
        ? f.categoriaIds.filter((cid) => cid !== id)
        : [...f.categoriaIds, id],
    }));
  }

  function iniciarEdicao(produto: NonNullable<typeof produtos.data>[number]) {
    setEditandoId(produto.id);
    setForm({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: String(produto.preco),
      imagemUrl: produto.imagemUrl ?? "",
      categoriaIds: produto.categorias.map((c) => c.id),
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = {
      nome: form.nome,
      descricao: form.descricao,
      preco: Number(form.preco),
      imagemUrl: form.imagemUrl || undefined,
      categoriaIds: form.categoriaIds,
    };

    if (editandoId) {
      atualizar.mutate({ id: editandoId, ...payload });
    } else {
      criar.mutate(payload);
    }
  }

  const salvando = criar.isPending || atualizar.isPending;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-foreground mb-6 text-2xl font-bold">Produtos</h1>

      {erro && (
        <p className="border-destructive/40 bg-destructive/10 text-destructive mb-4 rounded-lg border px-3 py-2 text-sm">
          {erro}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="border-border/40 mb-10 flex flex-col gap-3 rounded-lg border p-4"
      >
        <input
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          placeholder="Nome"
          className="border-border bg-background text-foreground rounded-lg border px-3 py-2 text-sm"
        />
        <textarea
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          placeholder="Descrição"
          className="border-border bg-background text-foreground rounded-lg border px-3 py-2 text-sm"
        />
        <input
          value={form.preco}
          onChange={(e) => setForm({ ...form, preco: e.target.value })}
          placeholder="Preço"
          type="number"
          step="0.01"
          className="border-border bg-background text-foreground rounded-lg border px-3 py-2 text-sm"
        />
        <input
          value={form.imagemUrl}
          onChange={(e) => setForm({ ...form, imagemUrl: e.target.value })}
          placeholder="URL da imagem (opcional)"
          className="border-border bg-background text-foreground rounded-lg border px-3 py-2 text-sm"
        />

        <div className="flex flex-wrap gap-3">
          {categorias.data?.map((categoria) => (
            <label
              key={categoria.id}
              className="text-muted-foreground flex items-center gap-1.5 text-sm"
            >
              <input
                type="checkbox"
                checked={form.categoriaIds.includes(categoria.id)}
                onChange={() => toggleCategoria(categoria.id)}
              />
              {categoria.nome}
            </label>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={salvando}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {editandoId ? "Salvar alterações" : "Adicionar produto"}
          </button>
          {editandoId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-muted-foreground text-sm"
            >
              Cancelar edição
            </button>
          )}
        </div>
      </form>

      {produtos.isLoading && (
        <p className="text-muted-foreground">Carregando...</p>
      )}

      <ul className="divide-border/40 divide-y">
        {produtos.data?.map((produto) => (
          <li
            key={produto.id}
            className="flex items-center justify-between py-3"
          >
            <div>
              <p className="text-foreground font-medium">{produto.nome}</p>
              <p className="text-muted-foreground text-sm">
                R$ {produto.preco.toFixed(2)} ·{" "}
                {produto.categorias.map((c) => c.nome).join(", ")}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => iniciarEdicao(produto)}
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => remover.mutate({ id: produto.id })}
                className="text-muted-foreground hover:text-destructive text-sm transition-colors"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
