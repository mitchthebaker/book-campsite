import { useForm } from 'react-hook-form'
import { useCreateBooking } from '~/shared/hooks/useBookingQueue'
import {
  Form,
  FormField,
} from '~/components/ui/form'
import { FormInput } from '~/components/FormInput'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

export default function BookingForm() {
  const form = useForm({
    defaultValues: {
      url: '',
      auth: '',
    },
  })

  const createBooking = useCreateBooking()

  const onSubmit = (values: { url: string; auth: string }) => {
    createBooking.mutate(
      {
        url: values.url,
        auth: values.auth ? JSON.parse(values.auth) : undefined,
      },
      {
        onSuccess: () => {
          form.reset()
        },
        onError: (err: any) => {
          alert(err.message || 'Failed to create booking')
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormInput label="Booking URL">
              <Input {...field} />
            </FormInput>
          )}
        />
        <Button 
          type="submit" 
          className="mt-4 w-full"
          disabled={createBooking.isPending}
        >
          {createBooking.isPending ? 'Creating...' : 'Create Booking'}
        </Button>
      </form>
    </Form>
  )
}