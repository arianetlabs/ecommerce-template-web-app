import { useSyncExternalStore } from 'react'

// Match the Admin stylesheet's md breakpoint.
const mql = typeof window === 'undefined' ? undefined : window.matchMedia('(width < 64rem)')

function mediaQueryListener(callback: (event: MediaQueryListEvent) => void) {
  if (!mql) {
    return () => {}
  }

  mql.addEventListener('change', callback)

  return () => {
    mql.removeEventListener('change', callback)
  }
}

function isSmallerThanBreakpoint(): boolean {
  return mql?.matches ?? false
}

function getServerSnapshot(): boolean {
  return false
}

export function useIsMobile(): boolean {
  return useSyncExternalStore(mediaQueryListener, isSmallerThanBreakpoint, getServerSnapshot)
}
