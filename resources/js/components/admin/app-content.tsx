import { SidebarInset } from '@/components/admin/ui/sidebar'
import type { AppVariant } from '@/types/admin'
import * as React from 'react'

interface AppContentProps extends React.ComponentProps<'main'> {
  variant?: AppVariant
}

export function AppContent({ variant = 'sidebar', children, ...props }: AppContentProps) {
  if (variant === 'sidebar') {
    return <SidebarInset {...props}>{children}</SidebarInset>
  }

  return (
    <main
      className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl"
      {...props}
    >
      {children}
    </main>
  )
}
