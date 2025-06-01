import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router'
import { useState, useEffect } from 'react';

import { getUser } from '~/oidc/auth';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

export default function AuthLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then(user => {
      if (!user || user.expired) {
        router.navigate({ to: "/" });
      }
      else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <div>Loading...</div>

  return <Outlet />;
}
