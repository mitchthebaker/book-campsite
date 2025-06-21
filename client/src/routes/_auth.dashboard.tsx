import { createFileRoute } from '@tanstack/react-router'
import BookingForm from '~/components/BookingForm'
import { useGetBookings } from '~/shared/hooks/useBookingQueue'

export const Route = createFileRoute('/_auth/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading, error } = useGetBookings({ start: 0, limit: 20 })

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <BookingForm />

      <h2 className="text-lg font-semibold mt-8">Current Bookings</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <ul className="list-disc pl-5">
          {data.data.waiting.map((booking: any) => (
            <li key={booking.id}>{booking.url}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
