import Link from "next/link";

const secoes = [
  {
    href: "/admin/categorias",
    titulo: "Categorias",
    descricao: "Criar, editar e remover categorias de produtos.",
  },
  {
    href: "/admin/produtos",
    titulo: "Produtos",
    descricao: "Gerenciar o catálogo de produtos e suas categorias.",
  },
  {
    href: "/admin/usuarios",
    titulo: "Usuários",
    descricao:
      "Ver usuários, desbloquear contas e gerenciar permissões de admin.",
  },
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-foreground mb-6 text-2xl font-bold">
        Painel de administração
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {secoes.map((secao) => (
          <Link
            key={secao.href}
            href={secao.href}
            className="border-border/40 hover:border-primary rounded-lg border p-4 transition-colors"
          >
            <h2 className="text-foreground font-medium">{secao.titulo}</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {secao.descricao}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
