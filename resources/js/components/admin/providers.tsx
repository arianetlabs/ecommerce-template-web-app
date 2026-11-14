import { Toaster } from '@/components/admin/ui/sonner'
import { TooltipProvider } from '@/components/admin/ui/tooltip'
import type { PropsWithChildren } from 'react'

export default function AdminProviders({ children }: PropsWithChildren) {
  return (
    <TooltipProvider delayDuration={0}>
      {children}
      <Toaster richColors />
    </TooltipProvider>
  )
}
