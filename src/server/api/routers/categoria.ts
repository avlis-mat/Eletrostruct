import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const categoriaRouter = createTRPCRouter({
  listar: publicProcedure.query(({ ctx }) => {
    return ctx.db.categoria.findMany({ orderBy: { nome: "asc" } });
  }),

  criar: protectedProcedure
    .input(z.object({ nome: z.string().min(1, "Nome é obrigatório") }))
    .mutation(({ ctx, input }) => {
      return ctx.db.categoria.create({ data: input });
    }),

  atualizar: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        nome: z.string().min(1, "Nome é obrigatório"),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.categoria.update({
        where: { id: input.id },
        data: { nome: input.nome },
      });
    }),

  remover: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.categoria.delete({ where: { id: input.id } });
    }),
});
