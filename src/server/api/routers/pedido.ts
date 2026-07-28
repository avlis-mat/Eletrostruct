import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const pedidoRouter = createTRPCRouter({
  listar: protectedProcedure.query(({ ctx }) => {
    return ctx.db.pedido.findMany({
      where: { usuarioId: ctx.session.user.id },
      include: { itens: { include: { produto: true } } },
      orderBy: { criadoEm: "desc" },
    });
  }),

  finalizar: protectedProcedure.mutation(async ({ ctx }) => {
    const itensCarrinho = await ctx.db.itemCarrinho.findMany({
      where: { usuarioId: ctx.session.user.id },
      include: { produto: true },
    });

    if (itensCarrinho.length === 0) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Carrinho vazio" });
    }

    return ctx.db.$transaction(async (tx) => {
      const pedido = await tx.pedido.create({
        data: {
          usuarioId: ctx.session.user.id,
          itens: {
            create: itensCarrinho.map((item) => ({
              produtoId: item.produtoId,
              quantidade: item.quantidade,
              precoFixo: item.produto.preco,
            })),
          },
        },
        include: { itens: true },
      });

      await tx.itemCarrinho.deleteMany({
        where: { usuarioId: ctx.session.user.id },
      });

      return pedido;
    });
  }),
});
