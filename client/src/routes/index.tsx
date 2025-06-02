import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const search = useSearch({ from: '/' })

  useEffect(() => {
    if (search.error === 'oidc_callback_failed') {
      toast.error('An error occurred during login. Please try again.')
    }
  }, [search.error])

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]"></header>
    </div>
  )
}
