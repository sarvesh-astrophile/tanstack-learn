import { protectedProcedure, publicProcedure, router } from "@/lib/trpc";
import { todoRouter } from "@/routers/todo";

export const appRouter = router({
    healthCheck: publicProcedure.query(async () => {
        return {
            status: "OK",
        };
    }),

    pirvateData: protectedProcedure.query(async ({ ctx }) => {
        return {
            message: "This is private",
            user: ctx.session.user,
        };
    }),

    todo: todoRouter,
});

export type AppRouter = typeof appRouter;