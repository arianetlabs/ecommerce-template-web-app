import { initializeTheme } from '@/hooks/use-appearance'
import AdminAuthLayout from '@/layouts/admin/auth-layout'
import AdminLayout from '@/layouts/admin/layout'
import AdminSettingsLayout from '@/layouts/admin/settings-layout'
import StoreAccountLayout from '@/layouts/store/account-layout'
import StoreAuthLayout from '@/layouts/store/auth-layout'
import StoreLayout from '@/layouts/store/layout'
import type { SiteSettings } from '@/types/site-settings'
import { createInertiaApp } from '@inertiajs/react'

void createInertiaApp({
  title: (title, page) => {
    const { site_name: siteName } = page.props.site as SiteSettings
    // Inertia escapes the page title before passing it here and renders the result as HTML.
    const escapedSiteName = siteName.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    const siteTitle = page.component.startsWith('admin/') ? `Administración ${escapedSiteName}` : escapedSiteName

    return title ? `${title} - ${siteTitle}` : siteTitle
  },
  layout: (name) => {
    switch (true) {
      case name.startsWith('store/auth/'):
        return [StoreLayout, StoreAuthLayout]
      case name.startsWith('store/account/'):
        return [StoreLayout, StoreAccountLayout]
      case name.startsWith('store/'):
        return StoreLayout
      case name.startsWith('admin/auth/'):
        return AdminAuthLayout
      case name.startsWith('admin/settings/'):
        return [AdminLayout, AdminSettingsLayout]
      case name.startsWith('admin/'):
        return AdminLayout
      default:
        return null
    }
  },
  strictMode: true,
  progress: {
    color: '#4B5563',
  },
})

// This will set light / dark mode on load...
initializeTheme()
