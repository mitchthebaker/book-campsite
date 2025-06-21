import React from 'react'
import { AuthProvider } from './AuthProvider'
import { SocketProvider } from './SocketProvider'

type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <SocketProvider>
        {children}
      </SocketProvider>
    </AuthProvider>
  )
}
