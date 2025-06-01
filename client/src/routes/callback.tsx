import { createFileRoute, redirect } from '@tanstack/react-router'
import { handleCallback } from '~/oidc/auth';

export const Route = createFileRoute('/callback')({
  loader: async () => {
    try {
      // Handle the OIDC callback
      await handleCallback();
      return redirect({ to: "/dashboard" });
    }
    catch (error) {
      throw redirect ({ to: "/" });
    }
  },
  component: Callback,
})

function Callback() {
  return <div>Signing in...</div>
}

