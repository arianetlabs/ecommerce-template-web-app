import { useCallback } from 'react'

export type GetInitialsFn = (name: string, last_name: string) => string

export function useInitials(): GetInitialsFn {
  return useCallback((name: string, last_name: string): string => {
    const firstInitial = Array.from(name.trim())[0] ?? ''
    const lastInitial = Array.from(last_name.trim())[0] ?? ''

    return `${firstInitial}${lastInitial}`.toUpperCase()
  }, [])
}
