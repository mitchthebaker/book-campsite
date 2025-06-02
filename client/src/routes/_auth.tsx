import { Outlet, createFileRoute } from '@tanstack/react-router'
import React from 'react'

import { userManager } from '~/oidc/oidcClient'
import { getUser } from '~/oidc/auth'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ location }) => {
    const user = await getUser()
    if (!user) {
      await userManager.signinRedirect({
        state: { redirect: location.href },
      })

      throw new Promise(() => {})
    }
  },
  component: AuthLayout,
})

export default function AuthLayout() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </React.Suspense>
  )
}
