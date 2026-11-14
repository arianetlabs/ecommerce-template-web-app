import type { BreadcrumbItem } from '@/types/admin/navigation'
import type { ReactNode } from 'react'

export interface AppLayoutProps {
  children: ReactNode
  breadcrumbs?: BreadcrumbItem[]
}

export type AppVariant = 'header' | 'sidebar'
