import { Link } from '@tanstack/react-router'

import { cn } from '~/lib/utils'
import { buttonVariants } from '~/components/ui/button'
import { useAuth } from '~/providers/AuthProvider'

export default function Header() {
  const { login, logout } = useAuth();

  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/tanstack-query">TanStack Query</Link>
        </div>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }), "flex gap-2 text-foreground")}
          onClick={login}
        >
          Login
        </button>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "ghost" }), "flex gap-2 text-foreground")}
          onClick={logout}
        >
          Logout
        </button>
      </nav>
    </header>
  )
}
