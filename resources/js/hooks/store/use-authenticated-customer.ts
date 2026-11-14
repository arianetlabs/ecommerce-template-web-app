import type { Customer } from '@/types/entities'
import { usePage } from '@inertiajs/react'

export function useAuthenticatedCustomer(): Customer {
  const user = usePage<{ auth: { user: Customer | null } }>().props.auth.user

  if (!user) {
    throw new Error('An authenticated customer is required for this page.')
  }

  return user
}
