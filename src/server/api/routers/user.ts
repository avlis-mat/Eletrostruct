import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
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

  listar: adminProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      orderBy: { email: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        bloqueado: true,
        tentativasLogin: true,
      },
    });
  }),

  desbloquear: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: input.id },
        data: { bloqueado: false, tentativasLogin: 0 },
      });
    }),

  alternarAdmin: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const usuario = await ctx.db.user.findUniqueOrThrow({
        where: { id: input.id },
      });
      return ctx.db.user.update({
        where: { id: input.id },
        data: { role: usuario.role === "ADMIN" ? "USER" : "ADMIN" },
      });
    }),
});
