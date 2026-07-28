import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const produtoInput = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  preco: z.number().positive("Preço deve ser maior que zero"),
  imagemUrl: z.string().optional(),
  categoriaIds: z.array(z.number()).min(1, "Selecione ao menos uma categoria"),
});

export const produtoRouter = createTRPCRouter({
  listar: publicProcedure.query(({ ctx }) => {
    return ctx.db.produto.findMany({
      orderBy: { nome: "asc" },
      include: { categorias: true },
    });
  }),

  criar: protectedProcedure.input(produtoInput).mutation(({ ctx, input }) => {
    const { categoriaIds, ...data } = input;
    return ctx.db.produto.create({
      data: {
        ...data,
        categorias: { connect: categoriaIds.map((id) => ({ id })) },
      },
    });
  }),

  atualizar: protectedProcedure
    .input(produtoInput.extend({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      const { id, categoriaIds, ...data } = input;
      return ctx.db.produto.update({
        where: { id },
        data: {
          ...data,
          categorias: { set: categoriaIds.map((cid) => ({ id: cid })) },
        },
      });
    }),

  remover: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.produto.delete({ where: { id: input.id } });
    }),
});
