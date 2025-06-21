import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userManager } from '~/oidc/oidcClient'

interface UseBookingQueueParams {
  start?: number
  limit?: number
}

export const useGetBookings = ({ start = 0, limit = 20 }: UseBookingQueueParams) => {
  return useQuery({
    queryKey: ['bookingQueue', start, limit],
    queryFn: async () => {
      const user = await userManager.getUser()
      if (!user || !user.access_token) {
        throw new Error('User is not authenticated')
      }

      const queryString = new URLSearchParams({ start: String(start), limit: String(limit) }).toString()

      const res = await fetch(`/api/v1/book-campsite?${queryString}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      })

      if (!res.ok) throw new Error('Failed to fetch queue')
      return res.json()
    },
    refetchInterval: 5000,
  })
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { url: string; auth?: Record<string, unknown> }) => {
      const user = await userManager.getUser()
      if (!user || !user.access_token) {
        throw new Error('User is not authenticated')
      }

      const res = await fetch('/api/v1/book-campsite', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.access_token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to create booking')
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookingQueue'] })
    },
  })
}