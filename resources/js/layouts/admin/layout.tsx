import { AppContent } from '@/components/admin/app-content'
import { AppShell } from '@/components/admin/app-shell'
import { AppSidebar } from '@/components/admin/app-sidebar'
import { AppSidebarHeader } from '@/components/admin/app-sidebar-header'
import AdminProviders from '@/components/admin/providers'
import type { BreadcrumbItem } from '@/types/admin'
import type { PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {
  breadcrumbs?: BreadcrumbItem[]
}

const Layout = ({ breadcrumbs = [], children }: LayoutProps) => (
  <AdminProviders>
    <AppShell variant="sidebar">
      <AppSidebar />
      <AppContent
        variant="sidebar"
        className="min-w-0 overflow-x-clip"
      >
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
      </AppContent>
    </AppShell>
  </AdminProviders>
)

export default Layout
