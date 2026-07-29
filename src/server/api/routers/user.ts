import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const userRouter = createTRPCRouter({
  criar: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        endereco: z.string().min(1),
        cpf: z.string().min(1),
        email: z.string().email(),
        senha: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const new_user = await ctx.db.user.create({
        data: input,
      });
      return new_user; // tipado de ponta a ponta
    }),
});