import { createFileRoute, redirect } from '@tanstack/react-router'
import { handleCallback } from '~/oidc/auth'

export const Route = createFileRoute('/callback')({
  beforeLoad: async () => {
    try {
      await handleCallback()
      return redirect({ to: '/dashboard' })
    } catch {
      throw redirect({
        to: '/',
      })
    }
  },
  component: Callback,
})

function Callback() {
  return <div>Signing in...</div>
}
