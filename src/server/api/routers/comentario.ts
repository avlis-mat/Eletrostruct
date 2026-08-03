import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const comentarioRouter = createTRPCRouter({
  listar: publicProcedure
    .input(z.object({ produtoId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.comentario.findMany({
        where: { produtoId: input.produtoId },
        include: { usuario: true },
        orderBy: { criadoEm: "desc" },
      });
    }),

  criar: protectedProcedure
    .input(
      z.object({
        produtoId: z.number(),
        texto: z.string().min(1, "Comentário não pode ser vazio"),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.comentario.create({
        data: {
          texto: input.texto,
          produtoId: input.produtoId,
          usuarioId: ctx.session.user.id,
        },
        include: { usuario: true },
      });
    }),
});