import { useMobileNavigation } from '@/hooks/use-mobile-navigation'
import type { CleanupFn } from '@/hooks/use-mobile-navigation'
import { router } from '@inertiajs/react'
import { useCallback } from 'react'

export function useLogoutCleanup(): CleanupFn {
  const cleanupNavigation = useMobileNavigation()

  return useCallback(() => {
    cleanupNavigation()
    router.flushAll()
  }, [cleanupNavigation])
}
