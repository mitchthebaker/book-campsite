import { createFileRoute } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'

import BookingForm from '~/components/BookingForm'
import { useGetBookings } from '~/shared/hooks/useBookingQueue'
import { useBookingCreated } from '~/shared/hooks/useBookingCreated'

export const Route = createFileRoute('/_auth/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useGetBookings({ start: 0, limit: 20 })
  console.log(data)

  useBookingCreated(() => {
    queryClient.invalidateQueries({ queryKey: ['bookingQueue'] })
  })

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <BookingForm />

      <h2 className="text-lg font-semibold mt-8">Current Bookings</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <ul className="list-disc pl-5">
          {data.data.active.map((booking: any) => (
            <li key={booking.id}>{booking.data.url}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
