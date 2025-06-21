import { useEffect } from 'react'
import { useSocket } from '~/providers/SocketProvider'

export interface BookingCreatedEvent {
  jobId: string
  url: string
  auth?: Record<string, unknown>
  userId: string
}

export const useBookingCreated = (onCreated: (data: BookingCreatedEvent) => void) => {
  const { socket } = useSocket()

  useEffect(() => {
    if (!socket) return

    socket.on('booking:created', onCreated)
    return () => {
      socket.off('booking:created', onCreated)
    }
  }, [socket, onCreated])
}