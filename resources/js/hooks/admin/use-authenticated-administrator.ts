import type { Administrator } from '@/types/entities'
import { usePage } from '@inertiajs/react'

export function useAuthenticatedAdministrator(): Administrator {
  const user = usePage<{ auth: { user: Administrator | null } }>().props.auth.user

  if (!user) {
    throw new Error('An authenticated administrator is required for this page.')
  }

  return user
}
