import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const itemRouter = router({
  addItem: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name } = input;

      const item = await ctx.prisma.shoppingItem.create({
        data: {
          name,
        },
      });
      return item;
    }),
  deleteItem: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const item = await ctx.prisma.shoppingItem.delete({
        where: {
          id,
        },
      });
      return item;
    }),
  checkItem: publicProcedure
    .input(
      z.object({
        id: z.string(),
        checked: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, checked } = input;

      const item = await ctx.prisma.shoppingItem.update({
        data: {
          checked,
        },
        where: {
          id,
        },
      });
      return item;
    }),
  getAllItems: publicProcedure.query(async ({ ctx }) => {
    const items = ctx.prisma.shoppingItem.findMany();
    return items;
  }),
});
