import { authClient } from '@/lib/auth-client';
import { createFileRoute, redirect } from '@tanstack/react-router'
import { trpc } from '@/utils/trpc'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data) {
      throw redirect({ to: "/login", throw: true });
    }
    return { session: session };
  },
})

function RouteComponent() {
    const { session } = Route.useRouteContext();
    const privateData = trpc.privateData.useQuery()
  return <div>
    <h1>Dashboard</h1>
    <p>{privateData.data?.message}</p>
    <p>{session.data?.user.email}</p>
  </div>
}
