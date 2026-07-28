import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const itemCarrinhoRouter = createTRPCRouter({
  listar: protectedProcedure.query(({ ctx }) => {
    return ctx.db.itemCarrinho.findMany({
      where: { usuarioId: ctx.session.user.id },
      include: { produto: true },
      orderBy: { criadoEm: "desc" },
    });
  }),

  adicionar: protectedProcedure
    .input(z.object({ produtoId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const existente = await ctx.db.itemCarrinho.findUnique({
        where: {
          usuarioId_produtoId: {
            usuarioId: ctx.session.user.id,
            produtoId: input.produtoId,
          },
        },
      });

      if (existente) {
        return ctx.db.itemCarrinho.update({
          where: { id: existente.id },
          data: { quantidade: existente.quantidade + 1 },
        });
      }

      return ctx.db.itemCarrinho.create({
        data: {
          usuarioId: ctx.session.user.id,
          produtoId: input.produtoId,
          quantidade: 1,
        },
      });
    }),

  atualizarQuantidade: protectedProcedure
    .input(z.object({ id: z.number(), quantidade: z.number().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.itemCarrinho.updateMany({
        where: { id: input.id, usuarioId: ctx.session.user.id },
        data: { quantidade: input.quantidade },
      });
    }),

  remover: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.itemCarrinho.deleteMany({
        where: { id: input.id, usuarioId: ctx.session.user.id },
      });
    }),
});
