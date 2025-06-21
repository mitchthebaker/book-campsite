import { createContext, type ReactNode, useContext, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { userManager } from '~/oidc/oidcClient'

type SocketContextType = {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextType>({ socket: null })

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    let isMounted = true
    userManager.getUser().then(user => {
      if (user && user.profile.sub && isMounted) {
        socketRef.current = io(import.meta.env.VITE_BASE_URL, {
          auth: {
            userId: user.profile.sub,
          }
        })
      }
    })

    return () => {
      isMounted = false
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const ctx = useContext(SocketContext)
  if (!ctx) throw new Error('useSocket must be used within SocketProvider')
  return ctx
}