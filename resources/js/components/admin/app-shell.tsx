import { SidebarProvider } from '@/components/admin/ui/sidebar'
import type { AppVariant } from '@/types/admin'
import { usePage } from '@inertiajs/react'
import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
  variant?: AppVariant
}

export function AppShell({ children, variant = 'sidebar' }: AppShellProps) {
  const isOpen = usePage().props.sidebarOpen

  if (variant === 'header') {
    return <div className="flex min-h-screen w-full flex-col">{children}</div>
  }

  return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>
}
