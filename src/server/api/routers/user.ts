import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const userRouter = createTRPCRouter({
  criar: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        endereco: z.string().min(1),
        cpf: z.string().min(1),
        email: z.string().email().toLowerCase(),
        senha: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existente = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existente) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Já existe uma conta com esse e-mail.",
        });
      }

      const hashedPassword = await bcrypt.hash(input.senha, 10);

      const new_user = await ctx.db.user.create({
        data: {
          ...input,
          senha: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return new_user; // tipado de ponta a ponta
    }),
});
