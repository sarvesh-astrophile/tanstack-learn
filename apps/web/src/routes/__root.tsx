import { createRootRouteWithContext, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import appCss from "../index.css?url";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@server/routers";
import type { QueryClient } from "@tanstack/react-query";
import Header from "@/components/header";
import Loader from "@/components/loader";
import { Toaster } from "sonner";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export interface RouterAppContext {
    trpc: TRPCOptionsProxy<AppRouter>;
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()(
    {
        head: () => ({
            meta: [
                {
                    charSet: "utf-8",
                },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    title: "My App"
                }
            ],
            links: [
                {
                    rel: "stylesheet",
                    href: appCss,
                }
            ]
        }),
        component: RootDocument,
    }
)

function RootDocument() {
    const isFetching = useRouterState({ select: (s) => s.isLoading });
    return (
        <html lang="en" className="dark">
            <head>
                <HeadContent />
            </head>
            <body>
                <div className="grid h-svh grid-rows-[auto_1fr]">
                    <Header />
                    {isFetching ? <Loader /> : <Outlet />}
                </div>
                <Toaster richColors/>
                <TanStackRouterDevtools position="bottom-left" />
                <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
                <Scripts />
            </body>
        </html>
    )
}