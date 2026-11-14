import { useMobileNavigation } from '@/hooks/admin/use-mobile-navigation'
import type { CleanupFn } from '@/hooks/admin/use-mobile-navigation'
import { router } from '@inertiajs/react'
import { useCallback } from 'react'

export function useLogoutCleanup(): CleanupFn {
  const cleanupNavigation = useMobileNavigation()

  return useCallback(() => {
    cleanupNavigation()
    router.flushAll()
  }, [cleanupNavigation])
}
