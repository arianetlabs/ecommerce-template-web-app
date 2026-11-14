import AppLogo from '@/components/admin/app-logo'
import NavFooter from '@/components/admin/nav-footer'
import { NavMain } from '@/components/admin/nav-main'
import { NavUser } from '@/components/admin/nav-user'
import SidebarLogoutButton from '@/components/admin/sidebar-logout-button'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/admin/ui/sidebar'
import { dashboard } from '@/routes/admin'
import { index as adminIndexAdministrators } from '@/routes/admin/admins'
import { index as adminIndexBrands } from '@/routes/admin/brands'
import { index as adminIndexCategories } from '@/routes/admin/categories'
import { index as adminIndexCustomers } from '@/routes/admin/customers'
import { edit as editInformation } from '@/routes/admin/information'
import { index as adminIndexProducts } from '@/routes/admin/products'
import type { NavGroup } from '@/types/admin'
import { DashboardBrowsingIcon, GridViewIcon, Package01Icon, Settings01Icon, ShoppingBag01Icon, Tag01Icon, UserMultiple02Icon } from '@hugeicons/core-free-icons'
import { Link } from '@inertiajs/react'

const mainNavItems: NavGroup[] = [
  {
    title: 'Plataforma',
    items: [
      {
        title: 'Dashboard',
        href: dashboard(),
        icon: DashboardBrowsingIcon,
      },
    ],
  },
  {
    title: 'Catálogo',
    items: [
      {
        title: 'Productos',
        href: adminIndexProducts(),
        icon: Package01Icon,
      },
      {
        title: 'Categorías',
        href: adminIndexCategories(),
        icon: GridViewIcon,
      },
      {
        title: 'Marcas',
        href: adminIndexBrands(),
        icon: Tag01Icon,
      },
    ],
  },
  {
    title: 'Tienda',
    items: [
      {
        title: 'Clientes',
        href: adminIndexCustomers(),
        icon: ShoppingBag01Icon,
      },
    ],
  },
  {
    title: 'Administración',
    items: [
      {
        title: 'Administradores',
        href: adminIndexAdministrators(),
        icon: UserMultiple02Icon,
      },
      {
        title: 'Configuración',
        href: editInformation(),
        icon: Settings01Icon,
      },
    ],
  },
]

export function AppSidebar() {
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
            >
              <Link
                href={dashboard()}
                onStart={() => setOpenMobile(false)}
                prefetch
              >
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain group={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter className="mt-auto" />
        <SidebarLogoutButton className="hidden lg:block" />
        <NavUser className="block md:hidden" />
      </SidebarFooter>
    </Sidebar>
  )
}
